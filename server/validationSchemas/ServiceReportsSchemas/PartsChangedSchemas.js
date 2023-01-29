import ErrorMessages from "../ErrorMessages.js";

const ChangedPartSchema = {    
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
    part_id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        minLength: 36,
    },
};


export default ChangedPartSchema;