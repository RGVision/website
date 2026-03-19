"use server";

import { adminSupabase } from './supabase';

export async function ensureBucketExists(bucketName: string) {
    const { data: buckets, error: listError } = await adminSupabase.storage.listBuckets();
    
    if (listError) {
        console.error('Error listing buckets:', listError);
        return false;
    }

    const exists = buckets.some(b => b.name === bucketName);
    
    if (!exists) {
        const { error: createError } = await adminSupabase.storage.createBucket(bucketName, {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
            fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
            console.error(`Error creating bucket ${bucketName}:`, createError);
            return false;
        }
        console.log(`Bucket ${bucketName} created successfully.`);
    }
    
    return true;
}

export async function uploadImage(formData: FormData, bucketName: string = 'villas') {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const urls = await uploadImagesInternal([file], bucketName);
    return urls[0];
}

export async function uploadImages(formData: FormData, bucketName: string = 'villas') {
    const files = formData.getAll('files') as File[];
    if (!files || files.length === 0) throw new Error('No files provided');

    return await uploadImagesInternal(files, bucketName);
}

async function uploadImagesInternal(files: File[], bucketName: string) {
    await ensureBucketExists(bucketName);
    
    const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await adminSupabase.storage
            .from(bucketName)
            .upload(filePath, file, {
                upsert: false,
                contentType: file.type
            });

        if (error) {
            console.error(`Error uploading ${file.name}:`, error);
            throw error;
        }

        const { data: { publicUrl } } = adminSupabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return publicUrl;
    });

    return await Promise.all(uploadPromises);
}
