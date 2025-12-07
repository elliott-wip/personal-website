import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/authOptions';
import { getDatabase } from '@/lib/mongodb';
import { Belief, BeliefInput, toBeliefResponse } from '@/lib/models/belief';

// Helper to validate ObjectId
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

// GET /api/beliefs/[id] - Public, fetch single belief
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid belief ID' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const belief = await db
      .collection<Belief>('beliefs')
      .findOne({ _id: new ObjectId(id) });

    if (!belief) {
      return NextResponse.json(
        { error: 'Belief not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(toBeliefResponse(belief));
  } catch (error) {
    console.error('Error fetching belief:', error);
    return NextResponse.json(
      { error: 'Failed to fetch belief' },
      { status: 500 }
    );
  }
}

// PUT /api/beliefs/[id] - Protected, update belief
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid belief ID' },
        { status: 400 }
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
    
    const updateResult = await db
      .collection<Belief>('beliefs')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            message: body.message,
            type: body.type,
            date: now.toISOString().split('T')[0], // Update date to today
          },
        },
        { returnDocument: 'after' }
      );

    if (!updateResult) {
      return NextResponse.json(
        { error: 'Belief not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(toBeliefResponse(updateResult));
  } catch (error) {
    console.error('Error updating belief:', error);
    
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB credentials.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update belief' },
      { status: 500 }
    );
  }
}

// DELETE /api/beliefs/[id] - Protected, delete belief
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid belief ID' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const deleteResult = await db
      .collection<Belief>('beliefs')
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Belief not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Belief deleted successfully' });
  } catch (error) {
    console.error('Error deleting belief:', error);
    
    if (error instanceof Error && error.message.includes('authentication failed')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB credentials.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete belief' },
      { status: 500 }
    );
  }
}
