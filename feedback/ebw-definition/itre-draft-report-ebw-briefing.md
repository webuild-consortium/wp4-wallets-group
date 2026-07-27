# ITRE rapporteur's draft report on the EBW Regulation: briefing for WE BUILD

_A briefing for the WE BUILD Wallet Providers Group on the changes proposed in the ITRE rapporteur's draft report compared with the original Commission proposal, and what those changes could mean for the D4.1 EBW Definition Appendix, the WE BUILD Conformance Specifications (WBCS), and related architecture work._

_This briefing compares the Commission proposal, COM(2025) 838 of November 2025, with the ITRE rapporteur's draft report, PE785.244 of 1 April 2026. It is a technical and project-impact briefing, not legal advice._

## Legislative status

The ITRE document is the rapporteur's **draft report**, not an adopted position of the European Parliament and not binding law.

After publication of the draft report, Members tabled further committee amendments in documents PE787.816 and PE787.818. IMCO and JURI have also adopted opinions. ITRE is now considering compromise wording. The analysis below is therefore limited to the rapporteur's 140 amendments in PE785.244 and should be updated when ITRE adopts its report.

Article and recital numbers refer to the Commission proposal as amended by the rapporteur. Amendment numbers (`AM`) refer to PE785.244.

## What matters most

Compared with the Commission proposal, the rapporteur proposes the following changes with the most direct relevance to Wallet Providers:

1. **Automated and agent-mediated transactions receive an explicit governance model.** The draft defines an automated transaction and requires a valid, auditable and revocable authorisation. Automated actions must be verifiable and auditable and provide assurance and accountability equivalent to a user action.
2. **Wallet-to-wallet interaction is strengthened and made expressly multidirectional.** The Commission proposal already supported EBW-to-EBW and EBW-to-EUDIW interaction; the draft adds explicit wallet-to-wallet coverage in the implementing-act mandate and strengthens the Article 6 interaction wording.
3. **Assurance is raised for specified identity-lifecycle processes, not for the wallet as a whole.** The specified remote representative-onboarding route and verification connected with EBWOID issuance, delivery and activation move to `high`. Other processes, including ordinary wallet-unit authentication and parts of portability, continue to refer to `substantial`.
4. **EBWOID must be cryptographically bound to the wallet.** This replaces the Commission proposal's weaker wording, `digitally associated`.
5. **Owner-primary-source attestations are clarified.** The draft limits the relevant wallet issuance function to data for which the owner is the primary source. It does not clearly settle the legal issuer, signing model, liability or relationship with a separate EAA provider.
6. **The QERDS and hosting model becomes more sovereignty-focused.** The draft expressly accommodates one or more QERDS, adds resilience requirements, extends EU-establishment and third-country-control conditions to supporting infrastructure, and requires EBW data to be stored and processed in the Union.
7. **Public-sector acceptance is qualified for small municipalities.** The rapporteur proposes an exemption for municipalities with 10,000 inhabitants or fewer, while retaining the general public-sector acceptance direction.
8. **Legal equivalence is narrowed to qualified-trust-service-based core functionality.** This affects which parts of an EBW transaction could benefit from the proposed equivalence principle.

These changes are relevant to #249 on M2M, #250 on mutual identification, BWUA/EBWOID binding, attestation profiles, QERDS integration, hosting choices and B2G pilot coverage. They do not determine the final protocols, credentials, certificates or trust model that WE BUILD must adopt.

## A. Architecture and interaction model

### Wallet-to-wallet interaction is strengthened, not introduced

**Commission proposal:** Article 6 already contemplated interaction among EBWs and between EBWs and EUDIWs for exchanging owner-identification data and attestations.

**ITRE change:** Article 5(5) would expressly include wallet-to-wallet transactions between EBWs and EUDIWs in the implementing-act mandate (AM68). Article 6(1)(f) would describe the interaction as `multidirectional` and add validation alongside receiving and sharing (AM75).

