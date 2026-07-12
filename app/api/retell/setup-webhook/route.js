/**
 * Setup Retell Webhook
 * POST /api/retell/setup-webhook
 * Configures the webhook in your Retell account
 */

export async function POST(request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_RETELL_API_KEY?.trim();
    const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID?.trim();

    if (!apiKey || !agentId) {
      return Response.json(
        { error: 'Retell credentials not configured' },
        { status: 500 }
      );
    }

    const webhookUrl = 'https://ai-receptionist-saas-seven.vercel.app/api/retell/webhook';

    console.log('🔧 Setting up webhook for agent:', agentId);

    // Configure webhook in Retell
    const response = await fetch(
      `https://api.retellai.com/v2/update-agent/${agentId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhook_url: webhookUrl,
          webhook_events: ['call_started', 'call_ended', 'function_call'],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to configure webhook:', error);
      return Response.json(
        {
          error: 'Failed to configure webhook',
          details: error,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Webhook configured successfully');

    return Response.json({
      success: true,
      message: 'Webhook configured successfully',
      webhook_url: webhookUrl,
      webhook_events: ['call_started', 'call_ended', 'function_call'],
      agent_id: agentId,
    });
  } catch (error) {
    console.error('Error setting up webhook:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  return Response.json({
    message: 'POST to this endpoint to setup webhook',
    endpoint: '/api/retell/setup-webhook',
    method: 'POST',
  });
}
