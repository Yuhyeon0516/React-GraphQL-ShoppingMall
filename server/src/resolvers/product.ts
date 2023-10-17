const mockProducts = (() =>
    Array.from({ length: 20 }).map((_, index) => ({
        id: index + 1 + '',
        imageUrl: `https://loremflickr.com/300/300/${index + 1}`,
        price: 5000,
        title: `임시 상품 ${index + 1}`,
        description: `임시 상세 내용 ${index + 1}`,
        createdAt: new Date(1697096204492 + index * 1000 * 60 * 60 * 24).toString(),
    })))();

const productResolver = {
    Query: {
        products: (parent, args, context, info) => {
            return mockProducts;
        },
        product: (parent, { id }, context, info) => {
            const found = mockProducts.find((item) => item.id === id);
            if (found) return found;
            return null;
        },
    },
};

export default productResolver;
