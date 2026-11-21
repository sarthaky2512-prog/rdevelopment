/**
 * Firestore Security Rules Test Specification (Dirty Dozen Verification)
 * Covers all 12 adversarial payloads against firestore.rules invariants.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expected: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
}

export const dirtyDozenCases: SecurityTestCase[] = [
  { id: 1, name: 'Unauthenticated CMS Write', collection: 'site_settings/global', operation: 'update', expected: 'PERMISSION_DENIED', payload: { companyName: 'Hijacked' } },
  { id: 2, name: 'Unverified Email Admin Spoof', collection: 'services/svc-1', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Self-Assigned Admin Escalation', collection: 'admins/attacker-uid', operation: 'create', expected: 'PERMISSION_DENIED', payload: { email: 'attacker@example.com', role: 'admin' } },
  { id: 4, name: 'PII Blanket Read on Inquiries', collection: 'inquiries', operation: 'list', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Shadow Field Injection on Inquiry', collection: 'inquiries/inq-1', operation: 'create', expected: 'PERMISSION_DENIED', payload: { isAdminApproved: true } },
  { id: 6, name: 'Inquiry Status Tampering at Creation', collection: 'inquiries/inq-2', operation: 'create', expected: 'PERMISSION_DENIED', payload: { status: 'reviewed' } },
  { id: 7, name: 'Consent Bypass on Inquiry', collection: 'inquiries/inq-3', operation: 'create', expected: 'PERMISSION_DENIED', payload: { privacyConsent: false } },
  { id: 8, name: 'Timestamp Spoofing on Inquiry', collection: 'inquiries/inq-4', operation: 'create', expected: 'PERMISSION_DENIED', payload: { createdAt: '2020-01-01T00:00:00Z' } },
  { id: 9, name: 'Resource Poisoning Oversized String', collection: 'inquiries/inq-5', operation: 'create', expected: 'PERMISSION_DENIED', payload: { fullName: 'A'.repeat(500) } },
  { id: 10, name: 'Path ID Poisoning', collection: 'inquiries/bad..id', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Project Status Enum Poisoning', collection: 'projects/proj-1', operation: 'create', expected: 'PERMISSION_DENIED', payload: { projectStatus: 'awarded' } },
  { id: 12, name: 'Unbounded Array Injection', collection: 'services/svc-2', operation: 'create', expected: 'PERMISSION_DENIED', payload: { benefits: new Array(25).fill('item') } },
];
