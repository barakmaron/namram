export async function objectUrlToBase64(objectUrl) {
    try {
        const response = await fetch(objectUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const blob = await response.blob();
        const base64data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        return base64data;
    } catch (error) {
        console.error('Error converting object URL to base64:', error);
        throw error;
    }
}

export function fileToObjectUrl(file) {
    return URL.createObjectURL(file);
}