-- Create care_teams table
CREATE TABLE IF NOT EXISTS public.care_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  lead_id UUID REFERENCES public.staff(id),
  specialty TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create team_members table (junction table for staff and teams)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.care_teams(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  role TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(team_id, staff_id)
);

-- Create prescriptions table for Pharmacy AI
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dosage TEXT,
  frequency TEXT,
  prescriber_id UUID REFERENCES public.staff(id),
  status TEXT DEFAULT 'pending',
  confidence_score INTEGER,
  ocr_processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create drug_utilization_rules table
CREATE TABLE IF NOT EXISTS public.drug_utilization_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  active BOOLEAN DEFAULT true,
  trigger_count INTEGER DEFAULT 0,
  intervention_count INTEGER DEFAULT 0,
  effectiveness_rate INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create drug_evaluations table
CREATE TABLE IF NOT EXISTS public.drug_evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id),
  prescription_id UUID REFERENCES public.prescriptions(id),
  rule_id UUID REFERENCES public.drug_utilization_rules(id),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create fhir_connections table
CREATE TABLE IF NOT EXISTS public.fhir_connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  connection_type TEXT NOT NULL,
  endpoint_url TEXT,
  fhir_version TEXT DEFAULT 'R4',
  status TEXT DEFAULT 'active',
  last_sync TIMESTAMP WITH TIME ZONE,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fhir_messages table
CREATE TABLE IF NOT EXISTS public.fhir_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  connection_id UUID REFERENCES public.fhir_connections(id),
  message_type TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  status TEXT DEFAULT 'success',
  payload JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.care_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_utilization_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drug_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fhir_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fhir_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view care teams" ON public.care_teams FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert care teams" ON public.care_teams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update care teams" ON public.care_teams FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view team members" ON public.team_members FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert team members" ON public.team_members FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update team members" ON public.team_members FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete team members" ON public.team_members FOR DELETE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view prescriptions" ON public.prescriptions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert prescriptions" ON public.prescriptions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update prescriptions" ON public.prescriptions FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view drug rules" ON public.drug_utilization_rules FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert drug rules" ON public.drug_utilization_rules FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update drug rules" ON public.drug_utilization_rules FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view drug evaluations" ON public.drug_evaluations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert drug evaluations" ON public.drug_evaluations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update drug evaluations" ON public.drug_evaluations FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view fhir connections" ON public.fhir_connections FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert fhir connections" ON public.fhir_connections FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update fhir connections" ON public.fhir_connections FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view fhir messages" ON public.fhir_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert fhir messages" ON public.fhir_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);