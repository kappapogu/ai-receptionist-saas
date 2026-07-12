/**
 * Retell AI Webhook Handler
 * Receives call events and function calls from Retell AI
 * POST https://ai-receptionist-saas.vercel.app/api/retell/webhook
 */

export async function GET(request) {
  console.log('✅ Webhook endpoint is active');
  return Response.json({
    success: true,
    message: 'Retell webhook endpoint configured',
    endpoint: '/api/retell/webhook',
  });
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { event, call_id, data } = body;

    console.log(`📞 [${new Date().toISOString()}] Webhook Event: ${event}`, {
      call_id,
      function: data?.function_name,
    });

    // Handle different event types
    switch (event) {
      case 'call_started':
        return handleCallStarted(call_id, data);

      case 'call_ended':
        return handleCallEnded(call_id, data);

      case 'function_call':
        return handleFunctionCall(data);

      case 'transcript_opened':
      case 'transcript_closed':
        console.log(`ℹ️ Transcript ${event}: ${call_id}`);
        return Response.json({ success: true });

      default:
        console.log(`⚠️ Unknown event type: ${event}`);
        return Response.json({ success: true });
    }
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return Response.json(
      {
        error: 'Webhook processing failed',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

function handleCallStarted(call_id, data) {
  console.log(`✅ Call started: ${call_id}`);
  // Could log to database, trigger notifications, etc.
  return Response.json({ success: true });
}

function handleCallEnded(call_id, data) {
  const { end_reason, duration_ms } = data || {};
  console.log(`❌ Call ended: ${call_id}`, {
    reason: end_reason,
    duration: `${Math.round(duration_ms / 1000)}s`,
  });
  // Could log to database, send emails, etc.
  return Response.json({ success: true });
}

function handleFunctionCall(data) {
  const { function_name, parameters } = data;

  console.log(`⚙️ Function call: ${function_name}`, parameters);

  try {
    // Handle different functions based on function_name
    switch (function_name) {
      case 'lookup_patient':
        return handleLookupPatient(parameters);

      case 'create_patient':
        return handleCreatePatient(parameters);

      case 'get_available_slots':
        return handleGetAvailableSlots(parameters);

      case 'book_appointment':
        return handleBookAppointment(parameters);

      default:
        return Response.json(
          { error: `Unknown function: ${function_name}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error(`Error handling ${function_name}:`, error);
    return Response.json(
      { error: `Failed to execute ${function_name}` },
      { status: 500 }
    );
  }
}

function handleLookupPatient(parameters) {
  const { phone_number, email } = parameters || {};

  // TODO: Replace with actual database lookup
  const mockPatients = {
    '5551234567': {
      patient_id: 'pat_001',
      name: 'John Doe',
      phone: '555-123-4567',
      email: 'john@example.com',
      last_visit: '2024-06-15',
    },
    'john@example.com': {
      patient_id: 'pat_001',
      name: 'John Doe',
      phone: '555-123-4567',
      email: 'john@example.com',
      last_visit: '2024-06-15',
    },
  };

  const patient = mockPatients[phone_number] || mockPatients[email];

  if (patient) {
    console.log(`✅ Patient found: ${patient.name}`);
    return Response.json({
      success: true,
      patient_id: patient.patient_id,
      name: patient.name,
      email: patient.email,
      last_visit: patient.last_visit,
    });
  } else {
    console.log(`ℹ️ Patient not found: ${phone_number || email}`);
    return Response.json({
      success: false,
      error: 'Patient not found',
    });
  }
}

function handleCreatePatient(parameters) {
  const { name, phone_number, email, service_type } = parameters || {};

  // TODO: Replace with actual database insert
  const newPatient = {
    patient_id: 'pat_' + Date.now(),
    name,
    phone: phone_number,
    email,
    created_at: new Date().toISOString(),
  };

  console.log(`✅ Patient created: ${newPatient.patient_id}`);

  return Response.json({
    success: true,
    patient_id: newPatient.patient_id,
    message: `Patient ${name} has been created`,
  });
}

function handleGetAvailableSlots(parameters) {
  const { date, provider } = parameters || {};

  // TODO: Replace with actual calendar/availability lookup
  const availableSlots = [
    {
      time: '2024-07-15 10:00 AM',
      provider: 'Dr. Smith',
      duration_minutes: 30,
    },
    {
      time: '2024-07-15 2:00 PM',
      provider: 'Dr. Smith',
      duration_minutes: 30,
    },
    {
      time: '2024-07-16 9:30 AM',
      provider: 'Dr. Johnson',
      duration_minutes: 30,
    },
    {
      time: '2024-07-16 3:30 PM',
      provider: 'Dr. Johnson',
      duration_minutes: 30,
    },
  ];

  console.log(`✅ Retrieved ${availableSlots.length} available slots`);

  return Response.json({
    success: true,
    available_slots: availableSlots,
    count: availableSlots.length,
  });
}

function handleBookAppointment(parameters) {
  const { patient_id, appointment_time, provider, service_type } =
    parameters || {};

  // TODO: Replace with actual database update
  const appointment = {
    appointment_id: 'appt_' + Date.now(),
    patient_id,
    time: appointment_time,
    provider,
    service_type,
    status: 'confirmed',
    confirmation_number: 'APPT' + Math.random().toString(36).substring(7).toUpperCase(),
  };

  console.log(
    `✅ Appointment booked: ${appointment.appointment_id} - ${appointment_time}`
  );

  return Response.json({
    success: true,
    appointment_id: appointment.appointment_id,
    confirmation_number: appointment.confirmation_number,
    time: appointment_time,
    provider,
    message: `Your appointment with ${provider} is confirmed for ${appointment_time}`,
  });
}
