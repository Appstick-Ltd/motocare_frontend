// Database Types for MotoCare Supabase Project
// Reflects discovered schema tables: profiles, vehicles, service_records, fuel_logs, app_content

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'USER';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface Profile {
  id: string; // FK to auth.users.id
  email: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  status?: UserStatus;
  subscription_plan?: string | null;
  is_pro?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Vehicle {
  id: string;
  user_id: string; // FK to profiles.id
  vehicle_type: string;
  odometer?: number | null;
  created_at: string;
  brand?: string;
  model?: string;
  year?: number;
  license_plate?: string | null;
  vin?: string | null;
  status?: string;
  owner?: Profile;
}

export interface ServiceRecord {
  id: string;
  user_id: string; // FK to profiles.id
  vehicle_id?: string;
  service_type: string;
  service_category?: string;
  service_date: string;
  notes: string | null;
  odometer?: number | null;
  cost?: number;
  status?: string;
  created_at: string;
  user?: Profile;
  vehicle?: Vehicle;
}

// Alias for backwards-compatibility in components
export type MaintenanceRecord = ServiceRecord;

export interface FuelLog {
  id: string;
  user_id: string; // FK to profiles.id
  vehicle_id?: string;
  fuel_type: string | null;
  liters: number | null;
  price_per_unit: number | null;
  odometer: number | null;
  notes: string | null;
  created_at: string;
  user?: Profile;
}

export interface AppContent {
  id: string;
  content_type: 'privacy_policy' | 'terms_conditions' | 'about_us' | string;
  title: string;
  content: string;
  is_active: boolean;
  version: number;
  created_at: string;
}

// Admin-specific telemetry types for tables to be created in Phase 2
export interface SubscriptionPricing {
  id: string;
  currency_code: string;
  currency_symbol: string;
  free_price: number;
  standard_price: number;
  premium_price: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  status: string;
  description: string | null;
  features: string[];
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  expiry_date: string;
  created_at: string;
  user?: Profile;
  plan?: Plan;
}

export interface Transaction {
  id: string;
  user_id: string;
  subscription_id: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  reference_id: string | null;
  created_at: string;
  user?: Profile;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  target_audience: 'all' | 'active_users' | 'super_admins';
  status: string;
  sent_at: string;
  created_by: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  admin_id: string | null;
  admin_email: string;
  action: string;
  resource: string;
  resource_id: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  user_id?: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied' | 'resolved' | string;
  created_at: string;
}

