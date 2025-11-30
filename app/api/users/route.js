import { query } from '../../../lib/database';
import { NextResponse } from 'next/server';

// GET all users
export async function GET() {
  try {
    const users = await query('SELECT * FROM users ORDER BY id DESC');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST new user
export async function POST(request) {
  try {
    const { name, email } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    return NextResponse.json(
      { message: 'User created successfully', id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}