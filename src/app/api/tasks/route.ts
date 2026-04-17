import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Prisma Error (GET):', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Prisma Error (POST):', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
