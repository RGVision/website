"use server";

import { adminSupabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function createCategory(data: any) {
    const { error } = await adminSupabase.from("categories").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function updateCategory(id: string, data: any) {
    const { error } = await adminSupabase.from("categories").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
    const { error } = await adminSupabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function createVilla(data: any) {
    const { error } = await adminSupabase.from("villas").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/villas");
    revalidatePath("/admin/villas");
}

export async function updateVilla(slug: string, data: any) {
    const { error } = await adminSupabase.from("villas").update(data).eq("slug", slug);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath(`/villas/${slug}`);
    revalidatePath("/admin/villas");
}

export async function deleteVilla(slug: string) {
    const { error } = await adminSupabase.from("villas").delete().eq("slug", slug);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/villas");
    revalidatePath("/admin/villas");
}

// Experiences Actions
export async function createExperience(data: any) {
    const { error } = await adminSupabase.from("experiences").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/experiences");
}

export async function updateExperience(id: string, data: any) {
    const { error } = await adminSupabase.from("experiences").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/experiences");
}

export async function deleteExperience(id: string) {
    const { error } = await adminSupabase.from("experiences").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/experiences");
}

// Stats Actions
export async function createStat(data: any) {
    const { error } = await adminSupabase.from("stats").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/stats");
}

export async function updateStat(id: string, data: any) {
    const { error } = await adminSupabase.from("stats").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/stats");
}

export async function deleteStat(id: string) {
    const { error } = await adminSupabase.from("stats").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/stats");
}

// Testimonials Actions
export async function createTestimonial(data: any) {
    const { error } = await adminSupabase.from("testimonials").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: any) {
    const { error } = await adminSupabase.from("testimonials").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    const { error } = await adminSupabase.from("testimonials").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}
