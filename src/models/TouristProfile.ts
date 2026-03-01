/** Frontend entity representing a tourist's extended travel profile */
export interface TouristProfile {
  id: string;
  userId: string;
  touristId: string;         // Government-issued Tourist Digital ID
  nationality: string;
  passportNumber: string;
  bloodGroup?: string;
  medicalNotes?: string;
  emergencyContacts: EmergencyContact[];
  isVerified: boolean;
  createdAt: string;
}

/** An emergency contact linked to a tourist profile */
export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}
