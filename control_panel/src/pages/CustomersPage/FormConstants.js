import FORMS from "../../components/Form/Forms";
import { fullNameTitle, phoneNumberTitle, homePhoneNumberTitle, faxNumberTitle, idNumberTitle, addressTitle, companyNameTitle } from "../../strings";

const add_customer = [
    {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "FullName",
        place_holder: fullNameTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "Address",
        place_holder: addressTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "PhoneNumber",
        place_holder: phoneNumberTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "HomePhoneNumber",
        place_holder: homePhoneNumberTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEL,
        name: "Fax",
        place_holder: faxNumberTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "IdNumber",
        place_holder: idNumberTitle
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "CompanyName",
        place_holder: companyNameTitle
    }];
export default add_customer;    