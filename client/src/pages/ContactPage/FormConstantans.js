import FORMS from "../../components/Form/Forms";

const contact_inputs = [{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "full_name",
    place_holder: "שם מלא"
}, {
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "company_name",
    place_holder: "שם החברה"
}, {
    type: FORMS.INPUTS_TYPES.TEL,
    name: "phone_number",
    place_holder: "טלפון"
}, {
    type: FORMS.INPUTS_TYPES.EMAIL,
    name: "email",
    place_holder: "אימייל"
}, {
    type: FORMS.INPUTS_TYPES.TEXT_AREA,
    name: "text",
    place_holder: "מהות הפנייה"
}];

export default contact_inputs;