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

const add_rental_agreement= [{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "Location",
    place_holder: "מיקום עבודה של הכלי"
}, {
    type: FORMS.INPUTS_TYPES.RENT_TOOLS_SELECTOR,
    name: "Tools",
    place_holder: "כלים" 
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelAmount",
    place_holder: "כמות דלק"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelPrice",
    place_holder: "מחיר דלק"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportAmount",
    place_holder: "כמות הובלות"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportPrice",
    place_holder: "מחיר הובלות"
}, {
    type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
    name: "StartAgreementSignature",
    place_holder: "חתימה" 
}];

const RentalAgreementsForms = {
    add_rental_agreement: [ 
        ...add_customer, 
        ...add_rental_agreement 
    ],
    add_rental_agreement_old_customer: [
        {
            type: FORMS.INPUTS_TYPES.DATA_LIST,
            name: "Customer",
            place_holder: "בחר לקוח"
        }, 
        ...add_rental_agreement 
    ], 
    close_rental_agreement: [{
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelAmount",
        place_holder: "כמות דלק"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelPrice",
        place_holder: "מחיר דלק"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportAmount",
        place_holder: "כמות הובלות"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportPrice",
        place_holder: "מחיר הובלות"
    }, {
        type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
        name: "EndAgreementSignature",
        place_holder: "חתימה" 
    }]
};

export default RentalAgreementsForms;