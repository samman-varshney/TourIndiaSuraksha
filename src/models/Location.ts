/** Frontend entity representing a geographical coordinate with metadata */
export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;          // GPS accuracy in metres
  address?: string;           // Human-readable reverse-geocoded address
  zone?: string;              // Named safety zone identifier
  capturedAt: string;         // ISO timestamp of the coordinate capture
}
