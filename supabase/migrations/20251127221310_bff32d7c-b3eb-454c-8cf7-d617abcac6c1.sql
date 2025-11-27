-- Create facilities table for tracking beds and operating rooms
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  facility_type TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  location TEXT,
  capacity INTEGER DEFAULT 1,
  current_occupancy INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create staff table for tracking staff coverage
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,
  department TEXT,
  shift TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quality_metrics table for tracking detailed quality indicators
CREATE TABLE public.quality_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recorded_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create patient_surveys table for satisfaction tracking
CREATE TABLE public.patient_surveys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES public.patient_visits(id) ON DELETE CASCADE,
  satisfaction_score INTEGER NOT NULL CHECK (satisfaction_score >= 1 AND satisfaction_score <= 100),
  would_recommend BOOLEAN,
  comments TEXT,
  survey_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_surveys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for facilities
CREATE POLICY "Users can view all facilities" 
ON public.facilities 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert facilities" 
ON public.facilities 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update facilities" 
ON public.facilities 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create RLS policies for staff
CREATE POLICY "Users can view all staff" 
ON public.staff 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert staff" 
ON public.staff 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update staff" 
ON public.staff 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create RLS policies for quality_metrics
CREATE POLICY "Users can view all quality metrics" 
ON public.quality_metrics 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert quality metrics" 
ON public.quality_metrics 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create RLS policies for patient_surveys
CREATE POLICY "Users can view all surveys" 
ON public.patient_surveys 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert surveys" 
ON public.patient_surveys 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create trigger for updated_at on facilities
CREATE TRIGGER update_facilities_updated_at
BEFORE UPDATE ON public.facilities
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create trigger for updated_at on staff
CREATE TRIGGER update_staff_updated_at
BEFORE UPDATE ON public.staff
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better query performance
CREATE INDEX idx_facilities_type ON public.facilities(facility_type);
CREATE INDEX idx_facilities_status ON public.facilities(status);
CREATE INDEX idx_staff_role ON public.staff(role);
CREATE INDEX idx_staff_status ON public.staff(status);
CREATE INDEX idx_quality_metrics_type ON public.quality_metrics(metric_type);
CREATE INDEX idx_quality_metrics_recorded_at ON public.quality_metrics(recorded_at);
CREATE INDEX idx_patient_surveys_patient_id ON public.patient_surveys(patient_id);
CREATE INDEX idx_patient_surveys_survey_date ON public.patient_surveys(survey_date);

-- Insert sample facilities data
INSERT INTO public.facilities (facility_type, name, status, location, current_occupancy, capacity) VALUES
  ('icu_bed', 'ICU Bed 1', 'occupied', 'ICU Ward A', 1, 1),
  ('icu_bed', 'ICU Bed 2', 'occupied', 'ICU Ward A', 1, 1),
  ('icu_bed', 'ICU Bed 3', 'occupied', 'ICU Ward A', 1, 1),
  ('icu_bed', 'ICU Bed 4', 'occupied', 'ICU Ward A', 1, 1),
  ('icu_bed', 'ICU Bed 5', 'occupied', 'ICU Ward B', 1, 1),
  ('icu_bed', 'ICU Bed 6', 'occupied', 'ICU Ward B', 1, 1),
  ('icu_bed', 'ICU Bed 7', 'occupied', 'ICU Ward B', 1, 1),
  ('icu_bed', 'ICU Bed 8', 'occupied', 'ICU Ward B', 1, 1),
  ('icu_bed', 'ICU Bed 9', 'occupied', 'ICU Ward C', 1, 1),
  ('icu_bed', 'ICU Bed 10', 'occupied', 'ICU Ward C', 1, 1),
  ('icu_bed', 'ICU Bed 11', 'occupied', 'ICU Ward C', 1, 1),
  ('icu_bed', 'ICU Bed 12', 'occupied', 'ICU Ward C', 1, 1),
  ('icu_bed', 'ICU Bed 13', 'occupied', 'ICU Ward D', 1, 1),
  ('icu_bed', 'ICU Bed 14', 'occupied', 'ICU Ward D', 1, 1),
  ('icu_bed', 'ICU Bed 15', 'occupied', 'ICU Ward D', 1, 1),
  ('icu_bed', 'ICU Bed 16', 'occupied', 'ICU Ward D', 1, 1),
  ('icu_bed', 'ICU Bed 17', 'occupied', 'ICU Ward E', 1, 1),
  ('icu_bed', 'ICU Bed 18', 'occupied', 'ICU Ward E', 1, 1),
  ('icu_bed', 'ICU Bed 19', 'available', 'ICU Ward E', 0, 1),
  ('icu_bed', 'ICU Bed 20', 'available', 'ICU Ward F', 0, 1),
  ('icu_bed', 'ICU Bed 21', 'available', 'ICU Ward F', 0, 1),
  ('icu_bed', 'ICU Bed 22', 'available', 'ICU Ward F', 0, 1),
  ('icu_bed', 'ICU Bed 23', 'available', 'ICU Ward F', 0, 1),
  ('icu_bed', 'ICU Bed 24', 'available', 'ICU Ward F', 0, 1),
  ('operating_room', 'OR 1', 'occupied', 'Surgery Floor 2', 1, 1),
  ('operating_room', 'OR 2', 'occupied', 'Surgery Floor 2', 1, 1),
  ('operating_room', 'OR 3', 'occupied', 'Surgery Floor 2', 1, 1),
  ('operating_room', 'OR 4', 'occupied', 'Surgery Floor 3', 1, 1),
  ('operating_room', 'OR 5', 'occupied', 'Surgery Floor 3', 1, 1),
  ('operating_room', 'OR 6', 'occupied', 'Surgery Floor 3', 1, 1),
  ('operating_room', 'OR 7', 'available', 'Surgery Floor 4', 0, 1),
  ('operating_room', 'OR 8', 'available', 'Surgery Floor 4', 0, 1);

