import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE_PATH = path.resolve(process.cwd(), 'itinerary-requests.json');

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    const { name, email, destination, travelDates, travelers, interests } = data;
    if (!name || !email || !destination || !travelDates || !travelers || !interests) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Add timestamp and request ID
    const submission = { 
      ...data, 
      submittedAt: new Date().toISOString(),
      requestId: `ITN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending'
    };
    
    let submissions = [];
    try {
      const file = await fs.readFile(FILE_PATH, 'utf8');
      submissions = JSON.parse(file);
    } catch {
      // File may not exist yet
      submissions = [];
    }
    
    submissions.push(submission);
    await fs.writeFile(FILE_PATH, JSON.stringify(submissions, null, 2), 'utf8');
    
    return NextResponse.json({ 
      success: true, 
      requestId: submission.requestId,
      message: 'Your itinerary request has been received! We\'ll get back to you within 24 hours.' 
    });
  } catch (error) {
    console.error('Itinerary request error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
} 