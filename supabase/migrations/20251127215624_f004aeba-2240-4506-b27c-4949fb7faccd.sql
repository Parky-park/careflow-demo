-- ============================================
-- PATIENTS TABLE
-- ============================================
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  phone TEXT,
  email TEXT,
  address TEXT,
  medical_record_number TEXT UNIQUE,
  insurance_provider TEXT,
  insurance_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  status TEXT CHECK (status IN ('active', 'inactive', 'critical', 'stable')) DEFAULT 'active',
  risk_score INTEGER DEFAULT 0,
  last_visit TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all patients"
  ON public.patients FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert patients"
  ON public.patients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update patients"
  ON public.patients FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete patients"
  ON public.patients FOR DELETE
  USING (auth.uid() IS NOT NULL);

CREATE INDEX idx_patients_user_id ON public.patients(user_id);
CREATE INDEX idx_patients_status ON public.patients(status);
CREATE INDEX idx_patients_last_name ON public.patients(last_name);

-- Enable realtime
ALTER TABLE public.patients REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.patients;

-- ============================================
-- PATIENT VISITS TABLE
-- ============================================
CREATE TABLE public.patient_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  visit_type TEXT CHECK (visit_type IN ('emergency', 'routine', 'follow-up', 'consultation')),
  diagnosis TEXT,
  treatment TEXT,
  cost DECIMAL(10,2),
  provider_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.patient_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all visits"
  ON public.patient_visits FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert visits"
  ON public.patient_visits FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update visits"
  ON public.patient_visits FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE INDEX idx_patient_visits_patient_id ON public.patient_visits(patient_id);
CREATE INDEX idx_patient_visits_date ON public.patient_visits(visit_date DESC);

-- ============================================
-- AI INSIGHTS TABLE
-- ============================================
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  category TEXT CHECK (category IN ('readmission_risk', 'medication_adherence', 'chronic_disease', 'prevention', 'cost_optimization')),
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  recommended_actions TEXT[],
  status TEXT CHECK (status IN ('active', 'resolved', 'dismissed')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all insights"
  ON public.ai_insights FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert insights"
  ON public.ai_insights FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update insights"
  ON public.ai_insights FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE INDEX idx_ai_insights_patient_id ON public.ai_insights(patient_id);
CREATE INDEX idx_ai_insights_severity ON public.ai_insights(severity);
CREATE INDEX idx_ai_insights_status ON public.ai_insights(status);

ALTER TABLE public.ai_insights REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_insights;

-- ============================================
-- EMERGENCY DEPARTMENT TABLE
-- ============================================
CREATE TABLE public.emergency_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  chief_complaint TEXT NOT NULL,
  triage_level INTEGER CHECK (triage_level BETWEEN 1 AND 5) NOT NULL,
  status TEXT CHECK (status IN ('waiting', 'in_treatment', 'admitted', 'discharged')) DEFAULT 'waiting',
  assigned_provider TEXT,
  wait_time_minutes INTEGER,
  bed_number TEXT,
  vitals JSONB,
  discharge_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.emergency_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all emergency cases"
  ON public.emergency_cases FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert emergency cases"
  ON public.emergency_cases FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update emergency cases"
  ON public.emergency_cases FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE INDEX idx_emergency_cases_status ON public.emergency_cases(status);
CREATE INDEX idx_emergency_cases_triage ON public.emergency_cases(triage_level);
CREATE INDEX idx_emergency_cases_arrival ON public.emergency_cases(arrival_time DESC);

ALTER TABLE public.emergency_cases REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.emergency_cases;

-- ============================================
-- ANALYTICS METRICS TABLE
-- ============================================
CREATE TABLE public.analytics_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(10,2) NOT NULL,
  metric_type TEXT CHECK (metric_type IN ('count', 'percentage', 'currency', 'time', 'score')),
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.analytics_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all metrics"
  ON public.analytics_metrics FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert metrics"
  ON public.analytics_metrics FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE INDEX idx_analytics_metrics_name ON public.analytics_metrics(metric_name);
CREATE INDEX idx_analytics_metrics_period ON public.analytics_metrics(period_start DESC);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE TRIGGER handle_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- HELPER FUNCTION TO CALCULATE WAIT TIME
-- ============================================
CREATE OR REPLACE FUNCTION public.calculate_ed_wait_time()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  avg_wait INTEGER;
BEGIN
  SELECT COALESCE(AVG(wait_time_minutes)::INTEGER, 0)
  INTO avg_wait
  FROM public.emergency_cases
  WHERE arrival_time >= NOW() - INTERVAL '24 hours'
    AND wait_time_minutes IS NOT NULL;
  
  RETURN avg_wait;
END;
$$;