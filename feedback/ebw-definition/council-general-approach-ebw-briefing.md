# Council general approach on the EBW Regulation: briefing for WE BUILD

_A briefing for the WE BUILD Wallet Providers Group on the changes introduced by the Council's general approach compared with the original Commission proposal, and what those changes could mean for the D4.1 EBW Definition Appendix, issue [#235](https://github.com/webuild-consortium/wp4-architecture/issues/235), and related architecture work._

_This briefing compares the Commission proposal, COM(2025) 838 of November 2025, with the Council general approach, document ST 10346/26 of 9 June 2026. It is a technical and project-impact briefing, not legal advice._

## Legislative status

The European Business Wallet Regulation has not been adopted. The Council reached its general approach on 9 June 2026; this is the Council's negotiating position, expressed as a consolidated compromise text, rather than a new binding Regulation.

The European Parliament procedure remains at committee stage. Negotiations between the Council and Parliament can begin once Parliament has adopted its position. Everything below should therefore be treated as a direction and a set of issues to track, not as a current legal obligation.

## What matters most

Compared with the Commission proposal, the following Council changes matter most for Wallet Providers:

1. **The Council explicitly assigns the issuance of owner-sourced attestations to the EBW provider.** The Commission proposal treated issuance as a wallet/owner-facing functionality without expressly making the EBW provider the issuer. Council Article 5(1)(f) states that the attestations are issued by the provider on behalf of the owner. This may significantly expand the provider's role, but the exact legal responsibility and trust-service implications still require clarification.
2. **Becoming an EBW provider changes from notification to prior authorisation.** Applicants must submit a whole-solution risk assessment and self-assessment, and the assessment must be maintained and updated after deployment. The Commission, rather than each applicant, is tasked with establishing a common risk register through implementing acts.
3. **The assurance requirements are raised for specific identity-lifecycle processes.** Remote onboarding through a legal representative or another lawfully empowered person moves to `high`. Verification of the issuance, delivery and activation of EBW owner identification data also moves to `high`. Ordinary wallet-unit user authentication remains at least `substantial`.
4. **Owner identification data must be cryptographically bound to the wallet.** This replaces the Commission proposal's weaker wording, "digitally associated".
5. **Legal equivalence is narrowed.** The Council ties it to qualified trust services forming part of the core functionalities and expressly preserves applicable national and Union administrative, procedural and electronic-format requirements.
6. **B2G implementation becomes less uniform.** Public bodies must enable relevant EBW functions but no longer have to own an EBW or implement the Commission proposal's transitional QERDS gateway.
7. **Providers receive additional operational duties.** These include importing data for portability, verifying directory information at least once every 72 hours, providing digital addresses to public bodies without an EBW, and making wallets accessible to persons with disabilities.
8. **The Council makes the QERDS model less supplier-specific.** Instead of instructing the Commission to designate one service, the text calls for a protocol and specifications for compliant implementations of the mandatory channel.

These changes are relevant to the WBCS work now being scoped, including #249 on M2M, #250 on mutual identification, BWUA and EBWOID. They do not determine the final protocols, credentials, certificates or trust model that WE BUILD will use.

## A. Architecture and interaction model

### Who issues owner-sourced attestations

The Commission proposal:

- included `issue` among the general owner-facing functions in Article 5(1)(a);
- referred in Article 5(1)(f) to issuing attestations on behalf of the owner, without expressly assigning the issuer role to the EBW provider; and
- referred in Article 5(1)(g) to attestations issued through the owner's EBW.

The Council:

- removes `issue` from Article 5(1)(a);
- states in Article 5(1)(f) that electronic attestations of attributes are securely issued **by the provider on behalf of the owner**;
- limits this function to data for which the owner is the primary source; and
- changes Article 5(1)(g) from issuance through the wallet to the linking of attestations issued under point (f) into a chain.

This is a substantive shift in the actor named as issuer. It raises questions that the general approach does not fully answer:

- Does every EBW provider have to become an EAA issuer or trust service provider?
- Can a provider satisfy the requirement by integrating a separate EAA provider?
- Who appears as the issuer in the attestation?
- Is the provider attesting that the owner declared a value, or certifying that the value is factually correct?
- Who is responsible for status, revocation, correction and liability when owner-provided data is inaccurate?

The Council's Annex still refers to providers of electronic attestations of attributes as actors distinct from the EBW provider. The architecture should therefore distinguish at least:

1. an owner statement signed or sealed through the EBW;
2. issuance facilitated by the wallet but performed by an independent EAA provider; and
3. issuance by an EBW provider that deliberately assumes an additional issuer or trust-service role.

A clear position on this distinction is needed in the definition and conformance work. The Council text expressly assigns issuance to the provider, but the resulting regulatory status and liability should be presented as open questions rather than settled conclusions.

