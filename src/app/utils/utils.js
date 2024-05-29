export const getUniqueNameUrlWithCount = (products) => {
    // Extract unique body tags from the products
    const bodyTags = [...new Set(products?.map(product => product.body))];

    // Create a count of unique name-url combinations
    const uniqueNameUrlCount = bodyTags.reduce((acc, product) => {
        const key = `${product.name}-${JSON.stringify(product.url)}`;
        acc[key] = { name: product.name, url: product.url };
        return acc;
    }, {});

    // Map the unique name-url combinations to an array with counts
    const uniqueNameUrlWithCount = Object.entries(uniqueNameUrlCount).map(([key, value]) => {
        const count = bodyTags.filter(product => {
            const productKey = `${product.name}-${JSON.stringify(product.url)}`;
            return productKey === key;
        }).length;
        return { ...value, count };
    });

    return uniqueNameUrlWithCount;
};

export const calculateBrandCounts = (products) => {
    return products?.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {});
};
export const calculateTagCounts = (products) => {
    return products?.reduce((acc, product) => {
        product.tag.forEach(tag => {
            acc[tag.name] = (acc[tag.name] || 0) + 1;
        });
        return acc
    }, {})
}
export const calculatePriceCounts = (products) => {
    return products?.reduce((acc, product) => {
        acc[product.price] = (acc[product.price] || 0) + 1;
        return acc;
    }, {});
};