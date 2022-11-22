import FORMS from "../../Form/Forms";

const SparePartsForms = {
    add_part: [{
        type: FORMS.INPUTS_TYPES.DATA_LIST,
        name: "diagram",
        place_holder: "chose diagram model"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "serial_number",
        place_holder: "Serial Number"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "name_english",
        place_holder: "Name in english"
    }, {
        type: FORMS.INPUTS_TYPES.TEXT,
        name: "name_hebrew",
        place_holder: "Name in hebrew"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "price",
        place_holder: "Price"
    }, {
        type: FORMS.INPUTS_TYPES.NUMBER,
        name: "count",
        place_holder: "Amount in inventory"
    }]
};

export default SparePartsForms;