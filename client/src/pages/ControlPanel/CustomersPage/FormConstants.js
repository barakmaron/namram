import FORMS from "../../../components/Form/Forms";

const add_customer = [
    {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "FullName",
        place_holder: "שם מלא"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Address",
        place_holder: "כתובת"
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "PhoneNumber",
        place_holder: "מספר טלפון"
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "HomePhoneNumber",
        place_holder: "טלפון בבית"
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "Fax",
        place_holder: "פקס"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "IdNumber",
        place_holder: "מספר זהות"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "CompanyName",
        place_holder: "שם חברה"
    }];
export default add_customer;    