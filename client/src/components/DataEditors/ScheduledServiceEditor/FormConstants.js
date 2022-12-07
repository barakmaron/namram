import FORMS from "../../Form/Forms";

const ScheduledForms = {
    add_service: [{
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Name",
        place_holder: "Name"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "Scheduled",
        place_holder: "Number of days in rental before service"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT_AREA,
        name: "Text",
        place_holder: "Text"
    }]
};

export default ScheduledForms;