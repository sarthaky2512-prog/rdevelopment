# Firestore Security Specification — Rdevelopmentgroup

## 1. Data Invariants
1. **Admin Authority Boundary**: Only verified administrators (`request.auth != null && request.auth.token.email_verified == true` and either the bootstrapped admin email or an existing `/admins/{uid}` document) can create, update, or delete public CMS collections (`site_settings`, `services`, `projects`, `categories`, `pages`, `testimonials`, `admins`).
2. **PII Isolation (Inquiries)**: Customer inquiries (`/inquiries/{inquiryId}`) contain PII (`fullName`, `email`, `phone`, `projectAddress`). Public users may submit a valid inquiry (`create` only with `status == 'new'`, `privacyConsent == true`, and server timestamp `request.time`), while `get`, `list`, `update`, and `delete` are strictly restricted to verified admins (`isAdmin()`).
3. **Immutable Audit Timestamps**: `createdAt` on `/inquiries` and `/admins` cannot be altered after creation (`incoming().createdAt == existing().createdAt`) and must equal `request.time` upon creation. `updatedAt` on CMS documents must equal `request.time` on writes.
4. **Strict Key & Size Containment**: Every document enforces `keys().hasAll(...) && keys().hasOnly(...)` on creation and strict `affectedKeys().hasOnly(...)` on updates, with explicit `.size()` bounds on every string and array field.
5. **Path ID Hardening**: Single-document operations validate `isValidId(docId)` (`^[a-zA-Z0-9_-]+$`, max 128 chars).

## 2. The "Dirty Dozen" Attack Payloads (All Must Yield PERMISSION_DENIED)
1. **Unauthenticated CMS Write**: Unauthenticated write to `/site_settings/global` -> DENIED.
2. **Unverified Email Admin Spoof**: Authenticated user with `email_verified: false` claiming admin email -> DENIED.
3. **Self-Assigned Admin Escalation**: Non-admin authenticated user creating `/admins/{uid}` with `role: 'admin'` -> DENIED.
4. **PII Blanket Read on Inquiries**: Non-admin user calling `get` or `list` on `/inquiries` -> DENIED.
5. **Shadow Field Injection on Inquiry**: Public `create` on `/inquiries/{id}` injecting extra key `isAdminApproved: true` -> DENIED (`hasOnly` check).
6. **Inquiry Status Tampering at Creation**: Public `create` on `/inquiries/{id}` with `status: 'reviewed'` instead of `'new'` -> DENIED.
7. **Consent Bypass on Inquiry**: Public `create` on `/inquiries/{id}` with `privacyConsent: false` -> DENIED.
8. **Timestamp Spoofing**: Public `create` on `/inquiries/{id}` with client-forged `createdAt` != `request.time` -> DENIED.
9. **Resource Poisoning (Oversized Payload)**: Public `create` on `/inquiries/{id}` with 10KB `fullName` or 1MB `description` -> DENIED.
10. **Path ID Poisoning**: Document creation with invalid ID `../evil` or >128 char ID -> DENIED (`isValidId`).
11. **Project Status Value Poisoning**: Admin/user attempting `projectStatus: 'verified_fake'` not in `['sample', 'completed']` -> DENIED.
12. **Unbounded Array Injection**: Attempting to inject > 12 items into `benefits`, `scopeItems`, `galleryImages`, or `attachmentUrls` -> DENIED.
