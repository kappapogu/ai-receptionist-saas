/**
 * Check Retell AI integration status
 * GET /api/retell/status
 */

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_RETELL_API_KEY;
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  const configured = !!apiKey && !!agentId;

  return Response.json({
    configured,
    hasApiKey: !!apiKey,
    hasAgentId: !!agentId,
    apiKeyStatus: apiKey ? '✓ Set' : '✗ Not set',
    agentIdStatus: agentId ? '✓ Set' : '✗ Not set',
    message: configured
      ? 'Retell AI is configured and ready'
      : 'Retell AI is not fully configured',
  });
}