**Wallet Provider impact:** the draft strengthens the expectation that independently implemented wallets must support two-way interaction, not merely one-directional issuance or presentation. This is relevant to CS-02 and #250.

The amendments do not settle:

- the EBW relying-party authentication mechanism;
- whether EUDIW relying-party access certificates are reused unchanged;
- the relationship between EBWOID, BWUA and the acting representative;
- the consent and disclosure-policy handshake; or
- whether a wallet acts as holder, relying party, issuer, or several of those roles in a given exchange.

Those remain architecture and implementing-act questions.

### Automated and agent-mediated transactions are defined and constrained

**Commission proposal:** already required protocols and interfaces for automatic interaction without manual intervention and mentioned agentic AI as a possible future use case.

**ITRE change:** the draft adds:

- a recital describing automated actions by digital or AI-driven agents acting under a valid, auditable and revocable authorisation (AM17);
- a definition of `automated transaction` (AM55);
- a requirement that automated interaction without direct user action be verifiable and auditable and provide an equivalent level of assurance and accountability to a user action (AM73); and
- further emphasis on agentic AI in the technical-specification context (AM24).

**Wallet Provider impact:** #249 should not be limited to a transport protocol for machine-to-machine calls. A conformant model would also need to address:

- the identity or technical identity of the agent;
- the owner or user on whose behalf it acts;
- the scope, duration and revocability of the authorisation;
- auditable evidence of the decision and transaction;
- assurance equivalence with the corresponding human-controlled flow; and
- responsibility when the agent acts outside its authority.

The draft creates strong governance criteria but does not specify the credential format, delegation object, policy language or liability allocation.

### Owner-primary-source attestations are clarified, but the issuer model remains open

**Commission proposal:** already included issuance of electronic attestations of attributes as part of the wallet's functionality and referred to issuance on behalf of the owner.

**ITRE change:** the draft adds the ability to request, obtain and combine data and attestations in the EBW definition (AM48), adds owner-primary-source issuance to the definition (AM51), and limits Article 5(1)(f) issuance to data for which the owner is the primary source (AM62).

**Wallet Provider impact:** the draft supports a specific class of owner-originated business assertions, for example information that originates within the organisation rather than in an external authentic source.

It does **not** clearly answer:

- whether the EBW owner, the EBW provider or a separate EAA provider is the legal issuer;
- who appears in the credential's issuer field;
- whether the attestation means only that the owner declared the data or that the data was independently verified;
- which assurance, status and revocation rules apply; or
- whether the issuance is a trust service and, if so, which actor provides it.

This issue should therefore be described as an attestation-provenance and issuer-role question. It should not be extended automatically to EBWOID, which is governed separately by Article 8, or to BWUA, which attests the wallet unit rather than owner-sourced business data.

The rapporteur's explanatory statement and external commentary mention KYC, KYB and beneficial-ownership-related automation as relevant scenarios. These are policy and use-case signals, not proof that every such data item may be self-attested by the owner.

### EUDIW use is enabled but not made a universal dependency

AM8 and AM13 state, in the recital context, that the authorisation system should allow the use of EUDIWs but should not require them, and that individual and business use should remain distinguishable.

**Wallet Provider impact:** an EUDIW may be useful for authenticating a natural-person representative, but an EBW onboarding or authorisation architecture should not assume that every business process is technically dependent on an EUDIW unless the operative provisions or implementing acts require it.

Because this is recital wording, it is best treated as an architectural direction rather than a complete operative prohibition on every possible EUDIW-dependent route.

## B. Authorisation, relying parties and technical requirements

### Mandates and roles become more granular and auditable

The draft strengthens the Commission proposal's mandate and role model through:

- clearer references to mandates and roles assigned to representatives and users (AM50);
- auditable, clearly defined and restricted delegations of powers, mandates and roles (AM64);
- fine-grained and auditable authorisation outcomes in Annex 12 (AM139); and
- recital-level requirements for revocability and controlled access (AM13).

