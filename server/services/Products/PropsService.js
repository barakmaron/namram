import ProductDB from '../storage/Products/index.js';

async function PatchProps(id, name, value) {
    switch(name) {
        case "PropName": {
            return await ProductDB.Props.PatchName(id, value);
        }
        case "Value": {
            return await ProductDB.Props.PatchValue(id, value);
        }
    }
    
}

const PropsService = {
    PatchProps
};

export default PropsService;