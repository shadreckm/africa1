# Kulima Africa: Backend Architecture Design

## 1. Service Architecture (Microservices)
The system is designed as a set of decoupled, domain-driven microservices communicating via an asynchronous event bus and a high-performance API Gateway.

### Core Services:
- **Identity Service (Kulima ID)**: OIDC-compliant authentication, biometric verification, and KYC management.
- **User Service**: Profile management, preferences, and social graph.
- **Wallet Service**: Ledger-based system for cash, agricultural vouchers, and micro-credits.
- **Transaction Service**: Orchestrates payments between internal wallets and external providers (M-Pesa, Banks).
- **LUMOZA Service**: Agricultural intelligence engine. Processes soil, weather, and market data via Gemini AI.
- **LUNDAI Service**: Housing marketplace and mortgage readiness engine.
- **KulimaVerse Service**: Trust protocol. Manages the Impact Trust Score and verification logs.
- **Notification Service**: Multi-channel delivery (WhatsApp, SMS, Push).

---

## 2. API Gateway Structure
**Technology**: Kong or Envoy Proxy.
- **Authentication**: JWT validation at the edge.
- **Rate Limiting**: Tiered limits based on user verification level.
- **Request Routing**: Path-based routing to internal services.
- **Observability**: Distributed tracing (OpenTelemetry) and metrics (Prometheus).

---

## 3. Authentication (Kulima ID)
- **Protocol**: OAuth 2.1 / OpenID Connect.
- **Multi-Factor**: 
  - Level 1: Phone + OTP (Low-value actions).
  - Level 2: Biometric (Face/Fingerprint) via WebAuthn (High-value trades).
  - Level 3: Community Verification (Trust-based recovery).
- **Identity Linking**: Single ID across LUMOZA, LUNDAI, and third-party partners.

---

## 4. Database Design (High-Level)

### Users (Postgres)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary Key |
| kulima_id | VARCHAR | Unique Global Identifier |
| phone | VARCHAR | Primary Auth Factor |
| kyc_status | ENUM | PENDING, VERIFIED, REJECTED |
| trust_score | INT | Current Impact Score |

### Ledger (CockroachDB - Global Consistency)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary Key |
| account_id | UUID | Wallet Reference |
| amount | DECIMAL | Transaction Amount |
| type | ENUM | DEBIT, CREDIT |
| metadata | JSONB | Context (e.g., "Seed Purchase") |

### Impact Logs (Postgres/TimeScaleDB)
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary Key |
| user_id | UUID | User Reference |
| action | VARCHAR | e.g., "Soil Analysis Completed" |
| points | INT | Trust Score Impact |
| verified_by | VARCHAR | System or Admin ID |

---

## 5. Event Flow (Kafka)
The system uses an event-driven architecture to ensure eventual consistency and high availability.

**Example Flow: Soil Analysis to Voucher Disbursement**
1. **LUMOZA Service** publishes `soil.analyzed` event.
2. **KulimaVerse Service** consumes event -> Updates `trust_score` -> Publishes `trust.updated`.
3. **Wallet Service** consumes `trust.updated` -> Checks eligibility for "Fertilizer Subsidy" -> Disburses voucher -> Publishes `voucher.disbursed`.
4. **Notification Service** consumes `voucher.disbursed` -> Sends WhatsApp message via LUMOZA integration.

---

## 6. Integration APIs

### LUMOZA (WhatsApp AI)
- **Webhook**: Receives messages from Twilio/WhatsApp.
- **AI Pipeline**: 
  - Message -> NLP (Gemini) -> Intent Extraction.
  - Intent: "Analyze Soil" -> Trigger Sensor Data Fetch -> Generate Advice.
- **Callback**: Sends formatted advice back to user.

### LUNDAI (Housing)
- **Marketplace API**: Syncs listings and leads.
- **Credit API**: Queries Wallet/Trust services to calculate mortgage eligibility.

---

## 7. Tech Stack
- **Languages**: Go (High-performance services), Node.js/TypeScript (API Gateway/BFF).
- **Databases**: Postgres (Relational), CockroachDB (Distributed Ledger), Redis (Caching/Queues).
- **Messaging**: Apache Kafka (Event Bus), RabbitMQ (Task Queues).
- **AI**: Google Gemini API (Intelligence), Vertex AI (Model Hosting).
- **Infrastructure**: Kubernetes (Orchestration), Terraform (IaC), Google Cloud Platform (Hosting).

---

## 8. Security Model
- **Zero Trust**: Every internal service request requires a service-to-service token (mTLS).
- **Data Encryption**: AES-256 at rest, TLS 1.3 in transit.
- **PII Protection**: Sensitive data (KYC) stored in a separate, highly-restricted vault.
- **Audit Logging**: Every financial and trust-impacting action is logged to an immutable audit trail.
