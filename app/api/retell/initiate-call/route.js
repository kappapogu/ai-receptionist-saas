/**
 * Initiate a call with Retell AI
 * POST /api/retell/initiate-call
 */

export async function POST(request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return Response.json(
        { error: 'Phone number required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_RETELL_API_KEY;
    const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

    if (!apiKey || !agentId) {
      return Response.json(
        {
          error: 'Retell AI not configured. Set NEXT_PUBLIC_RETELL_API_KEY and NEXT_PUBLIC_RETELL_AGENT_ID',
          configured: false
        },
        { status: 500 }
      );
    }

    // Call Retell API to initiate call
    // User's phone number calls TO the Retell AI number
    const response = await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        from_number: phoneNumber, // User's phone number (who is calling)
        to_number: process.env.NEXT_PUBLIC_RETELL_FROM_NUMBER || '+14847465311', // Retell AI number (who is being called)
        custom_data: {
          source: 'website_demo',
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Retell API error:', {
        status: response.status,
        error: error,
        request: {
          agent_id: agentId,
          from_number: phoneNumber,
          to_number: process.env.NEXT_PUBLIC_RETELL_FROM_NUMBER || '+14847465311',
        }
      });
      return Response.json(
        {
          error: 'Failed to initiate call',
          details: error,
          status: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Call initiated:', data);

    return Response.json({
      success: true,
      call_id: data.call_id,
      message: 'Call initiated successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
