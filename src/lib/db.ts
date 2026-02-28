import { supabase } from './supabase';
import { Category, categories as localCategories, experiences as localExperiences, stats as localStats, testimonials as localTestimonials } from '../data/categories';
import { Villa, villas as localVillas } from '../data/villas';

export async function getCategories(): Promise<Category[]> {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('Database error fetching categories, falling back to local data:', error.message);
            return localCategories;
        }

        return data && data.length > 0 ? (data as Category[]) : localCategories;
    } catch (err) {
        console.error('Fetch caught error in getCategories:', err);
        return localCategories;
    }
}

export async function getVillas(): Promise<Villa[]> {
    try {
        const { data, error } = await supabase
            .from('villas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('Database error fetching villas, falling back to local data:', error.message);
            return localVillas;
        }

        if (!data || data.length === 0) return localVillas;

        return (data as any[]).map(v => ({
            ...v,
            maxGuests: v.max_guests || v.maxGuests
        })) as Villa[];
    } catch (err) {
        console.error('Fetch caught error in getVillas:', err);
        return localVillas;
    }
}

export async function getVillaBySlug(slug: string): Promise<Villa | null> {
    try {
        const { data, error } = await supabase
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
            maxGuests: data.max_guests || data.maxGuests
        } as Villa : (localVillas.find(v => v.slug === slug) || null);
    } catch (err) {
        return localVillas.find(v => v.slug === slug) || null;
    }
}

export async function getVillasByCategory(category: string): Promise<Villa[]> {
    try {
        if (category === 'all') return getVillas();

        const { data, error } = await supabase
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
            maxGuests: v.max_guests || v.maxGuests
        })) as Villa[];
    } catch (err) {
        return localVillas.filter(v => v.category === category);
    }
}

export async function getFeaturedVillas(): Promise<Villa[]> {
    try {
        const { data, error } = await supabase
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
            maxGuests: v.max_guests || v.maxGuests
        })) as Villa[];
    } catch (err) {
        return localVillas.filter(v => v.featured);
    }
}

export async function getExperiences(): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('Error fetching experiences, falling back to local:', error.message);
            return localExperiences;
        }

        return data && data.length > 0 ? data : localExperiences;
    } catch (err) {
        return localExperiences;
    }
}

export async function getStats(): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('stats')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('Error fetching stats, falling back to local:', error.message);
            return localStats;
        }

        return data && data.length > 0 ? data : localStats;
    } catch (err) {
        return localStats;
    }
}

export async function getTestimonials(): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn('Error fetching testimonials, falling back to local:', error.message);
            return localTestimonials;
        }

        return data && data.length > 0 ? data : localTestimonials;
    } catch (err) {
        return localTestimonials;
    }
}

