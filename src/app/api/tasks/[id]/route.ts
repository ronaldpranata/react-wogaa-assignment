import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
    // Fetch current state to toggle
    const currentTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        completed: !currentTask.completed,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Prisma Error (PATCH):', error);
    return NextResponse.json({ error: 'Failed to toggle task' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
    await prisma.task.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Prisma Error (DELETE):', error);
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
