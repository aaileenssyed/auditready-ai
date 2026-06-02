#!/bin/bash

URL=${1:-"https://auditready-ai-five.vercel.app/api/health"}

echo "Checking AuditReady AI health endpoint..."
echo "URL: $URL"

STATUS_CODE=$(curl -s -o /tmp/auditready-health-response.txt -w "%{http_code}" "$URL")

if [ "$STATUS_CODE" = "200" ]; then
  echo "✅ Application is healthy."
  echo "Response:"
  cat /tmp/auditready-health-response.txt
  exit 0
else
  echo "❌ Health check failed."
  echo "HTTP status code: $STATUS_CODE"
  echo "Response:"
  cat /tmp/auditready-health-response.txt
  exit 1
fi