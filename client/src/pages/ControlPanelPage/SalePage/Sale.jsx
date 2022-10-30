import React from 'react'
import { useEffect } from 'react'

const Sale = ({ 
    categories, 
    GetSaleAction 
}) => {
    useEffect(() => {
        GetSaleAction();
    }, []);
    
  return (
    <div>Sale</div>
  )
}

export default Sale