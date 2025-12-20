/**
 * @param {Array} products
 * @param {Object} filters - { color: [], material: [] }
 * @param {String} sortValue
 */
export function filterAndSortProducts(products, filters, sortValue) {
  let result = [...products];

  /* ---------- FILTER: COLOR ---------- */
  if (filters.color?.length) {
    result = result.filter(product =>
      filters.color.includes(product.color)
    );
  }

  /* ---------- FILTER: MATERIAL ---------- */
  if (filters.material?.length) {
    result = result.filter(product =>
      product.material?.some(m =>
        filters.material.includes(m)
      )
    );
  }

  /* ---------- SORT ---------- */
  if (sortValue === "priceLow") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "priceHigh") {
    result.sort((a, b) => b.price - a.price);
  }

  /*if (sortValue === "new") {
    result = result.filter(product => product.isnewarrival === true);
  }*/

    if (sortValue === "new") {
    result.sort(
      (a, b) => b.createdAt.seconds - a.createdAt.seconds
    );
}

  return result;
}