Owner identification data is governed separately by Article 8. It may be issued as a qualified EAA by a QTSP, as an attestation issued by or on behalf of a public-sector authentic source, or by the Commission for Union entities. The recitals say that the use of BRIS and BORIS should be promoted to facilitate verification; they do not make those systems the mandatory verification route for every EBWOID.

### Authorisation and role model

The Council replaces much of the Commission proposal's `mandate` and `authorised representative` terminology with an authorisation and role-based access-control model.

Recital 18 describes:

- a technical authorisation that can grant broad rights to use the wallet and act on the owner's behalf; and
- an administrative authorisation that assigns roles and responsibilities to wallet users within the organisation.

The operative provisions require authorisations and role mappings to be manageable, revocable, auditable and interoperable. They also require real-time detection and prevention of conflicts of roles, over-delegation and expired authorisations.

The Council also makes an important legal distinction: authorisations granted through the EBW system are technical and do not create, limit or otherwise affect a power of attorney or legal mandate under national or Union law.

For WE BUILD this means that three elements should remain distinct:

- the identity of the acting person or system;
- the technical authorisation controlling what it may do in the wallet; and
- evidence that it has the legal authority to bind the organisation, where the relevant procedure requires this.

The recital says that the authorisation system should be compatible with the EU digital power of attorney under Directive (EU) 2025/25. This is a design direction in a recital, while the real-time controls and cross-wallet interoperability requirements are part of the operative technical requirements.

### Wallet-to-wallet and wallet-to-EUDIW exchange

The ability to request and share EBWOID and attestations among EBWs, EUDIWs and relying parties was already broadly present in the Commission proposal. It is therefore not, by itself, a new Council direction.

The Council does, however, make the trust artefacts more concrete in Annex 13. It explicitly refers to EUDIW relying-party access certificates and EUDIW unit attestations for authorising requests and, where applicable, authenticating the requester. It also requires the wallet to display information from those artefacts and to present its own EBW unit attestation when requested.

This is relevant to #250 and mutual identification. It still does not settle the complete relationship among EBWOID, BWUA, the natural-person representative, technical authorisation and evidence of legal authority.

### Automated interaction and agentic AI

Automatic interaction without manual intervention, and the recital reference to agentic AI and asset identities, were already present in the Commission proposal. The Council retains them but does not define a complete M2M identity, delegation or liability model.

They provide a hook for #249, but should not be presented as new Council requirements or as a settled agentic-interaction architecture.

## B. Conformance specifications and technical requirements

### Core functionalities

Under the Council text, the wallet must enable the owner to:

- request, obtain, select, combine, store, delete, share and present attestations;
- selectively disclose EBWOID and attributes;
- use qualified signatures, seals and time stamps;
- transmit and receive documents and data through QERDS;
- manage and revoke authorisations for wallet users and relying parties;
- export data in the exit circumstances described in Article 5(1)(l);
- import data for portability;
- access communications and transaction logs; and
- access the QERDS dashboard.

For owner-primary-source data, Article 5(1)(f) separately requires the owner to be able to have attestations issued by the provider on its behalf. It would therefore be inaccurate to describe `issue` as an unrestricted general owner-facing function under the Council text.

Providers may offer additional functions provided that these do not compromise the core functions, reliability or interoperability.

### Data portability

The Council adds an obligation to import data so that it can move across providers. At the same time, it removes `at the request of the owner` from Article 5(1)(l): the express Article-level export duty is linked to termination of service or revocation of the provider's status.

Annex 10 nevertheless requires secure export, import and portability and says that this must enable migration to another EBW solution. There is therefore a tension between the broad technical migration capability in the Annex and the narrower export trigger in Article 5.

For WE BUILD, ordinary on-demand migration should be supported as a technical objective, while the exact legal entitlement should be flagged for clarification.

Both texts already list, in Article 5(1)(l), EBWOID, EAAs, communication logs and transaction records as the data to be exported. Whether migration must also include or recreate BWUA status, directory addresses and authorisation structures is an architectural and continuity question for the project, not an explicit requirement in the current text.

### Cryptographic binding

The Council changes the requirement from EBWOID being `digitally associated` with the owner's wallet to being `cryptographically bound` to it.

This supports the need for a demonstrable relationship between EBWOID and the relevant EBW unit. It does not determine whether that relationship is implemented through a certificate, a credential, a key-binding claim or another mechanism, and it should not collapse the distinct functions of EBWOID and BWUA.

### Role and authorisation integrity

The Council adds substantial operative requirements for access control:

