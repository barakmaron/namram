import crypto from 'crypto';

export default function Decrypt(encrypted_data) {
    const { key, data, iv, authTag } = encrypted_data;
    const iv_buffer = Buffer.from(iv, 'base64');
    const authTag_buffer = Buffer.from(authTag, 'base64');
    const decrypt_key = DecryptAesKeyWithRsa(key);
    const decipher = crypto.createDecipheriv("aes-256-gcm", decrypt_key, iv_buffer);
    decipher.setAuthTag(authTag_buffer, "base64");
    let decrypted_data = decipher.update(data, "base64", "utf-8");
    decrypted_data.concat(decipher.final("utf-8"));
    return decrypted_data;
}
    
    
function DecryptAesKeyWithRsa(key) {
    const buffer = Buffer.from(key, "base64");
    return crypto.privateDecrypt({
        key: process.env.PRIVATE_RSA_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, buffer);
}