
const products = require('../Models/product');

const resolvers = {
    Query : {
        products : async() => await products.find({}),
        product: async(_, {id}) => await products.findById(id),
    },

    Mutation: {
        createProduct: async(_,args)=> {
            const newlyCreatedProduct = new products(args);

            return await newlyCreatedProduct.save();
        },
        deleteProduct: async(_, {id})=> {
            await products.findByIdAndDelete(id);

            const deletedproduct = await products.findById(id);
            return !!deletedproduct;
        },
        updateProduct: async(_, {id, ...updates})=>{
            
            return await products.findByIdAndUpdate(id,updates,{new : true});
        }

    }
};

module.exports = resolvers;