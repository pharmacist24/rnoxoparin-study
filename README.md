# Enoxaparin Study Collector

**Study:** Assessment of Enoxaparin Dosing and Administration Practices in Surgical Wards
**Setting:** Baghdad teaching hospital, General Surgery and Gynecology wards
**Design:** Prospective, observational. Data are collected by the pharmacist.

## Files

| File | What it is |
|---|---|
| `index.html` | The mobile-first web app: one self-contained page |
| `Enoxaparin_Data_Collection.xlsx` | Offline Excel template with the same columns |
| `supabase/` | Notes on the database |

## How it works

- **Database:** Supabase project `enoxaparin-study` (Frankfurt). Study data is stored there, never in this repository.
- **Sign-in:** email and password. Only emails listed in the `team_members` table can read or write data. Row-level security enforces this on the server.
- **Excel export:** the button produces a workbook with **Patient Data** and **Administration** sheets.
- **The key in `index.html`** is Supabase's *publishable* key. It is designed to be public; the data is protected by sign-in plus row-level security.

## Hosting on GitHub Pages

1. In the repo, open Settings → Pages.
2. Set Source to "Deploy from a branch", choose `main` / root, and save.
3. The app will be served at `https://pharmacist24.github.io/rnoxoparin-study/`.

GitHub Pages on a free account requires a **public** repository. This is safe here: the repo contains only code, and no patient data.

## Install on a phone and work offline

The website is an installable app (PWA).
- **Android (Chrome):** open the site, then tap the phone-icon button in the header, or ⋮ → *Install app*.
- **iPhone (Safari):** tap Share → *Add to Home Screen*.

How offline works:
- **Sign in once while online.** After that the app opens without internet, using the copy of the study data saved on the phone.
- **Saving never waits for the internet.** Every save goes to the phone first and uploads automatically when the connection returns. The pill in the header shows *✓ Synced*, *3 to upload*, or *Offline*.
- If two pharmacists use the same study code while offline, the second one is renumbered automatically when it uploads, and its dose records move with it.
- Signing out deletes this phone's copy. If changes haven't uploaded yet, the app warns you first.

## Accounts and approval

- **Creating an account:** on the sign-in screen, tap *Create an account* and enter your full name, email and password.
- **Approval:** a new account can't see any study data until an owner approves it. Requests appear in the **Team** tab, which only owners see, and a number on the tab shows how many are waiting.
- **Pre-approving:** in the Team tab, an owner can approve an email in advance. That person gets access as soon as they create their account.
- **Removing someone:** owners can remove members in the Team tab. Removing yourself is blocked.
- **Enforcement:** all of this is enforced in the database by row-level security and owner-only functions, not just hidden in the app.

## Adding a pharmacist (dashboard alternative)

Do both steps in the Supabase dashboard:

1. **Authentication → Users → Add user → Create new user.** Enter their email and a temporary password, and tick *Auto Confirm User*.
2. **Table Editor → `team_members` → Insert row.** Enter their email in lowercase, plus a display name.

To remove someone, delete their `team_members` row. They keep a login but can no longer see any data.

## Features

The form is deliberately short: **21 entries per patient, plus the Caprini checklist, and 11 per observed dose**. The pharmacist enters raw data only; there are no judgement fields. The Excel sheet **Why these variables** lists the reason and source study for each field.

- **Patient (21 entries):** name, ward, study code (filled automatically: GS-001, GY-001…), age, sex, weight, height, creatinine, surgery type, anesthesia, surgery time, contraindication, indication, dose, frequency, first-dose time, days on enoxaparin, bleeding, thrombocytopenia and notes.
- **Caprini calculator:** tick the risk factors from the 2005 Caprini checklist. Age, BMI > 25 and surgery type are added automatically.
- **Auto-calculated:** BMI, Cockcroft–Gault CrCl, Caprini score, and hours from surgery to first dose.
- **Calculated results:** Indication, Dose, Timing, Overall and Reason, from these rules:
  - Indication is inappropriate if there is a contraindication, or if prophylaxis is given with Caprini < 3.
  - Prophylaxis dose: 40 mg OD; 30 mg OD if CrCl < 30; 40 mg BID if BMI ≥ 40.
  - Treatment dose: 1 mg/kg BID or 1.5 mg/kg OD; 1 mg/kg OD if CrCl < 30. A ±10% margin is allowed.
  - Timing (prophylaxis): the first dose must be ≥ 12 h before surgery, or 12–24 h after it.
- **Dose observation (11 entries):** patient, date, given on time / late / missed, and 7 injection-technique steps, scored Good (all correct) or Poor.
- **Summary tab = results chapter:**
  - Table 1: patient characteristics
  - Table 2: appropriateness (calculated)
  - Table 3: reasons for inappropriate use
  - Table 4: administration
  - Table 5: safety
- **Live updates:** when a colleague saves, everyone's list refreshes.

## Data protection

- Patient names are stored in the Supabase database. Only signed-in team members can read them, enforced by row-level security. They are never stored in this repository.
- **Export → Without names** gives an anonymised file (study codes only) for analysis and for sharing.
- Get ethics-committee approval for recording names. Delete names at the end of data collection if the protocol requires it.

## Reference standards

- CHEST guidelines on VTE prevention in surgical patients
- ASRA guidelines on regional anesthesia and anticoagulation
- Clexane (enoxaparin) SmPC
