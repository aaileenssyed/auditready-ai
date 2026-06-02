# Runbook: Vercel Deployment Failure

## Purpose

This runbook documents the steps to investigate and resolve failed production deployments for AuditReady AI.

## Scope

This applies when:

- Vercel deployment fails
- GitHub Actions build fails
- The production site does not update
- The app builds locally but fails in Vercel
- Build logs show TypeScript, dependency, routing, or configuration errors

## Symptoms

Common symptoms include:

- Vercel shows "Build Failed"
- GitHub Actions shows a red X
- `npm run build` fails
- A page fails during static generation
- TypeScript errors appear in production logs

## First Checks

1. Check the latest GitHub Actions workflow run.
2. Confirm the failing branch is `master` or `main`.
3. Open the Vercel deployment logs.
4. Identify the exact failed step:
   - dependency install
   - TypeScript
   - lint
   - production build
   - static page generation
5. Reproduce locally using:

```bash
npm run build