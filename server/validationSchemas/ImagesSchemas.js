import ErrorMessages from "./ErrorMessages.js";

const GetImageSchema = {    
    file_name: {
        isLength: {
            options: { 
                min: 5
            }
        },
        errorMessage: ErrorMessages.id,
    }
};

export default GetImageSchema;