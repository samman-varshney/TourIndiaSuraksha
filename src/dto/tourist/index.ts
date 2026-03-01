/** Request body for creating or updating a tourist profile */
export interface CreateTouristProfileDto {
  nationality: string;
  passportNumber: string;
  bloodGroup?: string;
  medicalNotes?: string;
}

/** Response shape for a tourist profile from the API */
export interface TouristProfileResponseDto {
  id: string;
  userId: string;
  touristId: string;
  nationality: string;
  passportNumber: string;
  isVerified: boolean;
  createdAt: string;
}
