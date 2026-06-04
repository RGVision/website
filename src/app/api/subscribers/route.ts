import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, mobile } = body;

        if (!name || !email || !mobile) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and mobile are required' },
                { status: 400 }
            );
        }

        await addSubscriber({ name, email, mobile });

        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    } catch (error: any) {
        console.error('Subscription error:', error);
        // Catch duplicate email error (usually Postgres code 23505)
        if (error.code === '23505' || error.message?.includes('duplicate')) {
             return NextResponse.json(
                { success: false, error: 'This email is already subscribed' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { success: false, error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        );
    }
}
