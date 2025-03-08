export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      auth_logs: {
        Row: {
          auth_type: string
          created_at: string | null
          failure_reason: string | null
          id: string
          ip_address: string | null
          success: boolean | null
          transaction_amount: number | null
          transaction_recipient: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          auth_type: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean | null
          transaction_amount?: number | null
          transaction_recipient?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          auth_type?: string
          created_at?: string | null
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean | null
          transaction_amount?: number | null
          transaction_recipient?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          created_at: string | null
          details: Json | null
          external_id: string | null
          id: string
          is_default: boolean | null
          name: string
          provider: string | null
          status: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          external_id?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          provider?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          external_id?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          provider?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          approved_at: string | null
          created_at: string | null
          description: string | null
          id: string
          recipient: string
          rejected_at: string | null
          requires_biometric: boolean | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          approved_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          recipient: string
          rejected_at?: string | null
          requires_biometric?: boolean | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          approved_at?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          recipient?: string
          rejected_at?: string | null
          requires_biometric?: boolean | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_security_settings: {
        Row: {
          biometric_enabled: boolean | null
          biometric_signin_enabled: boolean | null
          created_at: string | null
          face_id_enabled: boolean | null
          fingerprint_enabled: boolean | null
          id: string
          require_biometric_above: number | null
          sms_approval_enabled: boolean | null
          transaction_limit: number | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          biometric_enabled?: boolean | null
          biometric_signin_enabled?: boolean | null
          created_at?: string | null
          face_id_enabled?: boolean | null
          fingerprint_enabled?: boolean | null
          id?: string
          require_biometric_above?: number | null
          sms_approval_enabled?: boolean | null
          transaction_limit?: number | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          biometric_enabled?: boolean | null
          biometric_signin_enabled?: boolean | null
          created_at?: string | null
          face_id_enabled?: boolean | null
          fingerprint_enabled?: boolean | null
          id?: string
          require_biometric_above?: number | null
          sms_approval_enabled?: boolean | null
          transaction_limit?: number | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          metadata: Json | null
          payment_method_id: string | null
          status: string | null
          type: string
          updated_at: string | null
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method_id?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number | null
          created_at: string | null
          currency: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          currency?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
