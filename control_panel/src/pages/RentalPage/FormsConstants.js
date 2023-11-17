import FORMS from "../../components/Form/Forms";
import { fuelAmountTitle, fuelPriceTitle, selectClientTitle, signatureTitle, toolsTitle, transportAmountTitle, transportPriceTitle, workingToolLocationTitle } from "../../strings";
import AddCustomerForm from '../CustomersPage/FormConstants';

const add_rental_agreement= [{
    type: FORMS.INPUTS_TYPES.TEXT,
    name: "Location",
    place_holder: workingToolLocationTitle
}, {
    type: FORMS.INPUTS_TYPES.RENT_TOOLS_SELECTOR,
    name: "Tools",
    place_holder: toolsTitle
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelAmount",
    place_holder: fuelAmountTitle
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "FuelPrice",
    place_holder: fuelPriceTitle
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportAmount",
    place_holder: transportAmountTitle
}, {
    type: FORMS.INPUTS_TYPES.NUMBER,
    name: "TransportPrice",
    place_holder: transportPriceTitle
}, {
    type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
    name: "StartAgreementSignature",
    place_holder: signatureTitle
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
            place_holder: selectClientTitle
        }, 
        ...add_rental_agreement 
    ], 
    close_rental_agreement: [{
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelAmount",
        place_holder: fuelAmountTitle
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "FuelPrice",
        place_holder: fuelPriceTitle
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportAmount",
        place_holder: transportAmountTitle
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "TransportPrice",
        place_holder: transportPriceTitle
    }, {
        type: FORMS.INPUTS_TYPES.SIGNATURE_FIELD,
        name: "EndAgreementSignature",
        place_holder: signatureTitle
    }]
};

export default RentalAgreementsForms;