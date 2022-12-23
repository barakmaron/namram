import ErrorMessages from "./ErrorMessages.js";

const AddRentalAgreement = {    
    Tools: {        
        isLength: {
            options: { 
                min: 5
            }
        },
        errorMessage: ErrorMessages.tools,
    },
    Location: {
        isLength: {
            options: { 
                min: 3
            }
        },
        errorMessage: ErrorMessages.location,
    },
    FuelAmount: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    FuelPrice: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    TransportAmount: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    TransportPrice: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
};

const DeleteRentalAgreement = {    
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    }
};

const CloseRentalAgreement = {   
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
    FuelAmount: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    FuelPrice: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    TransportAmount: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
    TransportPrice: {
        isLength: {
            options: { 
                min: 1
            }
        },
        isFloat: true,
        errorMessage: ErrorMessages.value,
    },
}

const GetRentalAgreement = {
    id: {
        isLength: {
            options: { 
                min: 36
            }
        },
        errorMessage: ErrorMessages.id,
        in: ['params']
    },
}

const RentalAgreementsSchemas = {
    AddRentalAgreement,
    DeleteRentalAgreement,
    CloseRentalAgreement,
    GetRentalAgreement
};

export default RentalAgreementsSchemas;