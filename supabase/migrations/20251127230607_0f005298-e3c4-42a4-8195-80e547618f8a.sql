-- Remove cost_savings column from drug_evaluations
ALTER TABLE public.drug_evaluations 
DROP COLUMN IF EXISTS cost_savings;

-- Remove attachment_days column from patient_facility_attachments (we'll calculate it)
ALTER TABLE public.patient_facility_attachments 
DROP COLUMN IF EXISTS attachment_days;

-- Drop the trigger and function since we're not storing calculated values
DROP TRIGGER IF EXISTS update_attachment_days ON public.patient_facility_attachments;
DROP FUNCTION IF EXISTS calculate_attachment_days();