**Wallet Provider impact:** an implementation should support more than a simple administrator/user distinction. The WBCS should address:

- role and mandate scope;
- permitted operations and data;
- validity periods;
- delegation and sub-delegation;
- revocation;
- evidence and auditability; and
- policy evaluation across independently implemented wallets.

The draft does not itself define a common mandate credential or prove that technical wallet permissions are equivalent to legal representation under national law. That distinction should remain explicit.

### EBWOID must be cryptographically bound to the wallet

Article 6(2)(a) changes `digitally associated` to `cryptographically bound` (AM78).

**Wallet Provider impact:** the implementation must provide cryptographic evidence that the EBWOID used in a transaction is associated with the relevant wallet unit. This strengthens the need to distinguish:

- **EBWOID:** identifies the owner;
- **BWUA:** attests the wallet unit and relevant components; and
- **user or representative credentials:** identify the actor using the wallet.

The amendment does not prescribe the certificate, credential, key-binding or proof construction.

### Portability adds import and cross-provider migration

The draft adds import and cross-provider portability to Article 5(1)(l) and Annex 10 and introduces recital-level support for portability (AM23, AM66 and AM136).

**Wallet Provider impact:** the portability profile should cover both export and import in a documented, interoperable format. The term `open format` should be used only where it reflects the precise recital or Annex wording; the technical specification should ultimately define the structured and machine-processable representation.

Portability of data does not automatically settle continuity of:

- provider-issued or provider-bound attestations;
- BWUA and status services;
- cryptographic keys;
- authorisation structures; or
- directory and delivery addresses.

Those remain migration and provider-exit design questions.

### One or more QERDS and resilience

The draft changes the QERDS model so that one or more QERDS may support the mandatory secure communication channel and adds redundancy and fallback requirements (AM7, AM63, AM137 and AM138).

**Wallet Provider impact:** the solution should avoid assuming a single hard-wired QERDS service or endpoint. The interface and discovery model should be capable of supporting multiple compliant services and failover.

The wording supports multiplicity and resilience but does not by itself define:

- provider selection;
- routing and address resolution;
- portability between QERDS providers;
- commercial responsibility; or
- whether every wallet must be preconfigured with several QERDS providers.

### Relying-party data minimisation and security

The draft adds that relying parties may request only attributes strictly necessary for the transaction and must apply state-of-the-art security, confidentiality and non-repudiation measures (AM14 and AM65).

It also deletes Article 6(1)(b) and broadens Article 6(1)(c) to include validation (AM71 and AM72). It is reasonable to understand this as consolidation of the protocol functions, but `folded into` should be presented as an interpretation rather than the literal amendment text.

**Wallet Provider impact:** #250 should include relying-party identification, purpose and requested-data display, selective disclosure and evidence that the request is proportionate. The amendments strengthen RP accountability but do not settle the certificate or verifier-information profile.

### Technical specifications are emphasised, not fully defined

AM24, AM68, AM69, AM84 and AM85 strengthen the language around interoperability, security, protocols and technical requirements.

**Wallet Provider impact:** these amendments reinforce the importance of WBCS input, but they should not be described as already selecting a protocol or trust model. Much of the architecture remains delegated to implementing acts and standards.

## C. Security, assurance and infrastructure

### Assurance is raised for specified processes

The heading `substantial → high` is too broad if read as a wallet-wide change.

The draft proposes:

- `high` for the specified onboarding route using an authorised representative's electronic identification means (Article 6(1)(e), AM74);
- deletion of several Annex references that tied secure cryptographic applications and related operations directly to the `substantial` requirements of Implementing Regulation (EU) 2015/1502 (AM132-AM134); and
- `high` for mechanisms supporting verification of EBWOID issuance, delivery and activation (Annex 14(2)(c), AM140).

Other provisions continue to use or permit `substantial`, including ordinary wallet-unit authentication and aspects of portability.

**Wallet Provider impact:** the ITB should test assurance by lifecycle stage rather than assign one level to the entire EBW:

