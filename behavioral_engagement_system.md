# LUMOZA Deployment Readiness & Reliability Plan
**Target Market:** Malawi Smallholder Farmers
**Platform:** WhatsApp (Low-Bandwidth, Low-Literacy)

---

## 1. 🔍 Core Function Audit: The "Message-to-Action" Flow

| Step | Action | Potential Failure Points |
| :--- | :--- | :--- |
| **1. Input** | Farmer sends text, audio, or photo. | Network timeout, blurry photo, dialect mismatch (Chichewa vs English). |
| **2. Processing** | AI interprets intent and context. | Hallucination, missing local context (e.g., specific Malawi soil types). |
| **3. Diagnosis** | System identifies pest/disease/need. | False positive (wrong pest), over-technical language. |
| **4. Response** | System sends formatted WhatsApp message. | Message too long, too many steps, expensive recommendations. |
| **5. Action** | Farmer applies advice. | Recommendation unavailable in local market, advice too complex. |

---

## 2. ⚠️ Failure Scenarios & Solutions

| Scenario | Issue | Solution |
| :--- | :--- | :--- |
| **Bad Network** | Message hangs or fails to send. | Implement **asynchronous retry logic**. Send "I'm working on it..." immediately to manage expectations. |
| **Unclear Images** | AI cannot identify the pest. | **Guided Photography**: "Please take a photo from 10cm away, showing the underside of the leaf." |
| **Wrong Diagnosis** | AI identifies the wrong disease. | **Human-in-the-Loop (HITL)**: Flag low-confidence scores for manual review by a local agronomist. |
| **Slow Response** | AI takes >10s to process. | **Progressive Disclosure**: Send a "Thinking..." message or a relevant farming tip while the AI works. |
| **Language Barrier** | Farmer uses slang or mixed language. | **Dialect Training**: Fine-tune models on Malawian agricultural Chichewa/English mix. |

---

## 3. 🧠 Response Quality Improvement (Chichewa/English Mix)

### Example 1: Pest Attack
**BEFORE (Too Technical):**
> "Your crop appears to be infested with Spodoptera frugiperda (Fall Armyworm). You should apply Emamectin benzoate at a rate of 200ml per hectare using a calibrated knapsack sprayer."

**AFTER (Actionable & Local):**
> "Moni! I see **Armyworms** on your maize. 🐛
> 
> **Do this now:**
> 1. Go to your local agro-dealer (e.g., Farmers World).
> 2. Ask for **'Emamectin'** (like 'Belt' or 'Vantex').
> 3. Mix 1 small cap in your sprayer.
> 4. Spray directly into the 'funnel' of the plant.
> 
> *Tip: Do this early morning or late evening when it is cool.*"

---

## 4. ⏱️ Speed & Reliability Targets

*   **Initial Receipt:** < 2 seconds (WhatsApp "Double Tick").
*   **Acknowledgment:** < 5 seconds ("LUMOZA is typing...").
*   **Full Diagnosis:** < 15 seconds.
*   **Fallback:** If AI fails after 30s, send: "I am having trouble seeing clearly. A human expert will look at this and message you in 1 hour."

---

## 5. 📱 WhatsApp Experience Optimization

*   **Rule of 3:** Never more than 3 steps in one message.
*   **Visual Cues:** Use 🌿 for crops, 🐛 for pests, 🌦️ for weather, 💰 for prices.
*   **Bold Keywords:** Highlight the **Action** and the **Product Name**.
*   **Spacing:** Double space between paragraphs for easier reading on small screens.

---

## 6. 👨‍🌾 User Test Scenarios (The "Malawi 10")

1.  **"Maize turning yellow"**: Expected: Check for Nitrogen deficiency vs. Waterlogging.
2.  **"Photo of holes in leaves"**: Expected: Identify Fall Armyworm or Grasshoppers.
3.  **"When should I plant maize in Kasungu?"**: Expected: Provide weather-based planting window.
4.  **"How much is a bag of Urea in Mitundu?"**: Expected: Provide latest market price from local dealer.
5.  **"My cow is not eating"**: Expected: Redirect to veterinary services (Out of scope for Lumoza, but helpful).
6.  **"Audio: Moni, ndikufuna thandizo ndi chimanga changa"**: Expected: Transcribe and respond in Chichewa.
7.  **"What is the weather tomorrow?"**: Expected: Precise local forecast for the farmer's village.
8.  **"Is this fertilizer real?"**: Expected: Guide user to check the seal/hologram.
9.  **"Refer a friend"**: Expected: Generate a simple referral link/code.
10. **"Redeem VU Points"**: Expected: Show airtime conversion options.

---

## 7. 🧪 Manual Test Plan (Pre-Launch Checklist)

- [ ] **Connectivity Test:** Send "Moni" from a 2G/Edge connection area.
- [ ] **Image Stress Test:** Send blurry, dark, and upside-down photos.
- [ ] **Language Test:** Use deep Chichewa proverbs to test AI robustness.
- [ ] **Dealer Validation:** Call 5 local agro-dealers to verify price accuracy.
- [ ] **Audio Test:** Record audio with background noise (wind/chickens).
- [ ] **End-to-End Redemption:** Earn 5 VU points and successfully redeem for K100 airtime.

---

## 8. 🚫 What to Remove or Simplify

*   **REMOVE:** Complex graphs or charts. Farmers prefer a simple "High/Medium/Low" or "Good/Bad".
*   **SIMPLIFY:** The "Kulima ID" registration. Make it a simple name/location request rather than a long form.
*   **REMOVE:** Scientific names of pests. Use local names (e.g., "Nankafumbwe").
*   **SIMPLIFY:** Navigation menus. Use numbers (1, 2, 3) instead of typing long words.
