# Wallet Provider onboarding in WE BUILD

**Joining the Trusted List of Wallet Providers, and how that relates to the Interoperability Test
Bed and the Wallet Capability Viewer. A practical guide for Wallet Providers.**

Maintained by the Wallet Providers Group (T4.7) · Draft v0.8.2 · 23 September 2026

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

This guide takes a wallet provider through onboarding to the **WE BUILD Trusted List of Wallet
Providers** (Part A) and points to what follows in the Interoperability Test Bed (Part B).

**Out of scope:** the other Trusted Lists [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md), Relying Party registration
[[18]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/relying-party-registry-onboarding.md), and the MVP+ (production) model [[3]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md).

**Audience:** wallet providers who are beneficiaries or Associated Partners of the WE BUILD
consortium.

**Normative sources:** UC-03 Wallet Provider Onboarding [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md),
Onboarding to the Trusted Lists [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md),
the Base Onboarding Framework [[3]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/onboarding-base.md),
and deliverable D4.4 [[5]](https://portal.webuildconsortium.eu/system/files/2026-08/D4.4%20-%20Trust%20Infrastructure%20Guidelines_V1.0_FINAL.pdf).

## Background — three lists, three different things

Your wallet can appear on three lists, run by different groups. Being on one does not put you on
the others.

| List | Maintained by | What it means | Establishes trust? |
|---|---|---|---|
| **Wallet Capability Viewer** [[11]](https://webuild-consortium.github.io/wp4-wallets-group/) | Wallet Providers Group (T4.7) | What your wallet supports, as you declared it | **No.** Self-declared, not a registry |
| **WE BUILD Trusted List of Wallet Providers** [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md) | WP4 Trust Infrastructure group | Your wallet solution's trust anchor is published and can be validated | **Yes.** |
| **ITB Conformance Overview** [[13]](https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html) | WP4 Testing group | Which ITB test suites you have passed | No. It shows conformance. |

The Wallet Capability Viewer is summarised in [Annex C](#annex-c--the-wallet-capability-viewer-t47).

---

# Part A — Onboarding to the Trusted List of Wallet Providers

## Step 1 — Confirm you are eligible

You must be a **beneficiary or an Associated Partner of the WE BUILD consortium**. In the pilot
(MVP) phase this is the only condition [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md). No certification is
required in the pilot; it becomes a precondition in MVP+ (CIR 2024/2981).

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
The Trusted List and certificate profiles are ETSI TS 119 602 and ETSI TS 119 412-6 §5, via Task 3
[[19]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task3-x509-pki-etsi/README.md)
[[20]](https://www.etsi.org/deliver/etsi_ts/119400_119499/11941206/01.02.01_60/ts_11941206v010201p.pdf).

> **The CSR.** Generate an ECDSA P-256 (`prime256v1`) key and a certificate signing request, with the
> subject built from your organisation data above. The console operator publishes the `openssl`
> commands [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).
>
> Do not use the certificate examples in Task 3's
> [certificate profiles document](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task3-x509-pki-etsi/certificate-profiles-pid-wallet-eaa-qeaa-psbeaa-providers-etsi-ts-119-412-6.md#non-normative-examples)
> as a template: they are issued certificates, not CSRs, and they use RSA. The WE BUILD CSR profile,
> with ECDSA examples and `openssl` commands, is proposed in [#135](https://github.com/webuild-consortium/wp4-trust-group/pull/135),
> which closes [#131](https://github.com/webuild-consortium/wp4-trust-group/issues/131). It is not yet merged. **`[OI-01]`**

## Step 3 — Identify the correct Trusted List

Onboard to **"WEBUILD - Wallet Providers"** in the IDunion console
[[6]](https://console.dev.idunion.info/my-trusted-lists), following the operator's onboarding guide
[[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding). You can browse the lists without an account; you
need one to see the onboarded entities or to submit a request (Step 4).

**How to confirm you have the right list.** The wallet-provider entry [[10]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/lotl/tl_entries/wallet-provider/idunion.json)
of the WE BUILD List of Trusted Lists ([JSON [8]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.json),
[XML [9]](https://webuild-consortium.github.io/wp4-trust-group/list_of_trusted_lists.xml)) points to it.
The list identifier in that URL and in the console address are the same.

If you act in more than one role, you onboard to each corresponding Trusted List separately.

## Step 4 — Submit your onboarding request

You need an IDunion console account.

Two routes exist [[1]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/trusted-lists-onboarding.md):

- **Via invitation** — you receive an invitation by e-mail from the Ecosystem Authority and start
  from the link in it.
- **Direct onboarding** — you log in, open the Trusted List directory, select the list and submit a
  request [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).

Once you reach the onboarding form, both routes are the same:

1. Fill in the required data about your organisation (Step 2) and continue.
2. A Certificate Signing Request is created automatically, **or** you upload one you created
   yourself.
3. The data you entered is signed as part of the request.
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

> The form asks for less than UC-03. Have the full Step 2 set ready. **`[OI-04]`**

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
and your entry is added to the Trusted List of Wallet Providers [[23]](https://docs.dev.idunion.info/docs/user-guide/onboarding/direct-onboarding).
**If not approved**, you are informed of the result and may be asked for additional data.

**What your published entry is used for.** The certificate in your entry authenticates your wallet
solution: a verifier takes it from the Trusted List and uses it directly to check your Wallet
Instance Attestation and key attestation signatures. It is a trust anchor; it is not chained to the
certificate that signs the list.

## Step 6 — Keep your entry current

- **Notify changes without undue delay.** Any change to your organisation data or your wallet
  solutions is reported to the Trust Infrastructure Responsible Group, which updates the Trusted List
  entry so that published information stays accurate [[2]](https://github.com/webuild-consortium/wp4-trust-group/blob/main/task1-use-cases/subtask1-1-onboarding/wallet-provider-onboarding.md).
- **De-listing and suspension.** An entry can be removed, suspended or set to invalid where the
  conditions for listing are no longer met, or at your own request. Certificates issued for a
  de-listed wallet solution are revoked, and revocation status is published in line with the Trusted
  List and certificate policy.
- **Check what is published** with the EUDI Trusted Lists Inspector [[16]](https://trust-inspector.credimi.io/)
  or the LoTL / TL / LoTE tool [[17]](https://lote.credimi.io/).

---

# Part B — After onboarding: the Interoperability Test Bed

The Interoperability Test Bed is run by the WP4 Testing group, separately from Trusted List
onboarding.

## B.1 — What the ITB tests

- **Base Protocols suite** [[15]](https://github.com/webuild-consortium/wp4-interop-test-bed/tree/main/tests/base-protocols)
  — CS-01 Credential Issuance and CS-02 Credential Presentation [[21]](https://github.com/webuild-consortium/wp4-architecture/tree/main/conformance-specs).
  Test cases, matrices and expected endpoint configuration are published. No Trusted List
  onboarding is needed.
- **"WE BUILD CTS – Trust Framework Integration" suite** — v1.1, August 2026, covering WBCS 001, 002
  and 004 (including the optional WUA checks). In the ITB: *Conformance statements → Base Protocols →
  WE BUILD CTS Trust Framework Integration*. Same scenarios as CS-01 and CS-02, plus the trust checks.
  For the trust-dependent checks you must be onboarded to the relevant Trusted List. Its test cases
  are not yet in the repository. **`[OI-08]`**

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
channel to be listed [[13]](https://webuild-consortium.github.io/wp4-interop-test-bed/docs/conformance-overview.html).
The same report is the evidence for the trust suite; the Conformance Overview does not show that
result yet. **`[OI-10]`**

---

# Annex A — Open items

Points the published material does not answer. Please reply by item reference.

| Ref | What is needed | Owner | Blocks |
|---|---|---|---|
| **OI-01** | The WE BUILD CSR profile for the wallet-solution certificate, proposed in [#135](https://github.com/webuild-consortium/wp4-trust-group/pull/135) (closes [#131](https://github.com/webuild-consortium/wp4-trust-group/issues/131)). Not yet merged. | Trust Infrastructure group | Step 2 |
| **OI-04** | Which data set governs the request: the console form or UC-03. | Console operator / Trust Infrastructure group | Step 4 |
| **OI-05** | Who approves a wallet-provider request: the Ecosystem Authority (WP4 Trust Infrastructure lead and co-lead) or IDunion as console operator. | Trust Infrastructure group / console operator | Step 5 |
| **OI-08** | Publish the Trust Framework Integration test cases and update the Base Protocols README. | Testing group | Part B.1 |
| **OI-10** | Add a Trust Framework Integration section to the Conformance Overview. | Testing group | Part B.3 |
| **OI-12** | How the wallet solution identifier in the certificate is formed and kept unique (a URN form is proposed on [#135](https://github.com/webuild-consortium/wp4-trust-group/pull/135)), how it relates to UC-03's optional unique reference identifier, and what it means for the WRPRC. | Trust Infrastructure group | Step 2 |

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
20. **ETSI TS 119 412-6 V1.2.1 (2026-04)** — certificate profile requirements for PID, Wallet, EAA, QEAA and PSBEAA providers; clause 5 is the Wallet Provider sign/seal profile. <https://www.etsi.org/deliver/etsi_ts/119400_119499/11941206/01.02.01_60/ts_11941206v010201p.pdf>
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
