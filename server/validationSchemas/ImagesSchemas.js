const GetImageSchema = {    
    file_name: {
        notEmpty: true,
        type: "string",
        minLength: 10
    }
};

export default GetImageSchema;