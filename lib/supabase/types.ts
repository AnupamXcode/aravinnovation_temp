export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string;
          phone: string;
          service: string;
          requirement: string;
          timeline: string;
          budget: string | null;
          industry: string | null;
          original_query: string | null;
          conversation_context: Json | null;
          source: string;
          status: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed' | 'qualified' | 'archived';
          ip_address: string | null;
          company_email_status: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          user_email_status: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          submitted_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          company: string;
          phone: string;
          service: string;
          requirement: string;
          timeline: string;
          budget?: string | null;
          industry?: string | null;
          original_query?: string | null;
          conversation_context?: Json | null;
          source?: string;
          status?: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed' | 'qualified' | 'archived';
          ip_address?: string | null;
          company_email_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          user_email_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          submitted_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          company?: string;
          phone?: string;
          service?: string;
          requirement?: string;
          timeline?: string;
          budget?: string | null;
          industry?: string | null;
          original_query?: string | null;
          conversation_context?: Json | null;
          source?: string;
          status?: 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed' | 'qualified' | 'archived';
          ip_address?: string | null;
          company_email_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          user_email_status?: 'PENDING' | 'SENT' | 'FAILED' | 'SKIPPED' | null;
          submitted_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_profiles: {
        Row: {
          id: string;
          email: string;
          role: 'superadmin' | 'admin' | 'editor';
          full_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'superadmin' | 'admin' | 'editor';
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'superadmin' | 'admin' | 'editor';
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
