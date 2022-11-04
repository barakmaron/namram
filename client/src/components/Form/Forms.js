const INPUTS_TYPES = {
    TEXT: "text",
    PASSWORD: "password",
    TEXT_AREA: "textarea",
    FILE: "file",
    NUMBER: "number",
    EMAIL: "email",
    TEL: "tel",
    DATA_LIST: "data_list",
    DYNAMIC_INPUTS: "dynamic_inputs"
};


const contact_inputs = [{
    type: INPUTS_TYPES.TEXT,
    name: "full_name",
    place_holder: "שם מלא"
}, {
    type: INPUTS_TYPES.TEXT,
    name: "company_name",
    place_holder: "שם החברה"
}, {
    type: INPUTS_TYPES.TEL,
    name: "phone_number",
    place_holder: "טלפון"
}, {
    type: INPUTS_TYPES.EMAIL,
    name: "email",
    place_holder: "אימייל"
}, {
    type: INPUTS_TYPES.TEXT_AREA,
    name: "text",
    place_holder: "מהות הפנייה"
}];


const login_inputs = [{
    type: INPUTS_TYPES.EMAIL,
    name: "email",
    place_holder: "email"
}, {
    type: INPUTS_TYPES.PASSWORD,
    name: "password",
    place_holder: "password"
}];


const controlPanelForms = {
    add_category: [{
        type: INPUTS_TYPES.FILE,
        name: "image",
        place_holder: "Image"
    }, {
        type: INPUTS_TYPES.TEXT,
        name: "name",
        place_holder: "Name"
    }],
    delete_category: [{
        type: INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }],
    edit_category: [{
        type: INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: INPUTS_TYPES.TEXT,
        name: "name",
        place_holder: "Name"
    }],
    add_product: [{
        type: INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: INPUTS_TYPES.TEXT,
        name: "name",
        place_holder: "Name"
    }, {
        type: INPUTS_TYPES.TEXT,
        name: "serial_number",
        place_holder: "Serial Number"
    }, {
        type: INPUTS_TYPES.TEXT_AREA,
        name: "text",
        place_holder: "Description"
    }, {
        type: INPUTS_TYPES.FILE,
        name: "product_images",
        place_holder: "Images"
    }, {
        type: INPUTS_TYPES.DYNAMIC_INPUTS,
        name: "add_props",
        place_holder: "Add Props"
    }],
    delete_product: [{
        type: INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: INPUTS_TYPES.DATA_LIST,
        name: "product",
        place_holder: "Choose product"
    }]
};

const controlPanelFormsExtend = {
    add_sale_product: [ ...controlPanelForms.add_product, {
        type: INPUTS_TYPES.NUMBER,
        name: "price",
        place_holder: "Price"
    }]
};



const FORMS = {
    INPUTS_TYPES,
    contact_inputs,
    login_inputs,
    controlPanelForms,
    controlPanelFormsExtend
};

export default FORMS;