- ordinary wallet-unit user authentication;
- representative onboarding;
- EBWOID issuance, delivery and activation;
- critical cryptographic operations; and
- migration/export/import.

Deletion of a `substantial` cross-reference does not, by itself, prove that the affected function is automatically raised to `high`; it may instead leave the detailed security requirements to later specifications.

### Security-by-design, NIS2 and post-quantum readiness

A new recital calls for security by design, NIS2 compliance and preparation for post-quantum cryptography by EBW providers and QTSPs (AM26). Article 7(5) would refer to the proposed revised Cybersecurity Act and high-risk-supplier requirements (AM88).

**Wallet Provider impact:** the direction is toward stronger lifecycle security, supply-chain assurance and crypto-agility.

Two qualifications are important:

1. PQC readiness appears in a recital. It is a significant policy and architecture signal, but not a standalone migration deadline or a complete cryptographic requirement.
2. COM(2026) 11 is a **proposal for a revised Cybersecurity Act**. The briefing should not refer to an already adopted `Cybersecurity Act 2`.

### EU establishment, third-country control and EU-only data processing

The Commission proposal already required the EBW provider to be established in the Union, to have its principal place of business and main operations there, and not to be controlled by a third country or third-country entity.

The rapporteur extends this sovereignty model by:

- addressing QERDS and supporting-infrastructure providers in recital and operative wording (AM7, AM28 and AM87);
- defining a `supporting infrastructure service provider`, including cloud hosting, cryptographic key management, secure communication networks and identity-verification tools (AM59); and
- requiring EBW data to be stored and processed exclusively in the Union.

**Wallet Provider impact:** if retained, these amendments would materially affect supplier eligibility, cloud architecture, key management, operational support, disaster recovery and testbed hosting.

The exact scope should be tracked carefully:

- which data qualify as `European Business Wallet data`;
- whether temporary processing, telemetry, support access and backups are included;
- how third-country control is assessed;
- whether every subcontractor falls within the supporting-infrastructure definition; and
- how the requirement interacts with EU data-protection rules and international transfers.

The rapporteur's explanatory statement describes EBWs as likely to be server-based and reliant on cloud processing. That is an explanatory observation, not a requirement that every EBW use a server-based architecture.

## D. Legal effect, public-sector acceptance and timeline

### Legal equivalence is narrowed

Article 1(2) and Article 4(1) would tie equivalent legal effect to core functionality based on qualified trust services (AM45 and AM60).

**Wallet Provider impact:** the WBCS should distinguish:

- the qualified trust-service operation, such as a qualified signature, seal, EAA or registered delivery;
- the surrounding wallet protocol, authentication and authorisation steps; and
- any non-qualified attestations or technical exchanges.

The amendment does not necessarily mean that every non-qualified EBW action has no legal or evidentiary effect. It narrows the special equivalence principle proposed in this Regulation.

### Small-municipality exemption is a material B2G change

The rapporteur proposes exempting municipalities with 10,000 inhabitants or fewer from the mandatory public-sector acceptance obligation, while allowing voluntary participation. The stated purpose is to avoid disproportionate financial and administrative burdens on small local authorities.

**Wallet Provider impact:** B2G coverage may be less uniform than the Commission proposal suggested. Pilot and deployment plans should not assume that every municipality will expose an EBW-enabled interface on the same timetable.

The exemption does not remove the general public-sector acceptance direction for other authorities, and it may still change during committee compromise negotiations.

### Timelines are re-anchored to implementing acts

The rapporteur changes the trigger for the public-sector acceptance and transition periods from entry into force of the Regulation to entry into force of the relevant Article 5 and 6 implementing acts (AM117 and AM120). AM130 provides for general application one year after entry into force of the Regulation.

**Wallet Provider impact:** practical B2G dates depend on when the technical implementing acts become available, reducing the risk that acceptance deadlines run before the specifications exist. The exact final schedule must be recalculated from the adopted text rather than inferred from the draft report alone.

