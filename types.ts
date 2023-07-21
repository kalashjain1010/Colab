// export interface UserDetails {
//   about: string | null;
//   email: string | null;
//   first_name: string | null;
//   id: string;
//   industry: string | null;
//   last_name: string | null;
//   linkedin: string | null;
//   location: string | null;
//   phone_number: number | null;
//   website: string | null;
// }

import { FieldValue } from "firebase/firestore";

export interface Project{
  id: string;
  user_id: string;
  title: string;
  description: string
  applicants: string[] | null
  created_at?: FieldValue
}

export interface Applicant{
  id: string;
  name: string;
  email: string;
  phone_number: number;
  linkedin: string;
  status: 'pending' | 'accepted'
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  applied?: string[] | null
}
