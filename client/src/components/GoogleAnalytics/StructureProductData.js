import React from 'react';
import Constants from '../../Constants';
import { GetImageUrl } from '../../services/ApiService';

const StructureProductData = ({
    product
}) => {
  return <script type="application/ld+json">
    {`{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${product.Product.Name}",
        "image": "${GetImageUrl(product.Product.ProductsImages[0].Image)}",
        "description": "${product.Product.Text.replace(Constants.html_remove_regex, "")}",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "85"
        },
        "offers": {
            "@type": "Offer",
            "url": "${process.env.REACT_APP_API_BASE_URL}/category/${product.CategoryId}/product/${product.id}",
            "priceCurrency": "ILS",
            "price": "${product.Price || product.DayPrice}",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
          }
    }`}
  </script>
}

export default StructureProductData