### Implementation roadmap

A new recital calls for a Commission and Member State implementation roadmap covering milestones, progressive functionality, cross-border interoperability, stakeholder onboarding and B2G/G2B/B2B use cases, with attention to SMEs (AM40).

**Wallet Provider impact:** WE BUILD outputs could inform such a roadmap.

Because this is recital wording, use `calls for` or `envisages`, not `legally requires` or `tasks`, unless an operative article is added later.

### Third-country recognition

The draft strengthens the treatment of third-country systems and indicates a preference, where appropriate, for mutual-recognition agreements (AM42, AM47 and AM122-AM125).

**Wallet Provider impact:** this may affect future interoperability and recognition with non-EU business wallets, but it is unlikely to be a first-wave pilot dependency.

Mutual-recognition language in a recital or explanatory statement should not be presented as an unconditional legal prerequisite for all third-country recognition.

### Unique identifier

Article 9(2) would require creation of a unique identifier, upon request by an economic operator, without undue delay where no EUID exists (AM94), supported by related recital wording (AM30).

**Wallet Provider impact:** onboarding and identifier-orchestration flows should handle entities that do not already have an EUID. The amendment does not settle the technical identifier format or duplicate-prevention mechanism.

### QTSP notification route

AM99 removes the dedicated lighter notification wording for QTSPs.

**Wallet Provider impact:** the special fast-track route in the Commission proposal is weakened or removed. The safest formulation is that the rapporteur deletes the dedicated QTSP treatment; the exact resulting review process should be checked against the consolidated Article 11 and any later compromise text rather than stated categorically as the identical review in every respect.

## Important elements that are not introduced by the ITRE draft

The following are important EBW concepts, but should not be described as new rapporteur changes:

- the underlying ability of EBWs to interact with other EBWs and EUDIWs;
- automatic interaction without manual intervention;
- the general availability of issuance functionality for EAAs;
- the original EU-establishment and third-country-control requirements for the EBW provider itself;
- the voluntary nature of EBW use by economic operators; and
- the general obligation for public-sector bodies to enable EBW use.

The rapporteur strengthens, qualifies or extends these concepts, but does not introduce the underlying model from nothing.

## What this means for our work

The following are project implications, not tasks imposed directly on WE BUILD:

1. Extend #249 beyond M2M transport to cover agent identity, delegated authority, revocation, audit evidence, assurance equivalence and accountability.
2. Use AM68, AM75 and AM78 as input to #250 and CS-02, while keeping EBWOID, BWUA, representative identity, relying-party authentication and consent as distinct design elements.
3. Define a provenance and issuer model for owner-primary-source EAAs. Do not assume that these attestations are EBWOID or that the draft settles whether the wallet owner, wallet provider or a separate EAA provider is the issuer.
4. Split assurance testing by lifecycle stage instead of selecting one global LoA for the wallet.
5. Define portability as export and import, but treat keys, statuses, authorisations and provider-bound credentials as additional continuity questions.
6. Avoid coupling the secure communication channel to one QERDS implementation and include redundancy and failover scenarios.
7. Flag EU-only infrastructure, processing and storage requirements to the Trust, Security and deployment teams, including supplier-control and disaster-recovery implications.
8. Include the small-municipality exemption in B2G pilot assumptions and rollout-risk analysis.
9. Keep recital-level signals, such as PQC readiness, the implementation roadmap and EUDIW optionality, separate from operative conformance requirements.
10. Refresh this briefing when ITRE adopts its compromise report; the rapporteur's 140 amendments are no longer the only Parliament text under consideration.

---

_Prepared by GRNET (WP4 Wallet Providers Group lead) as a working input for the group._

## Primary sources

- [Commission proposal COM(2025) 838](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0838)
- [ITRE rapporteur's draft report PE785.244](https://www.europarl.europa.eu/doceo/document/ITRE-PR-785244_EN.pdf)
- [European Parliament procedure file 2025/0358(COD)](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025%2F0358%28COD%29)
