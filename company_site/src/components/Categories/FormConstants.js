import FORMS from "../Form/Forms";

const CategoriesForms = {
    add_category: [{
        type: FORMS.INPUTS_TYPES.FILE,
        name: "Image",
        place_holder: "Image"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "name",
        place_holder: "Name"
    }],
    delete_category: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }],
    edit_category: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "name",
        place_holder: "Name"
    }]
};

export default CategoriesForms;