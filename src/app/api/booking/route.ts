import { NextResponse, NextRequest } from "next/server";
import { sendBookingEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, villaName, checkIn, checkOut, guests, specialRequests } = body;

        if (!name || !email || !phone || !villaName || !checkIn || !checkOut) {
            return NextResponse.json({ success: false, message: "All required fields must be filled." }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, message: "Please provide a valid email address." }, { status: 400 });
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            return NextResponse.json({ success: false, message: "Check-out date must be after check-in date." }, { status: 400 });
        }

        const result = await sendBookingEmail({
            name, email, phone, villaName, checkIn, checkOut,
            guests: guests || 2,
            specialRequests: specialRequests || "",
        });

        return NextResponse.json({ success: true, message: "Booking request sent successfully!", dev: result.dev || false });
    } catch (error) {
        console.error("Booking API error:", error);
        return NextResponse.json({ success: false, message: "An error occurred. Please try again." }, { status: 500 });
    }
}
