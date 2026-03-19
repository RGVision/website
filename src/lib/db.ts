import { adminSupabase } from './supabase';
import { Category, categories as localCategories, experiences as localExperiences, stats as localStats, testimonials as localTestimonials } from '../data/categories';
import { Villa, villas as localVillas } from '../data/villas';

export async function getCategories(): Promise<Category[]> {
    try {
        const { data, error } = await adminSupabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('⚠️ Supabase Category Fetch Error:', error.message);
            return localCategories;
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No categories found in DB, using local static data.');
            return localCategories;
        }

        return data as Category[];
    } catch (err) {
        console.error('❌ Critical Catch in getCategories:', err);
        return localCategories;
    }
}

export async function getVillas(): Promise<Villa[]> {
    try {
        const { data, error } = await adminSupabase
            .from('villas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('⚠️ Supabase Villas Fetch Error:', error.message);
            return localVillas;
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No villas found in DB, using local static data.');
            return localVillas;
        }

        return (data as any[]).map(v => ({
            ...v,
            maxGuests: v.max_guests ?? v.maxGuests,
            rating: v.rating ?? 5.0,
            reviews: v.reviews ?? 0
        })) as Villa[];
    } catch (err) {
        console.error('❌ Critical Catch in getVillas:', err);
        return localVillas;
    }
}

export async function getVillaBySlug(slug: string): Promise<Villa | null> {
    try {
        const { data, error } = await adminSupabase
            .from('villas')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) {
            console.warn(`Error fetching villa ${slug}, falling back to local data:`, error.message);
            return localVillas.find(v => v.slug === slug) || null;
        }

        return data ? {
            ...data,
            maxGuests: data.max_guests ?? data.maxGuests,
            rating: data.rating ?? 5.0,
            reviews: data.reviews ?? 0
        } as Villa : (localVillas.find(v => v.slug === slug) || null);
    } catch (err) {
        return localVillas.find(v => v.slug === slug) || null;
    }
}

export async function getVillasByCategory(category: string): Promise<Villa[]> {
    try {
        if (category === 'all') return getVillas();

        const { data, error } = await adminSupabase
            .from('villas')
            .select('*')
            .eq('category', category)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn(`Error fetching villas for ${category}, falling back to local:`, error.message);
            return localVillas.filter(v => v.category === category);
        }

        if (!data || data.length === 0) return localVillas.filter(v => v.category === category);

        return (data as any[]).map(v => ({
            ...v,
            maxGuests: v.max_guests ?? v.maxGuests,
            rating: v.rating ?? 5.0,
            reviews: v.reviews ?? 0
        })) as Villa[];
    } catch (err) {
        return localVillas.filter(v => v.category === category);
    }
}

export async function getFeaturedVillas(): Promise<Villa[]> {
    try {
        const { data, error } = await adminSupabase
            .from('villas')
            .select('*')
            .eq('featured', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('Error fetching featured villas, falling back to local:', error.message);
            return localVillas.filter(v => v.featured);
        }

        if (!data || data.length === 0) return localVillas.filter(v => v.featured);

        return (data as any[]).map(v => ({
            ...v,
            maxGuests: v.max_guests ?? v.maxGuests,
            rating: v.rating ?? 5.0,
            reviews: v.reviews ?? 0
        })) as Villa[];
    } catch (err) {
        return localVillas.filter(v => v.featured);
    }
}

export async function getExperiences(): Promise<any[]> {
    try {
        const { data, error } = await adminSupabase
            .from('experiences')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('⚠️ Supabase Experiences Fetch Error:', error.message);
            return localExperiences;
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No experiences found in DB, using local static data.');
            return localExperiences;
        }

        return data;
    } catch (err) {
        console.error('❌ Critical Catch in getExperiences:', err);
        return localExperiences;
    }
}

export async function getStats(): Promise<any[] | null> {
    try {
        const { data, error } = await adminSupabase
            .from('stats')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('⚠️ Supabase Stats Fetch Error:', error.message);
            return null;
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No stats found in DB.');
            return null;
        }

        return data;
    } catch (err) {
        console.error('❌ Critical Catch in getStats:', err);
        return null;
    }
}

export async function getTestimonials(): Promise<any[]> {
    try {
        const { data, error } = await adminSupabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('⚠️ Supabase Testimonials Fetch Error:', error.message);
            return localTestimonials;
        }

        if (!data || data.length === 0) {
            console.log('ℹ️ No testimonials found in DB, using local static data.');
            return localTestimonials;
        }

        return data;
    } catch (err) {
        console.error('❌ Critical Catch in getTestimonials:', err);
        return localTestimonials;
    }
}

