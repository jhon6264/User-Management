import { query } from '../../../../lib/database';
import { NextResponse } from 'next/server';

// PUT update user
export async function PUT(request, { params }) {
  try {
    // FIX: Add await for params
    const { id } = await params;
    console.log('Updating user ID:', id);
    
    const { name, email } = await request.json();
    console.log('Update data:', { name, email });
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // FIX: Ensure id is not undefined
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, parseInt(id)]  // FIX: Convert to number
    );
    
    console.log('Update result:', result);
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(request, { params }) {
  try {
    // FIX: Add await for params
    const { id } = await params;
    console.log('Deleting user ID:', id);

    // FIX: Ensure id is not undefined
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const result = await query('DELETE FROM users WHERE id = ?', [parseInt(id)]);  // FIX: Convert to number
    console.log('Delete result:', result);
    
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}