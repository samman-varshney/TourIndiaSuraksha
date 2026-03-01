/** Lifecycle states of a safety alert from creation to closure */
export enum AlertStatus {
  ACTIVE     = 'ACTIVE',      // Alert is open and requires action
  RESPONDING = 'RESPONDING',  // A unit has been dispatched
  RESOLVED   = 'RESOLVED',    // Alert closed successfully
  ESCALATED  = 'ESCALATED',   // Passed to senior authority
  DISMISSED  = 'DISMISSED',   // Determined to be a false alarm
}
