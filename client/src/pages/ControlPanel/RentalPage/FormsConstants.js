import FORMS from "../../../components/Form/Forms";

const add_customer = [
{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "FullName",
    place_holder: "Full Name"
}, {
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "Address",
    place_holder: "Address"
}, {
    type: FORMS.INPUTS_TYPES.TEL,
    name: "PhoneNumber",
    place_holder: "Phone Number"
}, {
    type: FORMS.INPUTS_TYPES.TEL,
    name: "HomePhoneNumber",
    place_holder: "Home Phone Number"
}, {
    type: FORMS.INPUTS_TYPES.TEL,
    name: "Fax",
    place_holder: "Fax"
}, {
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "IdNumber",
    place_holder: "Id Number"
}, {
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "CompanyName",
    place_holder: "Company Name"
}];

const add_rental_agreement= [{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "Location",
    place_holder: "Location"
}, {
    type: FORMS.INPUTS_TYPES.RENT_TOOLS_SELECTOR,
    name: "Tools",
    place_holder: "Rent tools list" 
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelAmount",
    place_holder: "Fuel Amount"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelPrice",
    place_holder: "Fuel Price"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportAmount",
    place_holder: "Transport Amount"
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportPrice",
    place_holder: "Transport Price"
}, {
    type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
    name: "StartAgreementSignature",
    place_holder: "Start Agreement Signature" 
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
            place_holder: "Chose customer"
        }, 
        ...add_rental_agreement 
    ], 
    close_rental_agreement: [{
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelAmount",
        place_holder: "Fuel Amount"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelPrice",
        place_holder: "Fuel Price"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportAmount",
        place_holder: "Transport Amount"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportPrice",
        place_holder: "Transport Price"
    }, {
        type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
        name: "EndAgreementSignature",
        place_holder: "End Agreement Signature" 
    }]
};

export default RentalAgreementsForms;