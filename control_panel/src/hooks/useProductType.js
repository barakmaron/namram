import { useEffect, useState } from "react";
import Constants from "../Constants";

const useProductType = (product_type) => {
    const [type, setType] = useState(product_type);
    const [array_type, setArrayType] = useState(Constants.PRODUCT_TYPE.SaleProducts);

    useEffect(() => {
      setArrayType(type === Constants.API_PRODUCT_TYPE.SALE ? 
        Constants.PRODUCT_TYPE.SaleProducts : 
        Constants.PRODUCT_TYPE.RentProducts);
    }, [type]);

    return [array_type, setType];
};

export default useProductType;