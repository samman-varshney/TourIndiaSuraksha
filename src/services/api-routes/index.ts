// All backend API endpoint paths defined in one place
// export const API_ROUTES = {

import { guestAuthRoutes } from "./guest/auth";

//   TOURIST: {
//     PROFILE:  '/tourist/profile',
//     LIST:     '/tourist',
//     BY_ID:    (id: string) => `/tourist/${id}`,
//   },
//   ALERTS: {
//     LIST:     '/alerts',
//     BY_ID:    (id: string) => `/alerts/${id}`,
//     RESOLVE:  (id: string) => `/alerts/${id}/resolve`,
//     ESCALATE: (id: string) => `/alerts/${id}/escalate`,
//     PANIC:    '/alerts/panic',
//   },
//   LOCATION: {
//     CURRENT:  '/location/current',
//     HISTORY:  '/location/history',
//     UPDATE:   '/location/update',
//   },
// } as const;

export const authRoutes = {
  guest: guestAuthRoutes,
};
