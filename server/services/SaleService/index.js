import SaleDB from "../storage/Sale/index.js";

async function GetAllWithNested() {
    return SaleDB.GetAllWithNested();
}

const SaleService = {
    GetAllWithNested
};

export default SaleService;