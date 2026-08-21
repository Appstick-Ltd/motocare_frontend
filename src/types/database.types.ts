export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'USER';
export type UserStatus = 'active' | 'suspended' | 'pending';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending';
export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  year: number;
  license_plate: string | null;
  vin: string | null;
  vehicle_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  owner?: Profile;
}

export interface VehicleBrand {
  id: string;
  name: string;
  icon_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface VehicleType {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicle_id: string;
  user_id: string;
  service_category: string;
  service_date: string;
  cost: number;
  status: MaintenanceStatus;
  notes: string | null;
  odometer_km: number | null;
  created_at: string;
  vehicle?: Vehicle;
  user?: Profile;
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
  status: SubscriptionStatus;
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
  status: PaymentStatus;
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

export interface AppContent {
  id: string;
  slug: 'privacy-policy' | 'terms-conditions' | 'about-us';
  title: string;
  content: string;
  updated_by: string | null;
  updated_at: string;
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

export interface AppSettings {
  key: string;
  value: Record<string, unknown>;
  description: string | null;
  updated_at: string;
}
