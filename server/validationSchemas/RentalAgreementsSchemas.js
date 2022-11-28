const AddRentalAgreement = {    
    Tools: {        
        notEmpty: true,
        type: "string",
        minLength: 5
    },
    Location: {
        notEmpty: true,
        type: "string",
        minLength: 3
    },
    FuelAmount: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    FuelPrice: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    TransportAmount: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    TransportPrice: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
};

const DeleteRentalAgreement = {    
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    }
};

const CloseRentalAgreement = {   
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
        in: ['params']
    },
    FuelAmount: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    FuelPrice: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    TransportAmount: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
    TransportPrice: {
        notEmpty: true,
        type: "float",
        minLength: 1
    },
}

const GetRentalAgreement = {
    id: {
        notEmpty: true,
        type: "string",
        minLength: 36,
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