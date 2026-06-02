export async function GET() {
  return Response.json({
    status: "ok",
    service: "AuditReady AI",
    environment: process.env.NODE_ENV || "unknown",
    timestamp: new Date().toISOString(),
  });
}