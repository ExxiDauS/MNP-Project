import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Request body received from client:', body);
    
    // Forward the request to the actual backend API
    const apiEndpoint = 'http://localhost:5000/api/users/sign-up';
    console.log(`Sending data to endpoint: ${apiEndpoint}`);
    console.log('JSON data being sent:', JSON.stringify(body, null, 2));
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Get the response from the backend
    const data = await response.json();
    console.log('Response received from backend:', data);
    
    // If the backend response is not ok, return the error
    if (!response.ok) {
      console.error('Error from backend:', data.message || 'Failed to sign up');
      return NextResponse.json(
        { message: data.message || 'Failed to sign up' },
        { status: response.status }
      );
    }
    
    // Return success response
    console.log('Sign-up successful, returning data to client');
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error during sign-up process:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}