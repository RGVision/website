"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function createCategory(data: any) {
    const { error } = await supabase.from("categories").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function updateCategory(id: string, data: any) {
    const { error } = await supabase.from("categories").update(data).eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/admin/categories");
}

export async function createVilla(data: any) {
    const { error } = await supabase.from("villas").insert([data]);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/villas");
    revalidatePath("/admin/villas");
}

export async function updateVilla(slug: string, data: any) {
    const { error } = await supabase.from("villas").update(data).eq("slug", slug);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath(`/villas/${slug}`);
    revalidatePath("/admin/villas");
}

export async function deleteVilla(slug: string) {
    const { error } = await supabase.from("villas").delete().eq("slug", slug);
    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/villas");
    revalidatePath("/admin/villas");
}
