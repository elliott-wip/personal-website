import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getDatabase } from '@/lib/mongodb';
import { Belief, BeliefInput, toBeliefResponse } from '@/lib/models/belief';

// GET /api/beliefs - Public, returns all beliefs
export async function GET() {
  try {
    const db = await getDatabase();
    const beliefs = await db
      .collection<Belief>('beliefs')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(beliefs.map(toBeliefResponse));
  } catch (error) {
    console.error('Error fetching beliefs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beliefs' },
      { status: 500 }
    );
  }
}

// POST /api/beliefs - Protected, requires authentication
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: BeliefInput = await request.json();

    // Validate input
    if (!body.message || !body.type) {
      return NextResponse.json(
        { error: 'Message and type are required' },
        { status: 400 }
      );
    }

    if (!['principle', 'discovery'].includes(body.type)) {
      return NextResponse.json(
        { error: 'Type must be either "principle" or "discovery"' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const now = new Date();
    
    const belief: Omit<Belief, '_id'> = {
      message: body.message,
      type: body.type,
      date: now.toISOString().split('T')[0], // YYYY-MM-DD format
      createdAt: now,
    };

    const result = await db.collection<Belief>('beliefs').insertOne(belief as Belief);

    return NextResponse.json(
      toBeliefResponse({ ...belief, _id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating belief:', error);
    
    // Check if it's a MongoDB connection error
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB credentials.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create belief' },
      { status: 500 }
    );
  }
}
