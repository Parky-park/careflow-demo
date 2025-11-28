export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      adt_events: {
        Row: {
          created_at: string | null
          details: string | null
          event_type: string
          from_location: string | null
          id: string
          location: string
          patient_id: string | null
          to_location: string | null
          urgency: string | null
        }
        Insert: {
          created_at?: string | null
          details?: string | null
          event_type: string
          from_location?: string | null
          id?: string
          location: string
          patient_id?: string | null
          to_location?: string | null
          urgency?: string | null
        }
        Update: {
          created_at?: string | null
          details?: string | null
          event_type?: string
          from_location?: string | null
          id?: string
          location?: string
          patient_id?: string | null
          to_location?: string | null
          urgency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "adt_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_insights: {
        Row: {
          category: string | null
          confidence_score: number | null
          created_at: string | null
          description: string
          id: string
          patient_id: string | null
          recommended_actions: string[] | null
          resolved_at: string | null
          severity: string | null
          status: string | null
          title: string
        }
        Insert: {
          category?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description: string
          id?: string
          patient_id?: string | null
          recommended_actions?: string[] | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          title: string
        }
        Update: {
          category?: string | null
          confidence_score?: number | null
          created_at?: string | null
          description?: string
          id?: string
          patient_id?: string | null
          recommended_actions?: string[] | null
          resolved_at?: string | null
          severity?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_insights_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_metrics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_name: string
          metric_type: string | null
          metric_value: number
          period_end: string
          period_start: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name: string
          metric_type?: string | null
          metric_value: number
          period_end: string
          period_start: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_name?: string
          metric_type?: string | null
          metric_value?: number
          period_end?: string
          period_start?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          created_at: string | null
          duration_minutes: number | null
          id: string
          notes: string | null
          patient_id: string | null
          provider_id: string | null
          provider_name: string
          room: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          provider_id?: string | null
          provider_name: string
          room?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          notes?: string | null
          patient_id?: string | null
          provider_id?: string | null
          provider_name?: string
          room?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      care_teams: {
        Row: {
          created_at: string | null
          id: string
          lead_id: string | null
          name: string
          specialty: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_id?: string | null
          name: string
          specialty?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_id?: string | null
          name?: string
          specialty?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "care_teams_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          encrypted: boolean | null
          id: string
          last_message: string | null
          last_message_at: string | null
          participant_id: string
          participant_name: string
          participant_role: string | null
          priority: string | null
          unread_count: number | null
        }
        Insert: {
          created_at?: string | null
          encrypted?: boolean | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          participant_id: string
          participant_name: string
          participant_role?: string | null
          priority?: string | null
          unread_count?: number | null
        }
        Update: {
          created_at?: string | null
          encrypted?: boolean | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          participant_id?: string
          participant_name?: string
          participant_role?: string | null
          priority?: string | null
          unread_count?: number | null
        }
        Relationships: []
      }
      drug_evaluations: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          prescription_id: string | null
          resolved_at: string | null
          rule_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          prescription_id?: string | null
          resolved_at?: string | null
          rule_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          prescription_id?: string | null
          resolved_at?: string | null
          rule_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_evaluations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_evaluations_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drug_evaluations_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "drug_utilization_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      drug_utilization_rules: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          description: string | null
          effectiveness_rate: number | null
          id: string
          intervention_count: number | null
          name: string
          priority: string | null
          trigger_count: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          effectiveness_rate?: number | null
          id?: string
          intervention_count?: number | null
          name: string
          priority?: string | null
          trigger_count?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          effectiveness_rate?: number | null
          id?: string
          intervention_count?: number | null
          name?: string
          priority?: string | null
          trigger_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emergency_cases: {
        Row: {
          arrival_time: string
          assigned_provider: string | null
          bed_number: string | null
          chief_complaint: string
          created_at: string | null
          discharge_time: string | null
          id: string
          patient_id: string
          status: string | null
          triage_level: number
          vitals: Json | null
          wait_time_minutes: number | null
        }
        Insert: {
          arrival_time?: string
          assigned_provider?: string | null
          bed_number?: string | null
          chief_complaint: string
          created_at?: string | null
          discharge_time?: string | null
          id?: string
          patient_id: string
          status?: string | null
          triage_level: number
          vitals?: Json | null
          wait_time_minutes?: number | null
        }
        Update: {
          arrival_time?: string
          assigned_provider?: string | null
          bed_number?: string | null
          chief_complaint?: string
          created_at?: string | null
          discharge_time?: string | null
          id?: string
          patient_id?: string
          status?: string | null
          triage_level?: number
          vitals?: Json | null
          wait_time_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "emergency_cases_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          capacity: number | null
          created_at: string
          current_occupancy: number | null
          facility_type: string
          id: string
          location: string | null
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          current_occupancy?: number | null
          facility_type: string
          id?: string
          location?: string | null
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          current_occupancy?: number | null
          facility_type?: string
          id?: string
          location?: string | null
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      fhir_connections: {
        Row: {
          connection_type: string
          created_at: string | null
          endpoint_url: string | null
          fhir_version: string | null
          id: string
          last_sync: string | null
          message_count: number | null
          name: string
          status: string | null
        }
        Insert: {
          connection_type: string
          created_at?: string | null
          endpoint_url?: string | null
          fhir_version?: string | null
          id?: string
          last_sync?: string | null
          message_count?: number | null
          name: string
          status?: string | null
        }
        Update: {
          connection_type?: string
          created_at?: string | null
          endpoint_url?: string | null
          fhir_version?: string | null
          id?: string
          last_sync?: string | null
          message_count?: number | null
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      fhir_messages: {
        Row: {
          connection_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          message_type: string
          payload: Json | null
          resource_id: string | null
          resource_type: string | null
          status: string | null
        }
        Insert: {
          connection_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message_type: string
          payload?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
        }
        Update: {
          connection_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          message_type?: string
          payload?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fhir_messages_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "fhir_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_items: {
        Row: {
          category: string
          created_at: string | null
          id: string
          name: string
          quantity: number
          reorder_level: number | null
          sku: string
          status: string | null
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          name: string
          quantity?: number
          reorder_level?: number | null
          sku: string
          status?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          name?: string
          quantity?: number
          reorder_level?: number | null
          sku?: string
          status?: string | null
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          encrypted: boolean | null
          id: string
          read: boolean | null
          sender_id: string
          sender_name: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          encrypted?: boolean | null
          id?: string
          read?: boolean | null
          sender_id: string
          sender_name: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          encrypted?: boolean | null
          id?: string
          read?: boolean | null
          sender_id?: string
          sender_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      patient_facility_attachments: {
        Row: {
          attached_at: string
          created_at: string | null
          detached_at: string | null
          facility_id: string
          id: string
          patient_id: string
        }
        Insert: {
          attached_at?: string
          created_at?: string | null
          detached_at?: string | null
          facility_id: string
          id?: string
          patient_id: string
        }
        Update: {
          attached_at?: string
          created_at?: string | null
          detached_at?: string | null
          facility_id?: string
          id?: string
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_facility_attachments_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_facility_attachments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_surveys: {
        Row: {
          comments: string | null
          created_at: string
          id: string
          patient_id: string
          satisfaction_score: number
          survey_date: string
          visit_id: string | null
          would_recommend: boolean | null
        }
        Insert: {
          comments?: string | null
          created_at?: string
          id?: string
          patient_id: string
          satisfaction_score: number
          survey_date?: string
          visit_id?: string | null
          would_recommend?: boolean | null
        }
        Update: {
          comments?: string | null
          created_at?: string
          id?: string
          patient_id?: string
          satisfaction_score?: number
          survey_date?: string
          visit_id?: string | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_surveys_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_surveys_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "patient_visits"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_visits: {
        Row: {
          cost: number | null
          created_at: string | null
          diagnosis: string | null
          id: string
          notes: string | null
          patient_id: string
          provider_name: string | null
          treatment: string | null
          visit_date: string
          visit_type: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          diagnosis?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          provider_name?: string | null
          treatment?: string | null
          visit_date?: string
          visit_type?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          diagnosis?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          provider_name?: string | null
          treatment?: string | null
          visit_date?: string
          visit_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_visits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          gender: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          last_name: string
          last_visit: string | null
          medical_record_number: string | null
          phone: string | null
          risk_score: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_name: string
          last_visit?: string | null
          medical_record_number?: string | null
          phone?: string | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          last_name?: string
          last_visit?: string | null
          medical_record_number?: string | null
          phone?: string | null
          risk_score?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          dosage: string | null
          frequency: string | null
          id: string
          medication_name: string
          ocr_processed: boolean | null
          patient_id: string
          prescriber_id: string | null
          processed_at: string | null
          status: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          medication_name: string
          ocr_processed?: boolean | null
          patient_id: string
          prescriber_id?: string | null
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          dosage?: string | null
          frequency?: string | null
          id?: string
          medication_name?: string
          ocr_processed?: boolean | null
          patient_id?: string
          prescriber_id?: string | null
          processed_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_prescriber_id_fkey"
            columns: ["prescriber_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quality_metrics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          notes: string | null
          recorded_at: string
          recorded_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          notes?: string | null
          recorded_at?: string
          recorded_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          notes?: string | null
          recorded_at?: string
          recorded_by?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          created_at: string
          department: string | null
          full_name: string
          id: string
          role: string
          shift: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          full_name: string
          id?: string
          role: string
          shift?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          full_name?: string
          id?: string
          role?: string
          shift?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          staff_id: string
          team_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          staff_id: string
          team_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          staff_id?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "care_teams"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_ed_wait_time: { Args: never; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
