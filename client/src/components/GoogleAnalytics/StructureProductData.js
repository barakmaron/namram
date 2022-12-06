import React from 'react';
import { GetImageUrl } from '../../services/ApiService';

const StructureProductData = ({
    product
}) => {
    const html_remove_regex = /(<([^>]+)>)/gi;
  return <script type="application/ld+json">
    {`{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${product.Product.Name}",
        "image": "${GetImageUrl(product.Product.ProductsImages[0].Image)}",
        "description": "${product.Product.Text.replace(html_remove_regex, "")}",
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