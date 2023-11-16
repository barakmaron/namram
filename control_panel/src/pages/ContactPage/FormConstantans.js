import FORMS from "../../components/Form/Forms";
import { companyNameTitle, fullNameTitle, phoneNumberTitle } from "../../strings";

const contact_inputs = [{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "full_name",
    place_holder: fullNameTitle
}, {
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "company_name",
    place_holder: companyNameTitle
}, {
    type: FORMS.INPUTS_TYPES.TEL,
    name: "phone_number",
    place_holder: phoneNumberTitle
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