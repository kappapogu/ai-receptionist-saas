/**
 * Generate web call token for Retell Web SDK
 * POST /api/retell/web-call
 */

export async function POST(request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_RETELL_API_KEY?.trim();
    const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID?.trim();

    console.log('🔍 Env vars:', {
      apiKey: apiKey?.substring(0, 10) + '...',
      agentId: agentId,
      apiKeyLength: apiKey?.length,
      agentIdLength: agentId?.length,
    });

    if (!apiKey || !agentId) {
      return Response.json(
        { error: 'Retell not configured' },
        { status: 500 }
      );
    }

    // Create web call via Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Retell web call error:', error);
      return Response.json(
        { error: 'Failed to create web call', details: error },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Web call created:', data);

    return Response.json({
      success: true,
      access_token: data.access_token,
      call_id: data.call_id,
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
