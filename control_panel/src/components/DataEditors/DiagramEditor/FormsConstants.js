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
    }],
    connect_diagram: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "diagram_id",
        place_holder: "Chose diagram"
    }]
};


export default DiagramForms;