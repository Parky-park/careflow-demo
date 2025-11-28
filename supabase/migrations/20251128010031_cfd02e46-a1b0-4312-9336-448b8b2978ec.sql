-- Create security_logs table for user security activity
CREATE TABLE public.security_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  ip_address TEXT,
  location TEXT,
  device TEXT,
  device_type TEXT,
  status TEXT DEFAULT 'success',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own security logs
CREATE POLICY "Users can view their own security logs"
ON public.security_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Create system_logs table for application logs
CREATE TABLE public.system_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  level TEXT NOT NULL DEFAULT 'INFO',
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view system logs
CREATE POLICY "Users can view system logs"
ON public.system_logs
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Create integrations table for system integration management
CREATE TABLE public.integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  enabled BOOLEAN DEFAULT false,
  endpoint TEXT,
  last_sync TIMESTAMP WITH TIME ZONE,
  data_types TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view integrations
CREATE POLICY "Users can view integrations"
ON public.integrations
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Authenticated users can update integrations
CREATE POLICY "Users can update integrations"
ON public.integrations
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Add trigger for updated_at
CREATE TRIGGER update_integrations_updated_at
BEFORE UPDATE ON public.integrations
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample integrations
INSERT INTO public.integrations (name, description, status, enabled, endpoint, data_types, last_sync) VALUES
('FHIR API Connection', 'Healthcare data interoperability standard', 'connected', true, 'https://fhir.hospital.ca/api/v1', ARRAY['Patient Records', 'Observations', 'Medications'], now() - interval '5 minutes'),
('Provincial Health Registry', 'Real-time patient updates and demographics', 'connected', true, 'https://phr.ontario.ca/api/v2', ARRAY['Demographics', 'Insurance', 'Emergency Contacts'], now() - interval '10 minutes'),
('Laboratory Systems', 'Lab results integration and monitoring', 'pending', false, 'https://labs.hospital.ca/hl7/v3', ARRAY['Lab Results', 'Test Orders', 'Critical Values'], NULL),
('Pharmacy Network', 'Prescription management and drug interactions', 'connected', true, 'https://pharmacy.network.ca/api', ARRAY['Prescriptions', 'Drug Interactions', 'Inventory'], now() - interval '15 minutes'),
('Radiology PACS', 'Medical imaging and radiology reports', 'error', true, 'https://pacs.hospital.ca/dicom', ARRAY['Medical Images', 'Radiology Reports', 'DICOM Data'], now() - interval '2 hours');