-- Insert sample quality metrics
INSERT INTO public.quality_metrics (metric_type, metric_name, metric_value, recorded_at) VALUES
  ('safety', 'Safety Score', 9.2, now() - INTERVAL '1 day'),
  ('clinical_outcome', 'Clinical Outcomes Rate', 94.5, now() - INTERVAL '1 day'),
  ('compliance', 'Compliance Rate', 97.8, now() - INTERVAL '1 day'),
  ('error', 'Medical Error Rate', 0.3, now() - INTERVAL '1 day'),
  ('safety', 'Safety Score', 9.1, now() - INTERVAL '7 days'),
  ('clinical_outcome', 'Clinical Outcomes Rate', 93.8, now() - INTERVAL '7 days'),
  ('compliance', 'Compliance Rate', 96.5, now() - INTERVAL '7 days'),
  ('error', 'Medical Error Rate', 0.4, now() - INTERVAL '7 days');

-- Insert baseline analytics metrics (using NULL for metric_type to avoid constraint violations)
INSERT INTO public.analytics_metrics (metric_name, metric_type, metric_value, period_start, period_end, metadata) VALUES
  ('patient_satisfaction', NULL, 94.2, now() - INTERVAL '30 days', now(), '{"source": "patient_surveys", "sample_size": 450}'::jsonb),
  ('avg_length_of_stay', NULL, 3.2, now() - INTERVAL '30 days', now(), '{"unit": "days", "department": "all"}'::jsonb),
  ('readmission_rate', NULL, 8.7, now() - INTERVAL '30 days', now(), '{"window": "30_days", "conditions": "all"}'::jsonb),
  ('icu_beds_occupied', NULL, 18, now() - INTERVAL '1 hour', now(), '{"facility_type": "icu_bed"}'::jsonb),
  ('icu_beds_total', NULL, 24, now() - INTERVAL '1 hour', now(), '{"facility_type": "icu_bed"}'::jsonb),
  ('operating_rooms_in_use', NULL, 6, now() - INTERVAL '1 hour', now(), '{"facility_type": "operating_room"}'::jsonb),
  ('operating_rooms_total', NULL, 8, now() - INTERVAL '1 hour', now(), '{"facility_type": "operating_room"}'::jsonb),
  ('staff_coverage', NULL, 100, now() - INTERVAL '1 hour', now(), '{"shift": "current", "department": "all"}'::jsonb),
  ('safety_score', NULL, 9.2, now() - INTERVAL '1 day', now(), '{"max_score": 10}'::jsonb),
  ('clinical_outcomes', NULL, 94.5, now() - INTERVAL '1 day', now(), '{"metric": "positive_outcomes"}'::jsonb),
  ('compliance_rate', NULL, 97.8, now() - INTERVAL '1 day', now(), '{"standards": "joint_commission"}'::jsonb),
  ('error_rate', NULL, 0.3, now() - INTERVAL '1 day', now(), '{"severity": "all"}'::jsonb);