 # ITRE draft report on the EBW Regulation: briefing for WE BUILD

_A briefing for the WE BUILD Wallet Providers Group on the ITRE rapporteur's draft report on the EBW Regulation, and what it could mean for the D4.1 EBW definition Appendix, issue [#235](https://github.com/webuild-consortium/wp4-architecture/issues/235), and related architecture work. It is not a legal analysis and should be read as direction to track. Source: the [ITRE rapporteur's draft report PE785.244](https://www.europarl.europa.eu/doceo/document/ITRE-PR-785244_EN.pdf) on COM(2025)0838 – 2025/0358(COD)._

## Legislative status

There is no new version of the EBW Regulation. The text under negotiation remains the Commission proposal of November 2025. The document discussed here is a negotiating position, not an amendment to that proposal:

- The ITRE rapporteur's draft report is still at committee stage; the procedure is "awaiting committee decision". The rapporteur's amendments are a starting draft only. Further amendment documents add more on top, and IMCO and JURI have issued opinions. This is not Parliament's final position.
- The Council general approach (9 June 2026) is a separate institutional position, adopted on its own track. It is not analysed in this note.

Trilogues are expected from late October, with negotiated text following. Everything below is therefore direction, not obligation. For each point, the text distinguishes what the amendment changes, what direction can reasonably be inferred, and what WE BUILD might consider in response; the third of these is interpretation for planning, not a requirement derived from the report.

## What matters most

The draft moves the EBW in four directions relevant to WE BUILD:

1. A targeted move toward `high` assurance for onboarding and for the issuance, delivery or activation of owner-identification data, not a blanket replacement of `substantial` throughout the text.
2. More explicit, multidirectional wallet-to-wallet interaction, and requirements for automated or agent-mediated transactions under an authorisation that is auditable and revocable.
3. Owner-originated attestations, for data where the owner is the primary source, with KYC, KYB and beneficial ownership named as scenarios.
4. Tighter EU-establishment, control and data-location conditions, now extending to QERDS and supporting-infrastructure providers such as cloud and hosting.

These provide direction for the WBCS work now being scoped (#249 (M2M), #250 (mutual ID), BWUA, EBWOID), but they do not dictate the protocols, credentials, certificates or trust model that WE BUILD will adopt; those are project decisions.

## A. Architecture and interaction model

**Wallet-to-wallet, made more explicit.** The proposal already contemplated interaction between EBWs, and between an EBW and an EUDIW. The draft makes this clearer and multidirectional, for receiving, validating and sharing owner-ID data and attestations. The direction (EBW↔EBW, EBW↔EUDIW) is now in the text. The mechanism (mandatory verifier information, EBWOID+WUA versus x.509 RP certificates) remains open and feeds #250 / CS-02.

**Automated and agentic interaction, defined and constrained.** The draft covers transactions carried out by a digital or AI-driven agent under a valid, auditable and revocable authorisation, and requires that automated interaction without a user action stay verifiable and carry an assurance and accountability level equivalent to a user-driven one. Agentic AI is named as a target use case. This supports building #249 and sets its non-negotiables: authorisation that is auditable and revocable, and parity of assurance and accountability with human-driven flows. It does not, however, define a machine-identity architecture, a delegation credential, a protocol or a trust model. Those remain for the implementing acts, the standards and project-level design.

**Owner-originated attestations through the EBW.** The draft allows issuance of attestations for data where the owner is the primary source, and adds "request, obtain, combine" to the wallet's capabilities. This is best described as owner-originated issuance through the EBW, rather than the wallet becoming an independent legal issuer in every case. The eventual issuer role, provider responsibilities, signing model and evidentiary value will depend on the implementing architecture and the trust-service rules. Relevant to the attestation rulebooks, BWUA and EBWOID.

**EUDIW permitted, not required; personas kept separate.** Within the authorisation and access system, use of an EUDIW should be possible but not mandatory, and business and individual use should remain clearly separated.

## B. Conformance specifications and technical requirements

**Mandates and roles: fine-grained, restricted, revocable, auditable.** Where WE BUILD specifies authorisation and mandates, these are the qualities to design for.

**Cryptographic binding of owner-ID data.** The draft tightens "digitally associated" to "cryptographically bound", which supports the BWUA/EBWOID binding requirement. It does not settle the certificate, key or attestation mechanism.

**Data portability: export and import, across providers.** Import is added alongside export, and portability across providers, which argues for a portability / data-model CS. The precise wording on format is "structured, commonly used and machine-readable", which is preferable to the looser "open format".

**QERDS: one or more, with redundancy.** The draft supports one or more QERDS and a fallback, as a required core secure-communication functionality. It should not be characterised as "the mandatory channel" if that implies the sole channel for all EBW communication; it is better understood as the designated registered-delivery channel, with redundancy. The design should support more than one QERDS.

**Relying-party data minimisation and security.** Relying parties may request only what is strictly necessary and must apply state-of-the-art security, confidentiality and non-repudiation.

## C. Security and assurance

**Assurance: a targeted move to `high`.** The draft raises the required level to `high` for specific processes, notably onboarding through an authorised representative and verification tied to the issuance, delivery or activation of owner-ID data. This should not over-read as a uniform shift. Some provisions, including parts of export/portability and the base definition, still read `substantial`. The direction is clearly toward `high` for identity-bearing flows, but not across the whole text.

**Security baseline: secure-by-design, NIS2, PQC-readiness.** The draft pushes secure-by-design, NIS2 compliance and post-quantum readiness for EBW providers and QTSPs, with a cross-reference to the proposed revised Cybersecurity Act (COM(2026)11, January 2026) and to high-risk-supplier rules. Two qualifications: COM(2026)11 is a proposal, not an adopted "Cybersecurity Act 2"; and PQC-readiness appears in a recital, so it is a policy and specification signal rather than an enforceable migration deadline. It remains a relevant signal for crypto and trust-infrastructure choices.

## D. Approach, scope and timeline

**EU establishment and data residency, extended.** Providers, QERDS and a new category of supporting-infrastructure providers (explicitly including cloud and hosting, key management, secure networks and identity-verification tools) would need to be EU-established and free from third-country control, with EBW data stored and processed in the Union. As this is still a draft, "would require" is more accurate than "requires", and the exact entities and conditions should be read per amendment rather than as one universal rule for every subcontractor. For a server/cloud-based EBW (which the explanatory statement expects to be the likely model), this constrains hosting, partner selection and the testbed.

**Legal equivalence, narrowed toward qualified trust services.** The draft ties equivalent legal effect toward core functionalities based on qualified trust services. This should not be read as meaning that every non-QTSP action has no legal effect, since the legal consequence can depend on the specific functionality and on other applicable law.

**Timelines re-anchored to the implementing acts.** The 24-month public-sector acceptance and the 36-month transition would run from entry into force of the technical implementing acts, not from the Regulation; the Regulation applies one year after entry into force. Real dates depend on when the technical specifications land.

**Implementation roadmap (B2G / G2B / B2B, SMEs).** The draft calls for a Commission and Member State roadmap of milestones and use cases. WE BUILD's pilot outputs (use-case coverage and the CS) are the kind of input that could feed it, which is worth positioning for.

**Smaller points to track.** A unique EBW identifier created on request without undue delay; third-country recognition tightened, with a preference for mutual-recognition agreements; and the QTSP "light" notification route, which appears to be removed and would then leave QTSPs under the general review.

## What this means for our work

The points below are things to keep in mind, not a to-do list the draft hands us. The direction is for the WE BUILD Architecture group to decide.

1. Treat the assurance shift (targeted `high`) and the wallet-to-wallet and automated-interaction points as considerations for the WBCS work already being scoped ([#249](https://github.com/webuild-consortium/wp4-architecture/issues/249), [#250](https://github.com/webuild-consortium/wp4-architecture/issues/250), BWUA/EBWOID), to weigh rather than adopt as given.
2. For the EBW Definition Appendix of D4.1 ([#235](https://github.com/webuild-consortium/wp4-architecture/issues/235) / [#236](https://github.com/webuild-consortium/wp4-architecture/issues/236)), the task is to broaden the current definition using the current Commission proposal, not to track the amendments, and to keep it implementable for the pilots. The appendix target is 10 August and the specification freeze 31 August.

---

_Prepared by GRNET (WP4 Wallet Providers Group lead) as a working input for the group._
