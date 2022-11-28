const ChangedPartSchema = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    },
    part_id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
    },
};


export default ChangedPartSchema;