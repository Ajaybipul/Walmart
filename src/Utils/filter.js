export const applyFilters = ({
    originalProducts,
    isFilterByRating,
    isFilterByPrice,
    isFilterByPriceAscending,
    isFilterByBelow50,
    isFilterByAbove50,
    isFilterByRatingAbove3,
    isFilterByRatingBelow3,
  }) => {
    let filteredProducts = [...originalProducts];
  
    // Apply rating filter (High to low)
    if (isFilterByRating) {
      filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  
    // Apply price descending filter
    if (isFilterByPrice) {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    // Apply price ascending filter
    if (isFilterByPriceAscending) {
      filteredProducts.sort((a, b) => a.price - b.price);
    }
  
    // Filter products by price below 15
    if (isFilterByBelow50) {
      filteredProducts = filteredProducts.filter((product) => product.price < 15);
    }
  
    // Filter products by price above 15
    if (isFilterByAbove50) {
      filteredProducts = filteredProducts.filter((product) => product.price > 15);
    }
  
    // Filter products with rating > 3
    if (isFilterByRatingAbove3) {
      filteredProducts = filteredProducts.filter((product) => product.rating.rate > 3);
    }
  
    // Filter products with rating <= 3
    if (isFilterByRatingBelow3) {
      filteredProducts = filteredProducts.filter((product) => product.rating.rate <= 3);
    }
  
    return filteredProducts;
  };