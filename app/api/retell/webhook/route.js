/**
 * Retell AI Webhook Handler
 * Receives call events from Retell AI
 */

export async function GET(request) {
  console.log('📞 Retell Webhook Test (GET)');
  return Response.json({ success: true, message: 'Webhook endpoint is configured correctly' });
}

export async function OPTIONS(request) {
  return new Response(null, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { event, call_id, data } = body;

    console.log(`📞 Retell Webhook: ${event}`, { call_id, data });

    // Handle different events
    switch (event) {
      case 'call_started':
        console.log(`✅ Call started: ${call_id}`);
        break;

      case 'call_ended':
        console.log(`❌ Call ended: ${call_id}`, data.end_reason);
        break;

      case 'function_call':
        console.log(`⚙️ Function call: ${data.function_name}`, data.parameters);
        // Process function calls from Retell's LLM
        return handleFunctionCall(data);

      default:
        console.log(`Unknown event: ${event}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

function handleFunctionCall(data) {
  const { function_name, parameters } = data;

  // Process different function calls
  switch (function_name) {
    case 'lookup_patient':
      return Response.json({
        success: true,
        patient_id: 'patient_123',
        name: 'John Doe',
      });

    case 'get_available_slots':
      const slots = [
        { time: '2024-07-15 2:00 PM', provider: 'Dr. Smith' },
        { time: '2024-07-16 10:00 AM', provider: 'Dr. Johnson' },
        { time: '2024-07-17 3:30 PM', provider: 'Dr. Smith' },
      ];
      return Response.json({ success: true, slots });

    case 'book_appointment':
      return Response.json({
        success: true,
        appointment_id: 'appt_456',
        confirmation: 'Appointment booked successfully',
      });

    default:
      return Response.json(
        { error: `Unknown function: ${function_name}` },
        { status: 400 }
      );
  }
}
