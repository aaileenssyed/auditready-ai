![AuditReady AI Build Check](https://github.com/aaileenssyed/auditready-ai/actions/workflows/ci.yml/badge.svg)
# AuditReady AI + DevOps Reliability Lab

**AuditReady AI** is a cybersecurity and GRC readiness tool that helps organizations assess their compliance posture, identify control gaps, and generate audit-ready remediation guidance.

This project also serves as a **DevOps/SRE Reliability Lab**, demonstrating CI/CD workflows, deployment validation, health checks, troubleshooting documentation, and production-readiness practices.

The current MVP focuses on **NIST CSF 2.0 readiness** and generates a professional readiness report using a rules-based scoring engine.

---

## Live Demo

**Live App:** https://auditready-ai-five.vercel.app/  
**Repository:** https://github.com/aaileenssyed/auditready-ai

---

## Project Overview

Many small and growing organizations struggle to understand whether they are ready for cybersecurity audits, compliance reviews, or internal security assessments.

AuditReady AI simplifies that process by allowing users to complete a readiness questionnaire and receive:

- Overall compliance readiness score
- NIST CSF function-level scores
- Missing policies
- Missing technical controls
- Evidence checklist
- Risk summary
- 30/60/90-day remediation roadmap
- Downloadable PDF readiness report

The goal is to make compliance readiness easier to understand, more explainable, and more actionable.

---

## Why I Built This

I built AuditReady AI as a cybersecurity, GRC, AI, and DevOps-focused portfolio project.

The project combines:

- Cybersecurity frameworks
- Governance, Risk, and Compliance concepts
- Security control mapping
- Risk assessment
- Rules-based scoring
- AI-style report generation
- SaaS-style product design
- CI/CD and reliability practices
- Deployment troubleshooting and documentation

This project is designed to demonstrate practical skills in security readiness, compliance workflows, frontend development, DevOps fundamentals, and product thinking.

---

## Current MVP Features

### NIST CSF 2.0 Readiness Assessment

Users can answer a readiness questionnaire based on core cybersecurity control areas such as:

- Governance
- Asset management
- Access control
- Identity and authentication
- Security awareness
- Vulnerability management
- Logging and monitoring
- Incident response
- Backup and recovery

### Rules-Based Scoring Engine

The scoring engine uses weighted control responses:

| Answer | Score Impact |
|---|---|
| Yes | Full score |
| Partially | Half score |
| No | Zero score |
| Not Applicable | Excluded from scoring |

Controls are weighted by severity and importance.

### Readiness Report

The generated report includes:

- Overall readiness score
- Risk rating
- Function-level scores
- Critical gap count
- Missing policy list
- Missing technical control list
- Evidence checklist
- Risk summary
- 30/60/90-day remediation roadmap
- Detailed gap analysis

### PDF Export

Users can download a PDF version of the readiness report directly from the browser.

### Sample Report Mode

If no assessment has been completed, the report page loads a demo organization profile and sample answers so visitors can preview the product immediately.

---

## DevOps / CI-CD / Reliability Features

AuditReady AI is also being used as a DevOps/SRE reliability lab.

Current reliability features include:

- GitHub Actions CI workflow on push and pull request
- Production build validation using `npm run build`
- Manual GitHub Actions build workflow
- Weekly scheduled build health check
- Vercel production deployment
- Health check endpoint at `/api/health`
- Bash-based health check script using `curl`
- Deployment failure runbook
- Sample incident postmortem
- Dockerfile for containerized local production testing

---

## DevOps Workflow

```text
GitHub Push
   ↓
GitHub Actions CI
   ↓
Install Dependencies
   ↓
Build Production App
   ↓
Vercel Deployment
   ↓
Health Check Endpoint
   ↓
Runbook / Postmortem Documentation
````
---

## What This Demonstrates

This project demonstrates:

* Git-based development workflow
* CI validation
* Production build troubleshooting
* Cloud deployment through Vercel
* Basic health monitoring
* Bash scripting
* Docker containerization
* Reliability documentation
* Incident response thinking
* Cybersecurity and compliance control mapping
---

## Tech Stack

| Category         | Tool                 |
| ---------------- | -------------------- |
| Framework        | Next.js              |
| Language         | TypeScript           |
| Styling          | Tailwind CSS         |
| UI Components    | shadcn/ui            |
| Icons            | Lucide React         |
| PDF Export       | jsPDF + html2canvas  |
| Hosting          | Vercel               |
| CI/CD            | GitHub Actions       |
| Containerization | Docker               |
| Scripting        | Bash                 |
| Storage in MVP   | Browser localStorage |

---

## How It Works

```text
Company Profile
      ↓
NIST CSF Questionnaire
      ↓
Rules-Based Scoring Engine
      ↓
Gap Analysis
      ↓
Evidence Checklist
      ↓
Risk Summary
      ↓
30/60/90-Day Roadmap
      ↓
PDF Readiness Report
```

The readiness score is calculated using deterministic rules instead of relying fully on AI. This keeps the scoring process explainable and easier to audit.

The report-generation layer translates technical gaps into business-friendly language and remediation guidance.

---

## Scoring Methodology

Each question is mapped to:

* NIST CSF function
* Control category
* Control type
* Severity level
* Weight
* Missing policy
* Missing technical control
* Required evidence
* Remediation recommendation

Example control object:

```ts
{
  id: "PR-001",
  function: "Protect",
  category: "Identity and Access Management",
  question: "Is multi-factor authentication enforced for administrative and privileged accounts?",
  controlType: "Technical",
  severity: "Critical",
  weight: 5,
  missingPolicy: "Access Control Policy",
  missingTechnicalControl: "MFA for privileged accounts",
  evidence: [
    "MFA configuration screenshot",
    "Admin user list",
    "Access control policy"
  ],
  remediation: "Enable MFA for all privileged accounts and document exceptions."
}
```

---

## Risk Rating Logic

| Score Range | Risk Rating   |
| ----------- | ------------- |
| 85–100      | Low Risk      |
| 70–84       | Moderate Risk |
| 50–69       | High Risk     |
| Below 50    | Critical Risk |

---

## Project Structure

```text
auditready-ai/
  .github/
    workflows/
      ci.yml
      manual-build.yml
      weekly-health-check.yml

  app/
    page.tsx
    layout.tsx
    globals.css

    api/
      health/
        route.ts

    assessment/
      start/
        page.tsx
      questions/
        page.tsx

    dashboard/
      page.tsx

    report/
      page.tsx
      ReportClient.tsx

  components/
    Navbar.tsx
    QuestionCard.tsx
    ReportSection.tsx
    ScoreCard.tsx

    ui/
      button.tsx
      card.tsx
      input.tsx
      label.tsx
      progress.tsx
      badge.tsx
      tabs.tsx
      table.tsx
      textarea.tsx
      select.tsx

  data/
    nistQuestions.ts

  docs/
    architecture.md
    runbook-vercel-deployment-failure.md
    incident-postmortem-sample.md

  lib/
    scoring.ts
    reportGenerator.ts
    pdfExport.ts

  public/
    auditready-logo.png

  scripts/
    check-health.sh

  Dockerfile
  .dockerignore
  README.md
```

---

## Pages

### Home Page

Introduces AuditReady AI and explains the product value.

### Start Assessment Page

Collects basic company profile information such as:

* Company name
* Industry
* Company size
* Cloud provider
* Sensitive data handling
* Health data handling
* Payment data handling
* Remote work
* Third-party vendors

### Questionnaire Page

Walks users through NIST CSF readiness questions with four answer options:

* Yes
* Partially
* No
* Not Applicable

### Report Page

Generates the compliance readiness report with scoring, gaps, evidence checklist, and remediation roadmap.

### Health Check Endpoint

Provides a simple application health response at:

```text
/api/health
```

Example response:

```json
{
  "status": "ok",
  "service": "AuditReady AI",
  "environment": "production",
  "timestamp": "2026-05-26T00:00:00.000Z"
}
```

---

## DevOps Documentation

The `docs/` folder contains reliability and troubleshooting documentation, including:

* Vercel deployment failure runbook
* Sample incident postmortem
* Architecture notes

These documents support operational readiness and demonstrate how deployment issues can be investigated, resolved, and documented.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/aaileenssyed/auditready-ai.git
cd auditready-ai
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

---

## Build

To create a production build:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

---

## GitHub Actions

This project uses GitHub Actions to validate the production build.

The CI workflow runs on:

* Push to `main` or `master`
* Pull requests to `main` or `master`
* Manual workflow dispatch

The workflow installs dependencies and runs:

```bash
npm run build
```

This helps catch build errors before deployment.

---

## Health Check Script

A Bash health check script is included in:

```text
scripts/check-health.sh
```

Run it with:

```bash
bash scripts/check-health.sh
```

Or pass a custom health endpoint:

```bash
bash scripts/check-health.sh https://auditready-ai-five.vercel.app/api/health
```

---

## Docker

This project includes a Dockerfile for local production-style testing.

Build the Docker image:

```bash
docker build -t auditready-ai .
```

Run the container:

```bash
docker run -p 3000:3000 auditready-ai
```

Open:

```text
http://localhost:3000
```

Note: Docker Desktop must be installed and running before using Docker commands.

---

## Deployment

This project is deployed using Vercel.

Deployment flow:

1. Push code to GitHub
2. GitHub Actions validates the production build
3. Vercel builds and deploys the app
4. The live app can be checked using `/api/health`

---

## Planned Framework Support

| Framework         | Status           |
| ----------------- | ---------------- |
| NIST CSF 2.0      | Available in MVP |
| CIS Controls v8.1 | Planned          |
| SOC 2             | Planned          |
| ISO 27001         | Planned          |
| HIPAA             | Planned          |
| PCI DSS           | Planned          |

---

## Roadmap

### Version 1.1

* Improve sample report mode
* Add more NIST CSF questions
* Add better mobile responsiveness
* Improve PDF formatting
* Add report timestamp
* Add stronger dashboard visuals

### Version 1.2

* Add control severity filters
* Add evidence status tracking
* Add downloadable CSV checklist
* Add risk priority sorting
* Add clearer scoring explanations

### Version 2.0

* Add CIS Controls mapping
* Add SOC 2 readiness mode
* Add framework comparison view
* Add saved assessments

### DevOps / Reliability Roadmap

* Improve live health check workflow
* Add architecture diagram
* Add deployment notes for Vercel
* Add AWS refresh lab notes
* Add Terraform basics later
* Add monitoring and logging notes

### Future Versions

* ISO 27001 readiness-lite
* HIPAA readiness-lite
* PCI DSS readiness-lite
* Supabase authentication
* Evidence upload tracker
* AI-generated executive summary
* AI policy recommendation assistant
* Organization-level report history

---

## Important Disclaimer

AuditReady AI is a readiness and educational tool.

It does not provide:

* Legal advice
* Formal audit certification
* Guaranteed compliance
* Official attestation
* Replacement for qualified security or compliance professionals

Organizations should consult qualified cybersecurity, legal, and compliance professionals before relying on any assessment for audit, certification, or regulatory purposes.

---

## Author

Built by **Aaileen Sarwar Syed & Rayyan Sarwar Syed**

Cybersecurity, IT Support, GRC, AI, and DevOps-focused portfolio project.

---

## License

This project is intended as a public portfolio and educational project.