- fine-grained and auditable authorisation outcomes;
- selective visibility of credentials and attestations;
- real-time validation of roles and mandates;
- logging and timestamping of access and execution events;
- cryptographically verifiable proofs of authorisation;
- traceability to legitimate issuers;
- automatic prevention of role conflicts, over-delegation and expired authorisations; and
- interoperability of authorisation logic between EBWs.

These are genuine build and conformance requirements in the Council mandate.

### QERDS

The mandatory secure legal communication channel and standalone QERDS access for EUDIW users were already present in the Commission proposal.

The Council changes the Annex from instructing the Commission to `designate one` QERDS to requiring it to designate the protocol and establish standards and specifications for compliant implementations of the specific QERDS. The channel must use open, publicly available and royalty-free standards, provide end-to-end encryption, and support availability, redundancy and fallback.

This points towards a common interoperable QERDS profile rather than hard-wiring one provider or service endpoint. It does not explicitly guarantee that several QERDS providers will be used, so provider multiplicity should remain an issue to clarify.

### Directory and digital addresses

The Council adds a standalone duty for EBW providers to supply a unique digital address to requesting public bodies that do not own an EBW.

It also requires providers to verify the owner's directory information at least once every 72 hours, using authentic-source verification mechanisms or notifications where applicable, and to communicate relevant changes to the Commission.

This turns directory integration into a recurring operational and data-quality responsibility. The resulting specification should address monitoring, error handling, duplicate prevention, address continuity and provider changes.

### Assurance levels

The Council does not raise every EBW process to `high`.

The resulting split is:

- **wallet-unit user authentication:** at least `substantial`;
- **remote onboarding through a legal representative or another person lawfully empowered to perform onboarding:** `high`;
- **mechanisms supporting verification of EBWOID issuance, delivery and activation:** `high`.

The conformance profile should keep these processes separate. Describing all owner onboarding as `high` would be broader than the Council text.

## C. Security and provider authorisation

### Becoming a provider

The Commission proposal used a notification process. The Council replaces this with an application for authorisation and requires the supervisory body to conclude that the requirements of the Council text are met before the provider is listed.

The application must include:

- a whole-solution risk assessment covering design, development, deployment, operation, maintenance, interoperability, dependencies and termination;
- a self-assessment against Articles 5, 6 and 7 and the Annex;
- termination plans and risk-management measures; and
- where applicable, self-assessment evidence from third parties supplying regulated functions.

Examples may include QERDS, qualified trust services, cloud or cryptographic services where those services fall within the requirements being assessed. These examples are project interpretations; the legal test is whether the third-party service falls under Articles 5, 6, 7 or the Annex.

The Commission is tasked with specifying common procedures, assessment criteria and a risk register through implementing acts. The applicant is not independently required to create the common regulatory risk register.

The risk assessment must remain current. The self-assessment must be updated every 24 months and immediately after specified incidents, substantial changes, material modifications or newly identified risks.

### QTSP status

The Commission proposal contained two explicit operative advantages for QTSPs:

- an exemption from the Article 19a eIDAS requirement; and
- an exemption from the ordinary provider review procedure.

The Council deletes both exemptions. It permits applicants to reuse valid eIDAS conformity reports or certificates for corresponding requirements, avoiding duplicate self-assessment for the same matter.

It is therefore accurate to say that QTSP status no longer provides the explicit automatic exemptions in the Commission proposal. It is too strong to say that it provides no lighter route at all: Recital 40 still states that QTSPs should benefit from a particularly light process.

A safe formulation is:

> QTSP status permits evidence reuse and may support a lighter process, but it does not provide automatic authorisation, automatic listing or a blanket exemption from EBW-specific requirements.

### EU establishment and third-country control

The requirements for the provider to be established in the Union, have its principal place of business and main operations in the Union, and not be controlled by a third country or third-country entity were already present in the Commission proposal.

The Council adds an implementing act, due eight months after entry into force, specifying the tools, indicators and assessment frameworks for determining whether providers present a risk to Union security, including third-country-control risks.

### Cybersecurity

The Commission proposal stated that EBW providers must comply with the NIS2 requirements applicable to essential entities. The Council deletes that paragraph.

The Council retains an obligation to comply with applicable Union and national cybersecurity requirements, including high-risk-supplier rules, and to ensure that suppliers of **software and security solutions** comply with those requirements and relevant security standards.

The Council text still contains a bracketed alternative referring to `[applicable cybersecurity requirements / Cybersecurity Act]`. This is an unresolved drafting element and should not be presented as final wording.

The Council text therefore does not itself classify every EBW provider as a NIS2 essential entity. NIS2 applicability must be assessed under the relevant cybersecurity legislation and the provider's actual activities.

### Accessibility and open source

The Council adds an operative requirement for providers to make their EBWs accessible to persons with disabilities on an equal basis with other users. Recital 20 frames this as applying `to the extent relevant` and refers to the European Accessibility Act.

