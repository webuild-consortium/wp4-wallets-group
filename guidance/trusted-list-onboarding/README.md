# Wallet Provider onboarding in WE BUILD

**Joining the Trusted List of Wallet Providers, and how that relates to the Interoperability Test
Bed and the Wallet Capability Viewer. A practical guide for Wallet Providers.**

Maintained by the Wallet Providers Group (T4.7) · Draft v0.8 · 7 September 2026

---

> ### Status: draft under development
>
> Onboarding is operated by the **WP4 Trust Infrastructure group**, the test procedures by the **WP4
> Testing group**. Where this guide and their documents differ, theirs govern.
>
> Unresolved points are marked **`[OI-nn]`** and listed in [Annex A](#annex-a--open-items).
>
> Corrections are welcome as pull requests.

---

## Purpose and scope

A wallet provider in WE BUILD faces three separate registrations, run by three different groups, and
they are routinely confused with one another.

| | Subject | Owner | Depth here |
|---|---|---|---|
| **Part A** | Onboarding to the **WE BUILD Trusted List of Wallet Providers** | WP4 Trust Infrastructure group | **Full procedure.** |
| **Part B** | The **Interoperability Test Bed**, as the activity that follows | WP4 Testing group | **Pointer only.** The ITB User Guide [[14]](https://github.com/webuild-consortium/wp4-interop-test-bed/blob/main/docs/user-guide-interoperability-test-bed.md) is the procedure. |
| **Annex C** | The **Wallet Capability Viewer** | Wallet Providers Group (T4.7) | **Summary only.** Its update guide [[12]](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/UPDATING.md) is the procedure. |

Part A covers **administrative onboarding during the pilot (MVP) phase**: eligibility, the data to
prepare, where to apply, what is reviewed, what you receive, and how to keep the entry current.

**Out of scope.** Onboarding as a PID Provider, QEAA Provider, PuB-EAA Provider, Access Certificate
Authority or Provider of Registration Certificates — those are separate Trusted Lists with their own
procedures [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md).
Relying Parties, which are **not** listed in Trusted Lists at all and register instead in the Raidiam
sandbox [[18]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/relying-party-registry-onboarding.md).
The MVP+ (production) model, in which Member State Supervisory Bodies and the European Commission
take over these roles — summarised in the Base Onboarding Framework [[3]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md)
and UC-03 [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).

**Audience:** wallet providers who are beneficiaries or Associated Partners of the WE BUILD
consortium.

**Normative sources:** UC-03 Wallet Provider Onboarding [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md),
Onboarding to the Trusted Lists [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md),
the Base Onboarding Framework [[3]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md),
and deliverable D4.4 [[5]](https://portal.webuildconsortium.eu/system/files/2026-08/D4.4%20-%20Trust%20Infrastructure%20Guidelines_V1.0_FINAL.pdf).

## Background — three lists, three different things

If you provide a wallet in WE BUILD, your name may appear on three lists. They are maintained by
three different groups, they mean three different things, and they are independent of one another.

| List | Maintained by | What it means | Establishes trust? |
|---|---|---|---|
| **Wallet Capability Viewer** [[11]](https://webuild-consortium.github.io/wp4-wallets-group/) | Wallet Providers Group (T4.7) | What your wallet supports, as you declared it | **No.** Self-declared, not a registry |
| **WE BUILD Trusted List of Wallet Providers** [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md) | WP4 Trust Infrastructure group | Your wallet solution's trust anchor is published and can be validated | **Yes.** This is the one that matters cryptographically |
| **ITB Conformance Overview** [[13]](https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html) | WP4 Testing group | Which ITB test suites you have passed | No, but it is the published evidence of conformance |

Being on one list does not put you on the others. Most providers will want all three. The Wallet
Capability Viewer is summarised in [Annex C](#annex-c--the-wallet-capability-viewer-t47).

---

# Part A — Onboarding to the Trusted List of Wallet Providers

## Step 1 — Confirm you are eligible

You must be a **beneficiary or an Associated Partner of the WE BUILD consortium**. In the pilot
(MVP) phase this is the only eligibility condition [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).

There is no conformity-assessment or certification requirement in the pilot. Certification under CIR
2024/2981 becomes a precondition only in the MVP+ (production) phase, where Member State Supervisory
Bodies and the European Commission take over these roles [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md)
[[3]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md).

## Step 2 — Prepare your data

**About your organisation (the legal entity):**

- legal name
- trade name, including EUID where applicable
- legal address
- Member State in which you are registered
- URI to your terms and conditions
- whether you are a QTSP
- whether you are a single-person company

**About each wallet solution:**

- whether it is an EUDI Wallet for natural persons or a European Business Wallet for legal persons
- name of the wallet solution
- URI to the wallet solution
- URI of its status-list entry *(optional)*
- details of the associated body, if applicable
- an **X.509 Certificate Signing Request** — required; your wallet solution certificate is issued
  against it
- unique reference identifier of the wallet solution *(optional in the pilot; required under
  CIR 2025/849 Annex 2(a) in MVP+)*

Source: UC-03, "Data to be provided" [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).
The Trusted List and certificate profiles are ETSI TS 119 602 and ETSI EN 319 412-6 §5, via Task 3
[[19]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task3-x509-pki-etsi/README.md)
[[20]](https://www.etsi.org/deliver/etsi_en/319400_319499/31941206/01.00.00_20/en_31941206v010000c.pdf).

> **The CSR.** Generate an ECDSA P-256 (`prime256v1`) key and a certificate signing request, with the
> subject built from your legal-entity data above. The `openssl` commands are published by the
> console operator [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).
>
> Do not use the certificate example in ETSI EN 319 412-6 §5 as a template: it is an issued
> certificate rather than a CSR, and it uses RSA. The WE BUILD CSR profile is being prepared under
> [wp4-trust-group #131](https://github.com/webuild-consortium/wp4-trust-group/issues/131).
> **`[OI-01]`**

## Step 3 — Identify the correct Trusted List

Six Trusted Lists are available for onboarding in the pilot: QEAA Providers, Access Certificate
Authorities, PID Providers, Providers of Registration Certificates, PuB-EAA Providers, and **Wallet
Providers** [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md).
Onboard to the list matching the role you play in your pilot use cases. As a wallet provider that is
**"WEBUILD - Wallet Providers"**.

Onboarding is requested through the IDunion console
[[6]](https://console.dev.idunion.info/my-trusted-lists), following the operator's onboarding guide
[[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding). This is the entry
point for the pilot.

You can browse the Trusted List directory without an account and see each list's name, owner and
type. An account is needed only to see the entities already onboarded to a list, or to submit a
request of your own (Step 4). A verifier consuming the lists needs no account at all — it resolves
them through the LoTL.

**How to confirm you have the right list.** The WE BUILD List of Trusted Lists (LoTL) is the trust
anchor for the pilot and is published in JSON [[8]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.json)
and XML [[9]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.xml). Its
wallet-provider entry [[10]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/lotl/tl_entries/wallet-provider/idunion.json)
points at `https://tl-api.dev.idunion.info/api/v1/3Krx8SGl/etsi/tl.xml`, the same list as
`console.dev.idunion.info/trusted-lists/3Krx8SGl`. It is the only wallet-provider Trusted List
referenced from the WE BUILD LoTL.

If you act in more than one role, you onboard to each corresponding Trusted List separately.

## Step 4 — Submit your onboarding request

You need an IDunion console account. No verifiable-credential wallet is involved; logging in with a
business wallet is not implemented.

Two routes exist [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md):

- **Via invitation** — you receive an invitation by e-mail from the Ecosystem Authority and start
  from the link in it.
- **Direct onboarding** — you log in, open the Trusted List directory, select the list and submit a
  request [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).

Once you reach the onboarding form, both routes are the same:

1. Fill in the required data about your organisation (Step 2) and continue.
2. A Certificate Signing Request is created automatically, **or** you upload one you created
   yourself.
3. The data you entered is digitally signed as part of the request. **This is not a signature in the
   legal sense.**
4. You receive a confirmation that your request is under review.
5. You are notified by e-mail once the Ecosystem Authority approves or rejects it.

**Key management options** [[7]](https://docs.dev.idunion.info/docs/user-guide/#key-management):
by default, private keys are held in a managed key-management module in a cloud environment; you may
instead upload a CSR created with keys you control locally; client-side HSMs can be supported on
request; for key management entirely on your own infrastructure the console operator asks you to
contact <info@idunion.eu>.

**What the form asks for** [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding):
organisation name, trade name, street address, city, province or state, postal code, jurisdiction,
e-mail, phone, website and terms-and-conditions URL. For wallet-provider lists it adds the wallet
solution's name, reference ID and URL.

> The form asks for less than UC-03 lists: there is no QTSP or single-person-company flag, no
> natural-or-legal-person field, no status-list URI and no associated body. Have the full Step 2 set
> ready. **`[OI-04]`**

## Step 5 — Review and approval

Two things are verified [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md):

1. that you are a beneficiary or Associated Partner of the WE BUILD consortium
2. that the Certificate Signing Request is in the expected format

The reviewing group **may** check whether the rest of your data is correct or complete, but is not
required to. Accuracy of your own data is your responsibility.

The **WP4 Trust Infrastructure lead and co-lead** are the Ecosystem Authority for this list, with the
Trust Infrastructure Responsible Group reviewing [[4]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/terms-and-entities.md).
**IDunion** hosts the list, operates the console, and approves onboarding requests by default;
another arrangement can be set up on request. For console questions, or to chase a pending request,
write to <info@idunion.eu>. **`[OI-05]`**

**How long it takes.** There is no service level. Requests are usually answered within a day, and
within several days when the operator's team is away.

**If approved**, you receive a notification, an X.509 certificate for each of your wallet solutions,
and your entry is added to the Trusted List of Wallet Providers. A Trust List Record is created, a
`did:web` identifier and DID document are generated and linked to your certificate, and the Trusted
List XML is regenerated to include your entry [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).
**If not approved**, you are informed of the result and may be asked for additional data.

**What your published entry is used for.** The certificate in your entry authenticates your wallet
solution: a verifier takes it from the Trusted List and uses it directly to check your Wallet
Instance Attestation and key attestation signatures. It is a trust anchor, not a certification
authority — it issues nothing.

**Trust resolves top down, and stops at your certificate.** A verifier checks the LoTL signature,
follows the pointer to the Trusted List, verifies that list's own signature, and takes your
certificate from inside it. Nothing is traced back up: your certificate is not chained to the
certificate that signs the list. That list-signing certificate is `CA:FALSE` with `keyUsage` limited
to `digitalSignature` — the ETSI TS 119 612 profile for a list signer, whose only job is to prove the
list authentic. Running `openssl verify` against it reports errors 79 and 32; nothing chains, so that
check does not apply.

**Wallet Instance Attestation and key attestation do not chain. WRPAC and WRPRC certificates do** —
leaf to CA, with that CA an anchor in a LoTE referenced from the LoTL. Same infrastructure, two
resolution models.

## Step 6 — Keep your entry current

- **Notify changes without undue delay.** Any change to your organisation data or your wallet
  solutions is reported to the Trust Infrastructure Responsible Group, which updates the Trusted List
  entry so that published information stays accurate [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).
- **De-listing and suspension.** An entry can be removed, suspended or set to invalid where the
  conditions for listing are no longer met, or at your own request. Certificates issued for a
  de-listed wallet solution are revoked, and revocation status is published in line with the Trusted
  List and certificate policy.
- **Check that the pointer certificate is current** before you validate against the pilot lists.
  Six of the pointer certificates in the published LoTL expired on 16 April 2026. **`[OI-07]`**
- **Audit what is actually published.** The EUDI Trusted Lists Inspector [[16]](https://trust-inspector.credimi.io/)
  audits the WE BUILD LoTL and the referenced Trusted Lists — signatures, schemas, certificate
  chains, list pointers — and produces evidence reports. A debug and testing tool for LoTL, TLs and
  LoTEs is also proposed at <https://lote.credimi.io/> [[17]](https://lote.credimi.io/).

---

# Part B — After onboarding: the Interoperability Test Bed

The Interoperability Test Bed is operated by the WP4 Testing group and is separate from Trusted List
onboarding. You can be listed without using the ITB, and run the ITB's Base Protocols suite without
being listed. Where the two meet is in
[B.4](#b4--the-dependency-on-trusted-list-onboarding).

## B.1 — What the ITB tests

- **Base Protocols suite** [[15]](https://github.com/webuild-consortium/wp4-interop-test-bed/tree/main/tests/base-protocols)
  — covers CS-01 Credential Issuance and CS-02 Credential Presentation [[21]](https://github.com/webuild-consortium/wp4-architecture/tree/main/conformance-specs).
  Test cases, matrices and expected endpoint configuration are published. Most providers listed on
  the Conformance Overview have passed this suite.
- **"WE BUILD CTS – Trust Framework Integration" suite** — Conformance Test Suite v1.1, August 2026,
  covering WBCS 001, 002 and 004 including the optional WUA-related checks. In the ITB it is under
  *Conformance statements → Base Protocols → WE BUILD CTS Trust Framework Integration*. It exercises
  the same issuance and presentation scenarios as the CS-01 and CS-02 suites and adds the
  trust-framework validation checks. Its test cases are not yet in the repository. **`[OI-08]`**

## B.2 — Getting access to the ITB

Contact the Testing group's support channel, `#itb-support`
[[22]](https://we-build-consortium.slack.com/archives/C09K65GLKT2), with:

- your organisation name and technical and governance contacts
- the roles you intend to test (Issuer / Verifier / Holder)
- your target profiles and protocol versions

You then supply your base URLs per environment and your security mode. Full procedure in the ITB
User Guide [[14]](https://github.com/webuild-consortium/wp4-interop-test-bed/blob/main/docs/user-guide-interoperability-test-bed.md).

## B.3 — Being listed on the Conformance Overview

Run the test cases, generate the conformance statement report as a PDF, upload it to the
"Conformance Statement Reports" folder in the Testing group's portal files, and ask on the support
channel to be listed. The report is checked before the listing is updated
[[13]](https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html).

**Trust framework conformance uses the same evidence.** The ITB-generated conformance statement
report is the evidence; no separate artefact is expected. The Conformance Overview records Base
Protocols conformance only, and a Trust Framework Integration section is to be added so that this
result is visible on its own. **`[OI-10]`**

## B.4 — The dependency on Trusted List onboarding

- **Base Protocol conformance — no Trusted List onboarding prerequisite.** The Base Protocols, CS-01
  Issuance and CS-02 Presentation suites establish protocol-level interoperability.
- **Trust Framework Integration conformance — Trusted List onboarding is a prerequisite** for the
  trust-dependent checks. Where a test requires the ITB or the reference implementation to establish
  trust through the WE BUILD trust infrastructure, the relevant entity must already be onboarded to
  the appropriate WE BUILD Trusted List.

---

# Annex A — Open items

Points the published material does not answer. Each is addressed to the group that owns it; please
reply by item reference.

| Ref | What is needed | Owner | Blocks |
|---|---|---|---|
| **OI-01** | The WE BUILD CSR profile for the wallet-solution certificate, aligned to EN 319 412-6 and replacing the RSA issued-certificate example. The open points on [wp4-trust-group #131](https://github.com/webuild-consortium/wp4-trust-group/issues/131) are answered; the Task 3 update is pending. | Trust Infrastructure group | Step 2 |
| **OI-04** | Which data set governs the wallet-provider submission. The console form collects organisation contact details and three wallet-solution fields; UC-03 additionally requires the QTSP and single-person-company flags, whether the wallet is for natural or legal persons, the status-list entry URI and the associated body, and does not mention e-mail, phone or website. Either the form or the data contract needs to move. | Console operator / Trust Infrastructure group | Step 4 |
| **OI-05** | Who approves a wallet-provider application in practice. `terms-and-entities.md` and the Trust Infrastructure group place the decision with the Trust Infrastructure Responsible Group and the WP4 lead and co-lead acting as Ecosystem Authority; the console operator states that IDunion approves by default and can arrange otherwise on request, and the console documentation names the Trusted List Owner. Confirmation that these are one arrangement described at different levels, or a statement of which applies to this list. | Trust Infrastructure group / console operator | Step 5 |
| **OI-07** | Reissue of the expired Trusted List pointer certificates. Six pointers in the published LoTL — Wallet Providers, PID, PuB-EAA, WRPAC, WRPRC and QEAA — carry an expiry of 16 April 2026; the Credimi, NXD Foundation and Raidiam pointers are in date. A consumer that only verifies the LoTL signature is unaffected; one that follows the Wallet Providers pointer and checks that certificate's validity will reject the list. The operator has confirmed the reissue is in hand. Automated expiry checking is proposed in [wp4-trust-group #132](https://github.com/webuild-consortium/wp4-trust-group/pull/132). | Console operator | Step 6 |
| **OI-08** | Publication of the Trust Framework Integration test cases and their prerequisites, and an update of the Base Protocols README, which describes the earlier organisation of the test cases. | Testing group | Part B.1 |
| **OI-10** | A Trust Framework Integration section in the Conformance Overview, so that the result is visible independently of Base Protocols conformance. | Testing group | Part B.3 |

---

# Annex B — References

1. **Onboarding to the Trusted Lists** — WP4 Trust Infrastructure group, pilot procedure. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md>
2. **UC-03 Wallet Provider Onboarding** — normative use case: actors, goals, preconditions, data model, RACI, main flow, post-onboarding. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md>
3. **Base Onboarding Framework** — MVP / MVP+ definitions, Member State requirements, RACI matrix. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md>
4. **Consolidated Terms and Entity Definitions** — including the Trust Infrastructure Responsible Group (§4.1). <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/terms-and-entities.md>
5. **D4.4 Trust Infrastructure Guidelines**, v1.0, August 2026 — §7 Pilot onboarding guidelines. WE BUILD Portal (portal access may be required): <https://portal.webuildconsortium.eu/system/files/2026-08/D4.4%20-%20Trust%20Infrastructure%20Guidelines_V1.0_FINAL.pdf>
6. **IDunion console — My Trusted Lists.** <https://console.dev.idunion.info/my-trusted-lists>
7. **IDunion Trusted List Hosting Service — User Guide.** Console operator product documentation; not a WE BUILD document. Key management: <https://docs.dev.idunion.info/docs/user-guide/#key-management>
8. **WE BUILD List of Trusted Lists (JSON).** <https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.json>
9. **WE BUILD List of Trusted Lists (XML).** <https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.xml>
10. **LoTL entry for wallet providers.** <https://github.com/webuild-consortium/wp4-trust-group/blob/main/lotl/tl_entries/wallet-provider/idunion.json>
11. **Wallet Capability Viewer** — Wallet Providers Group. <https://webuild-consortium.github.io/wp4-wallets-group/>
12. **Updating your wallet capabilities entry.** <https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/UPDATING.md>
13. **ITB Conformance Overview** — Testing group. <https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html>
14. **EUDI Wallet Interoperability Test Bed — User Guide**, v1.0, November 2025. <https://github.com/webuild-consortium/wp4-interop-test-bed/blob/main/docs/user-guide-interoperability-test-bed.md>
15. **ITB Base Protocols test cases.** <https://github.com/webuild-consortium/wp4-interop-test-bed/tree/main/tests/base-protocols>
16. **EUDI Trusted Lists Inspector.** <https://trust-inspector.credimi.io/> · source: <https://github.com/ForkbombEu/eudi-trusted-lists-inspector>
17. **LoTL / TL / LoTE debug and testing tool.** <https://lote.credimi.io/>
18. **Wallet Relying Party Registry Onboarding** — Raidiam sandbox, for Relying Parties. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/relying-party-registry-onboarding.md>
19. **Task 3 — X.509 PKI with ETSI Alignments.** <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task3-x509-pki-etsi/README.md>
20. **ETSI EN 319 412-6** — certificate profiles, §5. <https://www.etsi.org/deliver/etsi_en/319400_319499/31941206/01.00.00_20/en_31941206v010000c.pdf>
21. **WE BUILD Conformance Specifications** — Architecture group. <https://github.com/webuild-consortium/wp4-architecture/tree/main/conformance-specs>
22. **`#itb-support`** — Testing group support channel, WE BUILD Slack. <https://we-build-consortium.slack.com/archives/C09K65GLKT2>
23. **IDunion — Direct Onboarding.** Console operator product documentation, scoped to a test environment; not a WE BUILD document. <https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding>

---

# Annex C — The Wallet Capability Viewer (T4.7)

Not part of Trusted List onboarding, and it confers no trust.

Two routes, both in the update guide [[12]](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/UPDATING.md):
join the `wp4-wallet-providers-contributors` GitHub team and open a pull request against the CSV
(preferred), or fill in only what changes in the update template and send it to the leading team,
who apply it. Repository access and onboarding questions to <webuild-github-support@grnet.gr>. The
data is self-declared and the viewer is not an official registry.
