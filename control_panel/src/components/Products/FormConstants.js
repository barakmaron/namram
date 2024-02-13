import FORMS from "../Form/Forms";

const ProductForms = {
    add_product: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Name",
        place_holder: "Name"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "SerialNumber",
        place_holder: "Serial Number"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT_AREA,
        name: "Text",
        place_holder: "Description"
    }, {
        type: FORMS.INPUTS_TYPES.FILE,
        name: "Image",
        place_holder: "Images"
    }, {
        type: FORMS.INPUTS_TYPES.DYNAMIC_INPUTS,
        name: "add_props",
        place_holder: "Add Props"
    }],
    delete_product: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "product",
        place_holder: "Choose product"
    }],
    changeCategoryForProduct: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "oldCategory",
        place_holder: "Choose Old Category"
    }, {
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "product",
        place_holder: "Choose product"
    },{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "newCategory",
        place_holder: "Choose New Category"
    }]
};

const ProductFormsExtended = {
    add_sale_product: [ 
        ...ProductForms.add_product, 
        {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "Price",
        place_holder: "Price"
    }],
    add_rent_product:[ 
        ...ProductForms.add_product, 
        {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "HourClock",
        place_holder: "Number of working hours"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Identifier",
        place_holder: "Identifier"
    }, {
        type: FORMS.INPUTS_TYPES.CHECK_BOX,
        name: "Display",
        place_holder: "To display this tool on site?"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "DayPrice",
        place_holder: "Day Price"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "WeekPrice",
        place_holder: "Week Price"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "MonthPrice",
        place_holder: "Month Price"
    }]
}

const allProductForms = {
    ...ProductForms,
    ...ProductFormsExtended
};

export default allProductForms;