The Council also adds a recital encouraging providers to release EBW application software under an open-source licence. This is encouragement, not a binding provider obligation or conformance criterion.

## D. Approach, scope and timeline

### Legal equivalence

The Commission proposal attached equivalent legal effect to actions resulting from the use of the core functionalities generally.

The Council limits Article 4 to actions resulting from the use of a **qualified trust service forming part of** an Article 5 core functionality. It also expressly preserves existing Union and national electronic-format requirements and other applicable administrative and procedural requirements.

A technically successful EBW transaction therefore does not automatically receive the legal effect of a qualified signature, qualified seal, qualified EAA or QERDS action. The WBCS should identify which step is supported by which qualified trust service and avoid assigning qualified legal effect to the surrounding technical flow.

### Public-sector flexibility

The Commission proposal required public bodies to have an EBW, including QERDS, for document submission and notifications and contained a transitional gateway model.

The Council deletes those provisions. Public bodies must enable economic operators to use the relevant EBW functions, and Member States must take appropriate organisational and technical measures, but the Council does not prescribe that every public body own an EBW or expose one common wallet endpoint. Recital 7 allows existing interfaces and operational frameworks to remain.

For the pilots, this means that B2G integration may remain heterogeneous and may require adapters to existing national or sectoral systems.

### Timelines

The Council groups the application dates in Article 22:

- specified implementing-act, governance and final provisions apply from entry into force;
- most of the Regulation's provisions would apply **one year after the date of application of the last listed implementing act**; and
- the public-sector directory obligation in Article 10(3b) and the acceptance obligation in Article 16 apply **two years after the date of application of the last listed implementing act**.

The separate Commission-proposal transition period for QERDS is removed.

Real dates therefore depend on the implementing-act package. The Council text also contains an apparent drafting circularity: Article 11(2c) dates its implementing act from the Regulation's date of application, while Article 22 makes that date of application depend on the last implementing act, including Article 11(2c). This should be monitored as an issue likely to require correction during the legislative process.

### Third-country systems and security carve-out

The Council adds criteria for assessing equivalent third-country systems, including data protection, cybersecurity and independence from control by high-risk governments. It also further develops the conditions for providing EBWs to economic operators established outside the Union.

Article 2(2a) states that the Regulation is without prejudice to Member State actions for public order, public security and defence. It is safer to describe this as a carve-out or without-prejudice clause, rather than a complete exemption from all potentially applicable rules.

## What this means for our work

The following are project implications, not tasks imposed directly on WE BUILD by the Council:

1. In the D4.1 Definition Appendix and related issues, clearly distinguish the EBW provider, EAA or trust-service provider, EBWOID provider, owner, wallet user, legal representative or other lawfully empowered person, and relying party.
2. Escalate Article 5(1)(f) as an architecture and regulatory-role question. The definition and conformance work should state who issues an owner-sourced attestation, what claim is being made, who verifies it, and who operates status and revocation.
3. Keep technical authorisation separate from evidence of legal representation, while implementing the Council's real-time, auditable and interoperable access-control requirements.
4. Update the conformance profile for the assurance split: wallet-user authentication at least at `substantial`; specified remote onboarding and EBWOID issuance, delivery and activation at `high`.
5. Use the Annex 13 EUDIW trust artefacts, the relying-party access certificates and unit attestations, in the mutual-identification work for #250.
6. Treat the provider-authorisation process as a whole-solution evidence exercise, including relevant third-party dependencies and recurring reassessment.
7. Define portability beyond file import/export, but clearly label continuity questions about BWUA, directory addresses and authorisations as project design issues rather than already-settled legal requirements.
8. Do not assume that every public authority will expose a common EBW endpoint.

---

_Prepared by GRNET (WP4 Wallet Providers Group lead) as a working input for the group._

## Primary sources

- [Commission proposal COM(2025) 838 / ST 15701/25](https://data.consilium.europa.eu/doc/document/ST-15701-2025-INIT/en/pdf)
- [Commission proposal Annex / ST 15701/25 ADD 1](https://data.consilium.europa.eu/doc/document/ST-15701-2025-ADD-1/en/pdf)
- [Presidency redline against the Commission proposal / ST 7659/26](https://data.consilium.europa.eu/doc/document/ST-7659-2026-INIT/en/pdf)
- [Council general approach / ST 10346/26](https://data.consilium.europa.eu/doc/document/ST-10346-2026-INIT/en/pdf)
- [Council announcement of the general approach, 9 June 2026](https://www.consilium.europa.eu/en/press/press-releases/2026/06/09/european-business-wallets-council-adopts-negotiating-position/)
- [European Parliament procedure file 2025/0358(COD)](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025%2F0358%28COD%29)
