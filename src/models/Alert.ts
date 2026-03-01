import { AlertType } from '../enums/AlertType';
import { AlertStatus } from '../enums/AlertStatus';
import { Location } from './Location';

/** Frontend entity representing a safety alert event */
export interface Alert {
  id: string;
  alertCode: string;          // Human-readable code e.g. ALT-0042
  touristId: string;
  touristName: string;
  type: AlertType;
  status: AlertStatus;
  location: Location;
  triggeredAt: string;
  resolvedAt?: string;
  resolvedById?: string;
  notes?: string;
}
