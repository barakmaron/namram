import FORMS from "../../Form/Forms";

const DiagramForms = {
    add_diagram: [{
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "model_name",
        place_holder: "Model Name"
    }, {
        type: FORMS.INPUTS_TYPES.FILE,
        name: "Image",
        place_holder: "Image"
    }]
};


export default DiagramForms;