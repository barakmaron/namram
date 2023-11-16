import FORMS from "../../../components/Form/Forms";

const ServiceReportForms = {
    add_tool_to_service: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "Category",
        place_holder: "Choose category"
    }, {
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "Product",
        place_holder: "Choose product"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT_AREA,
        name: "Problem",
        place_holder: "Describe problem"
    }]
};

export default ServiceReportForms;