import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const result = await sendContactEmail(data);
        
        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
        }
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
