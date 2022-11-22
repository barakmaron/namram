import FORMS from "../../Form/Forms";

const DiagramForms = {
    add_diagram: [{
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "model_name",
        place_holder: "Model Name"
    }, {
        type: FORMS.INPUTS_TYPES.FILE,
        name: "image",
        place_holder: "image"
    }]
};


export default DiagramForms;