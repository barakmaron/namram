import FORMS from "../../../components/Form/Forms";
import AddCustomerForm from '../CustomersPage/FormConstants';

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
        ...AddCustomerForm, 
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