import FORMS from "../../Form/Forms";

const ChangedPartForms = {
    add_changed_part: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "Diagram",
        place_holder: "Choose diagram"
    }, {
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "Part",
        place_holder: "Choose part"
    }]
};

export default ChangedPartForms;