import FORMS from "../../../components/Form/Forms";

const CreateReportsForms = {
    product_gain_loss_form: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }, {
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "product",
        place_holder: "Choose product"
    }],
    category_gain_loss_form: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "category",
        place_holder: "Choose category"
    }],
    errors: {
        NO_PARAMETER: "לא הוגדר פרמטר לחיפוש",
        NO_PARAMETER_END_DATE: "לא הוגדר תאריך סיום"
    }
};

export default CreateReportsForms;