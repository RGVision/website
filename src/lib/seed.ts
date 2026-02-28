import { categories, experiences, stats, testimonials } from '../data/categories';
import { villas } from '../data/villas';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('Seeding categories...');
    const { error: catError } = await supabase
        .from('categories')
        .upsert(categories.map(c => ({
            id: c.id,
            label: c.label,
            icon: c.icon
        })));

    if (catError) {
        console.error('Error seeding categories:', catError);
    }

    console.log('Seeding villas...');
    const { error: villaError } = await supabase
        .from('villas')
        .upsert(villas.map(v => ({
            slug: v.slug,
            name: v.name,
            location: v.location,
            price: v.price,
            rating: v.rating,
            reviews: v.reviews,
            bedrooms: v.bedrooms,
            bathrooms: v.bathrooms,
            max_guests: v.maxGuests,
            area: v.area,
            images: v.images,
            amenities: v.amenities,
            description: v.description,
            category: v.category,
            featured: v.featured,
            tag: v.tag
        })));

    if (villaError) {
        console.error('Error seeding villas:', villaError);
    }

    console.log('Seeding experiences...');
    const { error: expError } = await supabase
        .from('experiences')
        .upsert(experiences.map(e => ({
            title: e.title,
            subtitle: e.subtitle,
            image: e.image,
            icon: e.icon
        })));

    if (expError) {
        console.error('Error seeding experiences:', expError);
    }

    console.log('Seeding stats...');
    const { error: statError } = await supabase
        .from('stats')
        .upsert(stats.map(s => ({
            number: s.number,
            suffix: s.suffix,
            label: s.label
        })));

    if (statError) {
        console.error('Error seeding stats:', statError);
    }

    console.log('Seeding testimonials...');
    const { error: testError } = await supabase
        .from('testimonials')
        .upsert(testimonials.map(t => ({
            name: t.name,
            avatar: t.avatar,
            rating: t.rating,
            text: t.text,
            location: t.location
        })));

    if (testError) {
        console.error('Error seeding testimonials:', testError);
    }

    console.log('Seed completed successfully!');
}

seed();
