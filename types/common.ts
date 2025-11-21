export interface Banner {
  file: string;
  media_type: "image" | "video";
}
export interface ButtonProps {
  title: string;
  outline?: boolean;
  onPress?: () => void;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}
export interface Store {
  id: number,
  name: string;
  description: string;
  area_street: string;
  district: string;
  state: string;
  pincode: string;
  contact_number: string;
  alternative_contact_number: string;
  contact_email: string;
  latitude: number;
  longitude: number;
  file_1: string;
  file_2?: string | null;
  file_3?: string | null;
  file_4?: string | null;
  visit_count: number;
  timings: string;
}

// Root object for multiple stores
export interface StoreData {
  stores: Store[];
}

export interface ContactData{
  name: string;
  email: string;
  phone: string;
  message: string;
}
export interface StoreCardProps extends Store {
  userLatitude?: number|null;
  userLongitude?: number|null;
}
