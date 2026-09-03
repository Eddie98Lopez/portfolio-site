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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          phone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          phone?: string | null
          user_id?: string
        }
        Relationships: []
      }
      estimates: {
        Row: {
          accepted_at: string | null
          created_at: string
          estimate_number: number | null
          estimate_number_formatted: string | null
          expires_at: string | null
          final_total: number | null
          id: string
          line_items: Json | null
          org_id: number | null
          pay_schedule: string[] | null
          recipient_id: number | null
          sent_at: string | null
          status: Database["public"]["Enums"]["estimate_status"] | null
          subtotal_max: number | null
          subtotal_min: number | null
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          estimate_number?: number | null
          estimate_number_formatted?: string | null
          expires_at?: string | null
          final_total?: number | null
          id?: string
          line_items?: Json | null
          org_id?: number | null
          pay_schedule?: string[] | null
          recipient_id?: number | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["estimate_status"] | null
          subtotal_max?: number | null
          subtotal_min?: number | null
          user_id?: string
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          estimate_number?: number | null
          estimate_number_formatted?: string | null
          expires_at?: string | null
          final_total?: number | null
          id?: string
          line_items?: Json | null
          org_id?: number | null
          pay_schedule?: string[] | null
          recipient_id?: number | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["estimate_status"] | null
          subtotal_max?: number | null
          subtotal_min?: number | null
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_contacts: {
        Row: {
          contact_id: number
          created_at: string
          is_primary: boolean
          organization_id: number
          role: string | null
          user_id: string
        }
        Insert: {
          contact_id: number
          created_at?: string
          is_primary?: boolean
          organization_id: number
          role?: string | null
          user_id: string
        }
        Update: {
          contact_id?: number
          created_at?: string
          is_primary?: boolean
          organization_id?: number
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_contacts_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_contacts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          city: string | null
          created_at: string
          id: number
          org_name: string | null
          postal_code: string | null
          primary_contact: number | null
          state: string | null
          street_address: string | null
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: number
          org_name?: string | null
          postal_code?: string | null
          primary_contact?: number | null
          state?: string | null
          street_address?: string | null
          user_id?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: number
          org_name?: string | null
          postal_code?: string | null
          primary_contact?: number | null
          state?: string | null
          street_address?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_primary_contact_fkey"
            columns: ["primary_contact"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          exclusions: string | null
          id: number
          isFavorite: boolean | null
          long_description: string | null
          operational_notes: string | null
          prerequisites: string[] | null
          price_id: string | null
          price_max: number | null
          price_min: number | null
          product_name: string | null
          product_type: Database["public"]["Enums"]["product_type"] | null
          service_type: Database["public"]["Enums"]["product_type"] | null
          short_description: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          exclusions?: string | null
          id?: number
          isFavorite?: boolean | null
          long_description?: string | null
          operational_notes?: string | null
          prerequisites?: string[] | null
          price_id?: string | null
          price_max?: number | null
          price_min?: number | null
          product_name?: string | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          service_type?: Database["public"]["Enums"]["product_type"] | null
          short_description?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          exclusions?: string | null
          id?: number
          isFavorite?: boolean | null
          long_description?: string | null
          operational_notes?: string | null
          prerequisites?: string[] | null
          price_id?: string | null
          price_max?: number | null
          price_min?: number | null
          product_name?: string | null
          product_type?: Database["public"]["Enums"]["product_type"] | null
          service_type?: Database["public"]["Enums"]["product_type"] | null
          short_description?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_customer: {
        Args: { contact: Json; organization: Json }
        Returns: Json
      }
    }
    Enums: {
      estimate_status:
        | "draft"
        | "sent"
        | "viewed"
        | "accepted"
        | "deposit_pending"
        | "deposit_paid"
        | "expired"
        | "declined"
        | "canceled"
        | "completed"
      product_type: "addon" | "product" | "bundle"
      service_type: "discovery" | "ui_ux_design" | "software_dev" | "website"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estimate_status: [
        "draft",
        "sent",
        "viewed",
        "accepted",
        "deposit_pending",
        "deposit_paid",
        "expired",
        "declined",
        "canceled",
        "completed",
      ],
      product_type: ["addon", "product", "bundle"],
      service_type: ["discovery", "ui_ux_design", "software_dev", "website"],
    },
  },
} as const
