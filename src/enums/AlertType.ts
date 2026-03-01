/** Categorises the cause or nature of a safety alert */
export enum AlertType {
  PANIC          = 'PANIC',          // Manual SOS trigger by tourist
  SOS_MEDICAL    = 'SOS_MEDICAL',    // Medical emergency
  ZONE_OVERSTAY  = 'ZONE_OVERSTAY',  // Tourist exceeded permitted zone time
  DOCUMENT_ISSUE = 'DOCUMENT_ISSUE', // Document verification problem
  SYSTEM         = 'SYSTEM',         // Automated system-generated alert
}
