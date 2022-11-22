import { useEffect, useState } from "react";
import Constants from "../Constants";

const useProductType = (product_type) => {
    const [array_type, setArrayType] = useState(Constants.PRODUCT_TYPE.SaleProducts);

    useEffect(() => {
      setArrayType(product_type === Constants.API_PRODUCT_TYPE.SALE ? 
        Constants.PRODUCT_TYPE.SaleProducts : 
        Constants.PRODUCT_TYPE.RentProducts);
    }, [product_type]);

    return array_type;
};

export default useProductType;