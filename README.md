# Enoxaparin Study Collector

**Study:** Assessment of Enoxaparin Dosing and Administration Practices in Surgical Wards
**Setting:** Baghdad teaching hospital, General Surgery and Gynecology wards
**Design:** Prospective, observational. Data are collected by the pharmacist.

## Files

| File | What it is |
|---|---|
| `index.html` | Source of the mobile-first data collection app |
| `Enoxaparin_Data_Collection.xlsx` | Offline Excel template with the same columns, formulas and summary |

## How the app runs

`index.html` is published as a **Claude artifact** (claude.ai). The study data does not live in this repository. Saving entries and exporting to Excel rely on two Claude artifact features:

- `db`: a shared database that the whole study team writes to
- `downloads`: the Excel export

Because of this, opening `index.html` directly or hosting it on GitHub Pages shows the interface but **cannot save or load data**. To run it as a standalone website, the storage layer would need replacing with a backend such as Supabase.

**Access:** share the artifact from its Share menu. Give each data-collecting pharmacist **Contributor** access so they can save entries.

## Features

- **Patients:** demographics, Cockcroft–Gault CrCl, BMI, Caprini level, surgery timing and prescription details.
- **Live dose check:** compares the prescribed dose with the expected dose:
  - 40 mg once daily for prophylaxis
  - 30 mg once daily if CrCl is below 30 mL/min
  - BID if BMI is 40 or more
  - 1 mg/kg for treatment
- **Pharmacist judgement:** five criteria, which together give an Appropriate or Inappropriate verdict, plus error types.
- **Dose observations:** timing delay, missed doses and a 9-item injection-technique checklist with a score.
- **Summary:** results by ward.
- **Export to Excel:** produces **Patient Data** and **Administration** sheets.

## Data protection

- Enter **coded IDs only** (GS-001 / GY-001). Never enter names or file numbers.
- Keep the key that links codes to patients offline.
- Record a finding before making any safety intervention, as the protocol requires.

## Reference standards

- CHEST guidelines on VTE prevention in surgical patients
- ASRA guidelines on regional anesthesia and anticoagulation
- Clexane (enoxaparin) SmPC
