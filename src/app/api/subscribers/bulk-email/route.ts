import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/db';
import { sendBulkUpdateEmail } from '@/lib/email';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { subject, message } = body;

        if (!subject || !message) {
            return NextResponse.json(
                { success: false, error: 'Subject and message are required' },
                { status: 400 }
            );
        }

        // Fetch all subscribers
        const subscribers = await getSubscribers();
        
        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No subscribers found to send emails to' },
                { status: 404 }
            );
        }

        const emails = subscribers.map(sub => sub.email).filter(Boolean);

        // Send bulk email
        const result = await sendBulkUpdateEmail(emails, subject, message);

        if (!result.success) {
             return NextResponse.json(
                { success: false, error: result.error || 'Failed to send bulk email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ 
            success: true, 
            message: `Bulk email sent successfully to ${emails.length} subscribers` 
        });
    } catch (error: any) {
        console.error('Bulk email route error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to process bulk email request' },
            { status: 500 }
        );
    }
}
