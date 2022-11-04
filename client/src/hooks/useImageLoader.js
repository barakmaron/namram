import { useState, useCallback, useEffect } from "react";
import { StaticFileLoader } from "../services/ApiService";

const useImageLoader = (Image, TempUrl) => {
    const [isLoading, setLoading] = useState(true);
    const [image_obj, setImageObj] = useState(null);

    const image_loader = useCallback(async() => {
        setLoading(true);
        const image_loader = TempUrl ? TempUrl : await StaticFileLoader(Image, 'images');
        setImageObj(TempUrl ? TempUrl : URL.createObjectURL(image_loader));
        setLoading(false);
    }, [Image, TempUrl]);

    useEffect(() => {        
        image_loader();
    }, []);


    return [isLoading, image_obj];
};

export default useImageLoader;