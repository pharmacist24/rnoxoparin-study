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

## Adding a pharmacist

Do both steps in the Supabase dashboard:

1. **Authentication → Users → Add user → Create new user.** Enter their email and a temporary password, and tick *Auto Confirm User*.
2. **Table Editor → `team_members` → Insert row.** Enter their email in lowercase, plus a display name.

To remove someone, delete their `team_members` row. They keep a login but can no longer see any data.

## Features

The form is deliberately short: **31 entries per patient and 11 per observed dose**. Only variables that published enoxaparin drug-use evaluations collected, and that feed a results table, are included. The Excel sheet **Why these variables** lists the reason and the source study for each one.

- **Patient (31 entries):** age, sex, weight, height, creatinine, procedure, surgery type, cancer, anesthesia, surgery time, Caprini score, contraindications, indication, dose, frequency, first-dose time, days on enoxaparin, antiplatelet/NSAID use, platelet monitoring, five appropriateness judgements, main error, bleeding and thrombocytopenia.
- **Auto-calculated:** BMI, Cockcroft–Gault CrCl, Caprini risk, hours from surgery to first dose, expected dose with a Match/Review flag, and the overall verdict.
- **Dose observation (11 entries):** patient, date, given on time / late / missed, and 7 injection-technique steps, scored Good (all correct) or Poor.
- **Summary tab = results chapter:**
  - Table 1: patient characteristics
  - Table 2: appropriateness
  - Table 3: error types
  - Table 4: administration
  - Table 5: safety
- **Live updates:** when a colleague saves, everyone's list refreshes.

## Data protection

- Enter **coded IDs only** (GS-001 / GY-001). Never enter names or file numbers.
- Keep the key that links codes to patients offline.
- Record a finding before making any safety intervention, as the protocol requires.

## Reference standards

- CHEST guidelines on VTE prevention in surgical patients
- ASRA guidelines on regional anesthesia and anticoagulation
- Clexane (enoxaparin) SmPC
