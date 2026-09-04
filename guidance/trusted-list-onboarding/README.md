# Wallet Provider onboarding in WE BUILD

**Joining the Trusted List of Wallet Providers, and how that relates to the Interoperability Test
Bed and the Wallet Capability Viewer. A practical guide for Wallet Providers.**

Maintained by the Wallet Providers Group (T4.7) · Draft v0.6 · 5 September 2026

---

> ### Status: draft under development
>
> **This document defines nothing.** The onboarding process is defined and operated by the **WP4
> Trust Infrastructure group**; the test procedures are defined and operated by the **WP4 Testing
> group**. This guide sequences their published material for wallet providers and links to it. Where
> this guide and their documents differ, **their documents govern**.
>
> Eleven points are recorded. They are marked **`[OI-nn]`** in the text and collected in
> [Annex A](#annex-a--open-items-register), addressed to the group that owns each. **Two were
> answered by the Trust Infrastructure group on 4 September 2026 and are marked closed there.**
> Until an item is closed, this guide deliberately says nothing about it rather than describing a
> step that has not been confirmed.
>
> Corrections and contributions from either group are welcome as pull requests. If either group
> would rather own this document, we will move it to their repository.

---

## Purpose and scope

A wallet provider in WE BUILD faces three separate registrations, run by three different groups, and
they are routinely confused with one another. This guide exists to separate them, and to give the
full procedure for the one that establishes trust.

**What this guide covers, and at what depth:**

| | Subject | Owner | Depth here |
|---|---|---|---|
| **Part A** | Onboarding to the **WE BUILD Trusted List of Wallet Providers** | WP4 Trust Infrastructure group | **Full procedure.** The published material is spread across several documents; this guide sequences it end to end. |
| **Part B** | The **Interoperability Test Bed**, as the activity that follows | WP4 Testing group | **Pointer only.** The Testing group maintains its own current user guide [[14]](https://github.com/webuild-consortium/wp4-interop-test-bed/blob/main/docs/user-guide-interoperability-test-bed.md); this guide does not duplicate it, and covers only where the two meet. |
| **Annex C** | The **Wallet Capability Viewer** | Wallet Providers Group (T4.7) | **Summary only.** Its own update guide [[12]](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/UPDATING.md) is the procedure. |

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

*This section is context, not a step. If you already know the difference, go to Step 1.*

If you provide a wallet in WE BUILD, your name may appear on three lists. They are maintained by
three different groups, they mean three different things, and they are independent of one another.

| List | Maintained by | What it means | Establishes trust? |
|---|---|---|---|
| **Wallet Capability Viewer** [[11]](https://webuild-consortium.github.io/wp4-wallets-group/) | Wallet Providers Group (T4.7) | What your wallet supports, as you declared it | **No.** Self-declared, not a registry |
| **WE BUILD Trusted List of Wallet Providers** [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md) | WP4 Trust Infrastructure group | Your wallet solution's trust anchor is published and can be validated | **Yes.** This is the one that matters cryptographically |
| **ITB Conformance Overview** [[13]](https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html) | WP4 Testing group | Which ITB test suites you have passed | No, but it is the published evidence of conformance |

Being on one list does not put you on the others. Most providers will want all three.
**Part A** of this guide covers the Trusted List. **Part B** covers what follows it in the
Interoperability Test Bed. The Wallet Capability Viewer is handled separately and is summarised in
[Annex C](#annex-c--the-wallet-capability-viewer-t47).

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

> **CSR profile.** ETSI EN 319 412-6 §5, referenced from UC-03 via Task 3, is the **issued-certificate
> profile, not a CSR template**. Do not copy the published certificate example as a template for your
> request: it is an issued certificate and it uses RSA, and it is being corrected
> ([wp4-trust-group #131](https://github.com/webuild-consortium/wp4-trust-group/issues/131)).
>
> **If you upload your own CSR for the pilot, use ECDSA P-256 (`prime256v1`), with a subject built
> from the UC-03 legal-entity data.** A P-256 example is to be added to Task 3 under the same issue.
> Trust Infrastructure group, 4 September 2026. **`[OI-01]`** stays open until that example is
> published.

## Step 3 — Identify the correct Trusted List

Six Trusted Lists are available for onboarding in the pilot: QEAA Providers, Access Certificate
Authorities, PID Providers, Providers of Registration Certificates, PuB-EAA Providers, and **Wallet
Providers** [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md).
Onboard to the list matching the role you play in your pilot use cases. As a wallet provider that is
**"WEBUILD - Wallet Providers"**.

Onboarding is requested through the IDunion console
[[6]](https://console.dev.idunion.info/my-trusted-lists), with the operator's user guide at [[7]](https://docs.dev.idunion.info/docs/user-guide/#onboarding-to-a-trusted-list).
Both are confirmed by the Trust Infrastructure group as the entry point for the pilot (4 September
2026).

> **UC-03 still says the request starts "via Open Social of the WeBuild Consortium". That line is
> stale** and the Trust Infrastructure group will replace it with the console URL. Use the console.

**How to confirm you have the right list.** The WE BUILD List of Trusted Lists (LoTL) is the trust
anchor for the pilot and is published in JSON [[8]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.json)
and XML [[9]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.xml). Its
wallet-provider entry [[10]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/lotl/tl_entries/wallet-provider/idunion.json)
points at `https://tl-api.dev.idunion.info/api/v1/3Krx8SGl/etsi/tl.xml`, the same list as
`console.dev.idunion.info/trusted-lists/3Krx8SGl`. At the time of writing it is the only
wallet-provider Trusted List referenced from the WE BUILD LoTL.

If you act in more than one role, you onboard to each corresponding Trusted List separately.

## Step 4 — Submit your onboarding request

Two routes exist [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md)
[[7]](https://docs.dev.idunion.info/docs/user-guide/#onboarding-to-a-trusted-list):

- **Via invitation** — you receive an invitation by e-mail from the Ecosystem Authority and start
  from the link in it.
- **By request, without an invitation** — you find the Trusted List in the console yourself and
  submit a request.

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

> **What is confirmed, and what is not.** Trust Infrastructure group, 4 September 2026.
>
> - **The submission channel is the same console** for a wallet provider as for any other onboardee,
>   despite the operator's user guide naming only "Issuers of Electronic Attestations of Attributes".
> - **The data you prepare is the UC-03 wallet-provider set** (Step 2), not the operator's generic
>   EAA-issuer set.
> - **Whether the on-screen form actually collects the UC-03 wallet-solution fields is not
>   published.** Prepare the UC-03 data; do not assume the form asks for all of it. `[OI-04]`
> - **How you authenticate `[OI-02]`, and whether an account must exist before you can find a Trusted
>   List and start a request `[OI-03]`, are for the console operator to confirm.** The Trust
>   Infrastructure group's reading is that a wallet for natural persons is not part of the flow, and
>   that "register for an account" means creating a console account. **That is a reading, not a
>   confirmation.**
>
> See [Annex A](#annex-a--open-items-register).

## Step 5 — Review and approval

Two things are verified [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md):

1. that you are a beneficiary or Associated Partner of the WE BUILD consortium
2. that the Certificate Signing Request is in the expected format

The reviewing group **may** check whether the rest of your data is correct or complete, but is not
required to. Accuracy of your own data is your responsibility.

**If approved**, you receive a notification, an X.509 certificate for each of your wallet solutions,
and your entry is added to the Trusted List of Wallet Providers.
**If not approved**, you are informed of the result and may be asked for additional data.

In the pilot phase the Ecosystem Authority and Trusted List Provider is the WP4 Trust Infrastructure
group, acting through the Trust Infrastructure Responsible Group [[4]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/terms-and-entities.md).

> **Who reviews, and who decides.** The **Trust Infrastructure Responsible Group** reviews. The
> **WP4 Trust Infrastructure lead and co-lead** take the decision, acting as Ecosystem Authority.
>
> **Where to ask.** **IDunion is designated for the Trusted List of Wallet Providers**: it hosts the
> list and operates the console. For console questions, or to chase a pending request, write to
> <info@idunion.eu>. Trust Infrastructure group, 4 September 2026.
>
> **`[OI-06]` Turnaround.** There is no service level for the first decision, and the Trust
> Infrastructure group will not publish an estimate until the console operator agrees one. Note that
> "without undue delay" applies to **updates after you are listed**, not to the initial decision.

## Step 6 — Keep your entry current

- **Notify changes without undue delay.** Any change to your organisation data or your wallet
  solutions is reported to the Trust Infrastructure Responsible Group, which updates the Trusted List
  entry so that published information stays accurate [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).
- **De-listing and suspension.** An entry can be removed, suspended or set to invalid where the
  conditions for listing are no longer met, or at your own request. Certificates issued for a
  de-listed wallet solution are revoked, and revocation status is published in line with the Trusted
  List and certificate policy.
- Before you validate chains against the pilot, check that the pointer certificate is current.
- **Audit what is actually published.** The EUDI Trusted Lists Inspector [[16]](https://trust-inspector.credimi.io/)
  audits the WE BUILD LoTL and the referenced Trusted Lists — signatures, schemas, certificate
  chains, list pointers — and produces evidence reports. A debug and testing tool for LoTL, TLs and
  LoTEs is also proposed at <https://lote.credimi.io/> [[17]](https://lote.credimi.io/).

---

# Part B — After onboarding: the Interoperability Test Bed

**The Interoperability Test Bed is operated by the WP4 Testing group and is separate from Trusted
List onboarding.** Part A is complete on its own: a wallet provider can be listed on the Trusted List
without using the ITB, and can use the ITB's Base Protocols suite without being on the Trusted List.

Part B is included because the two meet at one point: **some ITB test cases exercise the trust
framework and therefore depend on the Trusted List.** How far that dependency reaches is not
published and is `[OI-09]` for the Testing group to confirm.

## B.1 — What the ITB tests

- **Base Protocols suite** [[15]](https://github.com/webuild-consortium/wp4-interop-test-bed/tree/main/tests/base-protocols)
  — covers CS-01 Credential Issuance and CS-02 Credential Presentation [[21]](https://github.com/webuild-consortium/wp4-architecture/tree/main/conformance-specs).
  Test cases, matrices and expected endpoint configuration are published. Most providers listed on
  the Conformance Overview have passed this suite.
- **"WE BUILD CTS – Trust Framework Integration" suite** — exercises trust framework checks. Its test
  cases and prerequisites are **not published**; see `[OI-08]`.

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

## B.4 — The dependency on Trusted List onboarding

> **`[OI-09]` — for the Testing group.** *Which ITB test cases require the wallet provider to be
> listed on the WE BUILD Trusted List of Wallet Providers before they can be run or passed?* Our
> working assumption is that the Base Protocols suite does not, and that the Trust Framework
> Integration suite does — but this is an assumption, and providers should not plan against it until
> the Testing group confirms it. See [Annex A](#annex-a--open-items-register).

---

# Annex A — Open items register

Each point is addressed to the group that owns it. Please reply by item reference. Items marked
**closed** were answered by the Trust Infrastructure group on 4 September 2026 and are kept here for
the record.

| Ref | Question | Owner | Blocks |
|---|---|---|---|
| **OI-01** | **Narrowed 4 Sep 2026.** Confirmed that EN 319 412-6 §5 is the issued-certificate profile, not a CSR template, and that the published example uses RSA in error; tracked as [wp4-trust-group #131](https://github.com/webuild-consortium/wp4-trust-group/issues/131). Interim guidance is ECDSA P-256 with a subject built from the UC-03 legal-entity data. **Remaining: publication of a P-256 CSR example, and ideally a short creation procedure of the kind Task 5 gives for WRPAC.** | Trust Infrastructure group / console operator | Step 2 |
| **OI-02** | The operator's user guide says "log in with your EU Business Wallet or register for an account", but only for the invitation route and for creating a Trusted List. Can a wallet for natural persons be used, or is a business wallet required? What does registering for an account involve? **The Trust Infrastructure group notes this is outside its scope and reads it as: a natural-person wallet is not part of the flow, and registering creates a console account. Confirmation is the console operator's.** | Console operator | Step 4 |
| **OI-03** | **Narrowed 4 Sep 2026.** The entry point is confirmed: <https://console.dev.idunion.info/my-trusted-lists>, with the operator's guide at the anchor cited in reference [7]. The "Go to (URL)" placeholder and the stale "via Open Social" line in UC-03 are to be corrected. **Remaining: must an account exist before a Trusted List can be searched and a request started?** | Console operator | Step 4 |
| **OI-04** | **Narrowed 4 Sep 2026.** Confirmed that the submission channel is the same console and that the data contract for a wallet provider is UC-03, not the operator's generic EAA-issuer set. **Remaining: whether the on-screen form collects the UC-03 wallet-solution fields is not published, and until it is, this guide will not state that it does.** | Console operator | Step 4 |
| **OI-05** | **Closed 4 Sep 2026.** The Trust Infrastructure Responsible Group reviews; the WP4 Trust Infrastructure lead and co-lead decide as Ecosystem Authority. Checked: consortium membership, and that the CSR is in the expected format. IDunion is designated for the Trusted List of Wallet Providers; the support address is <info@idunion.eu>. A dedicated channel alongside `#itb-support` has been suggested. | Trust Infrastructure group | Step 5 |
| **OI-06** | No indicative time from submission to decision is published. What is a realistic turnaround? **The Trust Infrastructure group has decided not to publish an estimate until the console operator agrees one, so this stays open.** Note that "without undue delay" applies to updates after listing, not to the first decision. | Trust Infrastructure group / console operator | Step 5 |
| **OI-07** | **Closed 4 Sep 2026, confirmed.** The LoTL's own signing certificate is valid to 19 March 2029 and the LoTL was re-signed on 3 September 2026. What is expired are the trusted list **pointer** certificates for all six IDunion lists (Wallet Providers, PID, PuB-EAA, WRPAC, WRPRC, QEAA), which lapsed on 16 April 2026; the Credimi, NXD Foundation and Raidiam pointers are in date. A consumer that only verifies the LoTL signature is unaffected; one that follows the Wallet Providers pointer and checks that certificate's validity will reject the list. The correction is with the console operator. | Trust Infrastructure group | Step 6 |
| **OI-08** | The published ITB repository contains the Base Protocols test cases but no test cases, prerequisites or documentation for the "WE BUILD CTS – Trust Framework Integration" suite, and the ITB User Guide is v1.0 of November 2025 and predates it. Where are these documented, and can they be published alongside the Base Protocols? | Testing group | Part B.1 |
| **OI-09** | Which ITB test cases require prior listing on the Trusted List of Wallet Providers? Does the Base Protocols suite have any such dependency? | Testing group | Part B.4 |
| **OI-10** | Is trust framework conformance recorded separately on the Conformance Overview, or within the existing table? What evidence is expected for it? | Testing group | Part B.3 |
| **OI-11** | The certificate that signs the Trusted List of Wallet Providers is also the issuer of the wallet-solution certificates inside it: the entity certificates' Authority Key Identifier equals that certificate's Subject Key Identifier, and its signature over them verifies. That certificate is `basicConstraints CA:FALSE` with `keyUsage` limited to digitalSignature, so a verifier performing RFC 5280 path validation rejects the chain (`openssl verify` errors 79 and 32). This holds for the renewed certificate valid to 29 April 2028, so it is independent of OI-07. Are the entity certificates intended to be used as direct trust anchors from the list, in which case no chain is built, or is the issuing certificate profile to be corrected? | Trust Infrastructure group / console operator | Step 6 |

---

# Annex B — Sources and how they were verified

Every factual statement in this guide is traceable to one of the references below. Where a source
was ambiguous, incomplete, or contradicted by observed behaviour, the point was withdrawn into
[Annex A](#annex-a--open-items-register) rather than paraphrased or inferred.

**A note on reference [7].** It is the console operator's own product documentation for its Trusted
List Hosting Service. It is **not** a WE BUILD document and is not specific to the WE BUILD pilot.
It is cited here only where it is the sole published description of console behaviour. Where it and
the WE BUILD trust group documents differ, the WE BUILD documents govern.

## References

1. **Onboarding to the Trusted Lists** — WP4 Trust Infrastructure group, pilot procedure. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md>
2. **UC-03 Wallet Provider Onboarding** — normative use case: actors, goals, preconditions, data model, RACI, main flow, post-onboarding. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md>
3. **Base Onboarding Framework** — MVP / MVP+ definitions, Member State requirements, RACI matrix. <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md>
4. **Consolidated Terms and Entity Definitions** — including the Trust Infrastructure Responsible Group (§4.1). <https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/terms-and-entities.md>
5. **D4.4 Trust Infrastructure Guidelines**, v1.0, August 2026 — §7 Pilot onboarding guidelines. WE BUILD Portal (portal access may be required): <https://portal.webuildconsortium.eu/system/files/2026-08/D4.4%20-%20Trust%20Infrastructure%20Guidelines_V1.0_FINAL.pdf>
6. **IDunion console — My Trusted Lists.** <https://console.dev.idunion.info/my-trusted-lists>
7. **IDunion Trusted List Hosting Service — User Guide.** Console operator product documentation; not a WE BUILD document. <https://docs.dev.idunion.info/docs/user-guide/> · onboarding section: <https://docs.dev.idunion.info/docs/user-guide/#onboarding-to-a-trusted-list>
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

---

# Annex C — The Wallet Capability Viewer (T4.7)

Included for completeness; it is not part of Trusted List onboarding and confers no trust.

Two routes, both in the update guide [[12]](https://github.com/webuild-consortium/wp4-wallets-group/blob/main/wallet-capabilities/UPDATING.md):
join the `wp4-wallet-providers-contributors` GitHub team and open a pull request against the CSV
(preferred), or fill in only what changes in the update template and send it to the leading team,
who apply it. Repository access and onboarding questions to <webuild-github-support@grnet.gr>. The
data is self-declared and the viewer is not an official registry.

---

# Annex D — Change log

| Version | Date | Change |
|---|---|---|
| 0.1 | 2026-09-03 | Internal draft |
| 0.2 | 2026-09-04 | Numbered references added; open items marked; scope limited to published sources |
| 0.3 | 2026-09-04 | Console login and entry-point instructions withdrawn and reopened after verification against the operator's user guide: the wallet login is stated only for the invitation route, nothing is published about a natural-person wallet, and the entry point for the other route is an unfilled "(URL)" placeholder. Applicability of the operator's flow to Wallet Providers reopened. |
| 0.4 | 2026-09-04 | Restructured: numbering now applies to onboarding steps only, background moved to an unnumbered section. ITB separated into Part B as a downstream activity, with the Trusted List dependency stated as an open question for the Testing group. Open items consolidated into a referenced register (Annex A). |
| 0.5 | 2026-09-04 | Title and purpose aligned with the actual content: the guide covers three registrations at three different depths, now stated explicitly. Out-of-scope list added. D4.4 reference resolved to its portal URL. |
| 0.6 | 2026-09-05 | Answers from the Trust Infrastructure group of 4 September applied. OI-05 (approver and support channel) and OI-07 (trust anchor validity) closed. OI-01, OI-03 and OI-04 narrowed to their remaining question; OI-02 re-addressed to the console operator; OI-06 kept open with the reason recorded. Interim CSR guidance added to Step 2, the confirmed console entry point and the stale UC-03 reference to Step 3. OI-11 added on the issuing certificate profile. |
