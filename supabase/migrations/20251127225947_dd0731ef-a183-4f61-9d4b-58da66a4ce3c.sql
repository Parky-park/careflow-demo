-- Add cost_savings column to drug_evaluations table
ALTER TABLE public.drug_evaluations 
ADD COLUMN cost_savings numeric DEFAULT 0;

-- Add patient_facility_attachments table to track medical home assignments
CREATE TABLE public.patient_facility_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id),
  facility_id uuid NOT NULL REFERENCES public.facilities(id),
  attached_at timestamp with time zone NOT NULL DEFAULT now(),
  detached_at timestamp with time zone,
  attachment_days integer,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.patient_facility_attachments ENABLE ROW LEVEL SECURITY;

-- RLS policies for patient_facility_attachments
CREATE POLICY "Users can view attachments"
  ON public.patient_facility_attachments
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert attachments"
  ON public.patient_facility_attachments
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update attachments"
  ON public.patient_facility_attachments
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Function to calculate attachment days when detached
CREATE OR REPLACE FUNCTION calculate_attachment_days()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.detached_at IS NOT NULL AND OLD.detached_at IS NULL THEN
    NEW.attachment_days = EXTRACT(DAY FROM (NEW.detached_at - NEW.attached_at));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate attachment days
CREATE TRIGGER update_attachment_days
  BEFORE UPDATE ON public.patient_facility_attachments
  FOR EACH ROW
  EXECUTE FUNCTION calculate_attachment_days();