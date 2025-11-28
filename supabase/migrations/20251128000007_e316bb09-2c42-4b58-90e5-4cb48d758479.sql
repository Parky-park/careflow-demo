-- Create inventory_items table
CREATE TABLE public.inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE NOT NULL,
  category text NOT NULL,
  quantity integer NOT NULL DEFAULT 0,
  unit_price numeric NOT NULL DEFAULT 0,
  reorder_level integer DEFAULT 50,
  status text DEFAULT 'in_stock',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  provider_name text NOT NULL,
  provider_id uuid REFERENCES public.staff(id),
  appointment_type text NOT NULL,
  appointment_date timestamp with time zone NOT NULL,
  duration_minutes integer DEFAULT 30,
  room text,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create conversations table
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid NOT NULL,
  participant_name text NOT NULL,
  participant_role text,
  last_message text,
  last_message_at timestamp with time zone DEFAULT now(),
  unread_count integer DEFAULT 0,
  priority text DEFAULT 'medium',
  encrypted boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  sender_name text NOT NULL,
  content text NOT NULL,
  encrypted boolean DEFAULT true,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  read boolean DEFAULT false,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create adt_events table (Admission, Discharge, Transfer)
CREATE TABLE public.adt_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES public.patients(id),
  event_type text NOT NULL,
  location text NOT NULL,
  from_location text,
  to_location text,
  urgency text DEFAULT 'medium',
  details text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adt_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inventory_items
CREATE POLICY "Users can view inventory" ON public.inventory_items FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert inventory" ON public.inventory_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update inventory" ON public.inventory_items FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for appointments
CREATE POLICY "Users can view appointments" ON public.appointments FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update appointments" ON public.appointments FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete appointments" ON public.appointments FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for conversations
CREATE POLICY "Users can view conversations" ON public.conversations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update conversations" ON public.conversations FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for messages
CREATE POLICY "Users can view messages" ON public.messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update messages" ON public.messages FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for adt_events
CREATE POLICY "Users can view adt events" ON public.adt_events FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can insert adt events" ON public.adt_events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Triggers for updated_at
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();