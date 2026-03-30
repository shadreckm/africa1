# Kulima Africa: Systems Integration & Orchestration Architecture

## 1. Integration Architecture: The "Kulima Hub"
We employ a **Hybrid Hub-and-Spoke** architecture. While each system (LUMOZA, LUNDAI, KulimaVerse) is autonomous, they are orchestrated by a central **Kulima Hub**.

### Components:
*   **API Gateway (Kong/Apigee)**: Single entry point for all cross-system requests. Handles rate limiting, authentication, and protocol translation.
*   **Service Mesh (Istio)**: Manages internal communication between microservices, ensuring low-latency and secure mTLS connections.
*   **Event Bus (Apache Kafka)**: The backbone for asynchronous, event-driven orchestration.
*   **Orchestration Engine (Temporal.io)**: Manages long-running workflows (e.g., a 6-month crop cycle leading to a mortgage approval).

---

## 2. Orchestration Logic: Cross-System Workflows
User actions trigger "Impact Events" that propagate through the ecosystem.

### Example Workflow: "The Path to Homeownership"
1.  **LUMOZA (Input)**: Farmer logs a successful harvest of 50 bags of maize.
2.  **Event**: `crop_harvest_logged` is published to Kafka.
3.  **KulimaVerse (Processor)**: Subscribes to event. Updates farmer's **Impact Trust Score (ITS)**.
4.  **Orchestration**: If ITS > 750, trigger `credit_threshold_reached`.
5.  **LUNDAI (Output)**: Subscribes to threshold event. Sends a WhatsApp notification via LUMOZA: *"Congratulations! Your harvest has pre-approved you for a LUNDAI starter home. View designs?"*

---

## 3. Unified Identity: Kulima ID
A decentralized identity system built on **OIDC (OpenID Connect)**.

*   **Primary Key**: `KID_XXXXXX` (UUID).
*   **Linking**: Accounts are linked via Verified Phone Number (WhatsApp) and Biometric Hash (Face/Fingerprint).
*   **Trust Levels**:
    *   *Level 1 (Basic)*: Phone verified.
    *   *Level 2 (Verified)*: National ID + Biometric.
    *   *Level 3 (Trusted)*: 3+ successful harvest cycles in KulimaVerse.

---

## 4. Unified Wallet: The VU Ecosystem
A multi-currency ledger system.

*   **VU (Voucher Units)**: Internal stable-utility token (1 VU = 1 USD equivalent in local inputs).
*   **Fiat Bridge**: Integration with M-Pesa, Airtel Money, and TNM Mpamba.
*   **Flow**:
    *   Farmer sells crop -> Receives VU in Kulima Wallet.
    *   Farmer pays LUNDAI mortgage -> VU deducted from Kulima Wallet.
    *   Farmer buys fertilizer -> VU transferred to Supplier Wallet.

---

## 5. Event-Driven System: Key Events
| Event Name | Source | Consumer | Payload Example |
| :--- | :--- | :--- | :--- |
| `user_verified` | KulimaVerse | All | `{ kid: "KID_123", level: 2 }` |
| `crop_diagnosed` | LUMOZA | KulimaVerse | `{ kid: "KID_123", health: "GOOD", yield_est: 5000 }` |
| `loan_approved` | KulimaVerse | LUNDAI | `{ kid: "KID_123", amount: 5000, type: "HOUSING" }` |
| `payment_received` | Wallet | All | `{ kid: "KID_123", amount: 200, ref: "MORTGAGE_MAR_26" }` |

---

## 6. Data Synchronization
*   **Shared Core (Real-time)**: Identity, Wallet Balance, Impact Trust Score (ITS).
*   **Isolated Domain (Batch/On-demand)**: Soil data (LUMOZA), Architectural blueprints (LUNDAI), Detailed transaction logs (KulimaVerse).

---

## 7. Trust & Security Layer
*   **Fraud Detection (LUNDAI-Sentinel)**: AI-driven anomaly detection on harvest logs vs satellite imagery.
*   **RBAC**: Fine-grained access control. LUMOZA cannot see LUNDAI financial history without explicit user consent (OAuth2 Scopes).
*   **Data Validation**: All events are schema-validated using **Avro** before being accepted into the bus.

---

## 8. MVP Integration Plan
### Phase 1: The Identity Hook (Month 1-2)
*   Deploy **Kulima ID**.
*   Link LUMOZA WhatsApp profiles to Kulima ID.
*   Implement basic **ITS (Impact Trust Score)** tracking.

### Phase 2: The Wallet Bridge (Month 3-4)
*   Deploy **Unified Wallet**.
*   Enable Mobile Money cash-in/out.
*   Allow LUMOZA users to earn "Trust Points" (VU Beta).

### Phase 3: The Full Loop (Month 6+)
*   Integrate **LUNDAI** pre-approvals based on KulimaVerse history.
*   Full event-driven automation.

---

## 9. Risks & Mitigation
*   **Risk**: Low connectivity in rural areas.
    *   **Mitigation**: Edge-caching for LUMOZA; offline-first mobile app for LUNDAI; SMS fallback for Wallet notifications.
*   **Risk**: Identity theft/SIM swapping.
    *   **Mitigation**: Multi-factor authentication (Biometric + WhatsApp code) for all high-value transactions.
