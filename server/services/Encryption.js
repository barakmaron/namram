import crypto from 'crypto';

function Encrypt(data) {
    const { key, init_vector } = CreateAesKey();
    const cipher = crypto.createCipheriv("aes-256-gcm", key, init_vector);
    const encrypted_key = EncryptAesKeyWithRsa(key);
    let encrypted_data = cipher.update(data, "utf-8", "base64");
    encrypted_data += cipher.final("base64");
    const authTag = cipher.getAuthTag();
    return {
        key: encrypted_key,
        data: encrypted_data,
        iv: init_vector,
        authTag: authTag
    };

}

function EncryptAesKeyWithRsa(key) {
    const buffer = Buffer.from(key, "base64");
    return crypto.publicEncrypt({
        key: process.env.PUBLIC_RSA_KEY,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256"
    }, buffer);
}

function CreateAesKey() {
    const init_vector = crypto.randomBytes(12);
    const key = crypto.randomBytes(32);
    return {
        init_vector,
        key
    };
}

const Encryption = {
    Encrypt
};

export default Encryption;