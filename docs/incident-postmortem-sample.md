# Incident Postmortem: Failed Production Deployment

## Summary

A production deployment for AuditReady AI failed after a code change caused the Next.js production build to fail during static page generation.

## Date

Example incident for DevOps/SRE documentation practice.

## Impact

The live production application remained available, but the latest version of the app was not deployed.

Users were not affected on the existing production version. The impact was limited to release delay.

## Detection

The issue was detected through:

- Vercel deployment logs
- GitHub Actions CI status
- Local `npm run build` validation

## Root Cause

The deployment failed because the production build encountered a page-rendering issue in the Next.js app.

The issue was related to client-side behavior being used in a way that affected static page generation.

## Resolution

1. Reviewed Vercel build logs.
2. Identified the failing route.
3. Reproduced the issue locally with:

```bash
npm run build