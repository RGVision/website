import { getTestimonials } from "@/lib/db";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();
    return <TestimonialsClient testimonials={testimonials} />;
}
