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

export const parseBreadcrumbs=(url)=>{
    const path = new URL(url, 'http://example.com').pathname;
    const segments = path.split('/').filter(segment => segment !== 'en' && segment !=='hi')
    console.log(segments);
    const breadcrumbMap = {
        '': 'Home',
        // 'tata-truck': 'Tata',
        // 'ace-gold-cng': 'Ace Gold CNG',
    };

    let breadcrumbs = segments.map((segment, index) => {
        console.log(segment);
        if (segment === 'en') {
            return null; // Skip the language segment
        }

        // Map the segment to a label, defaulting to a capitalized version
        const label = breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

        // Construct the URL for the breadcrumb
        const url = '/' + segments.slice(0, index + 1).map(seg => seg === segments[2] ? seg.replace('-truck','') : seg).filter(seg => seg && seg !== 'en' && seg !== 'hi').join('/');

        return { label, url };
    }).filter(breadcrumb => breadcrumb); // Remove null values

    const tataIndex = breadcrumbs.findIndex(breadcrumb => breadcrumb.label === 'Tata');
    if (tataIndex !== -1 && breadcrumbs[tataIndex + 1]?.label === 'Ace Gold CNG') {
        breadcrumbs.splice(tataIndex + 1, 0, { label: 'Tata ACE', url: breadcrumbs[tataIndex].url + '/tata-ace' });
    }

    return breadcrumbs;
}