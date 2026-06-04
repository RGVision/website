import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

// Create a 32-byte key from the AUTH_SECRET or a fallback
const getKey = () => {
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'default-fallback-secret-for-encryption';
    return crypto.createHash('sha256').update(String(secret)).digest();
};

export function encrypt(text: string): string {
    if (!text) return text;
    try {
        // Use a deterministic IV based on the text itself so the same text encrypts to the same value.
        // This is necessary to preserve database UNIQUE constraints (e.g. for emails).
        const iv = crypto.createHash('md5').update(text).digest();
        const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag().toString('hex');
        // Prefix with 'enc:' so we can identify encrypted data
        return `enc:${iv.toString('hex')}:${encrypted}:${authTag}`;
    } catch (error) {
        console.error("Encryption error:", error);
        return text;
    }
}

export function decrypt(text: string): string {
    if (!text || !text.startsWith('enc:')) return text;
    
    try {
        const parts = text.split(':');
        if (parts.length !== 4) return text; 
        
        const [, ivHex, encryptedHex, authTagHex] = parts;
        const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivHex, 'hex'));
        decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
        
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error("Decryption error:", error);
        return text; 
    }
}
