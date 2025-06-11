import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const FILE_PATH = path.resolve(process.cwd(), 'contact-submissions.json');

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Add timestamp
    const submission = { ...data, submittedAt: new Date().toISOString() };
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
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 });
  }
} 