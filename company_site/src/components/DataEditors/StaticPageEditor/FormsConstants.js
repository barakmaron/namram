import FORMS from "../../Form/Forms";

const StaticPageForms = {
    add_static_page_data: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "Category",
        place_holder: "Category"
    },  {
        type: FORMS.INPUTS_TYPES.CHECK_BOX,
        name: "DisplayType",
        place_holder: "Show as products"
    }]
};

export default StaticPageForms;