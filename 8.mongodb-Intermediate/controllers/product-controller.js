const Product = require('../models/product');

const insertSampleProducts = async(req,res)=> {
    try{
        const sampleProducts = [
            {
                name: "Laptop",
                category : "Electronics",
                price: 999,
                inStock: true,
                tags: ["computer","tech"]
            },
            {
                name: "Smartphone",
                category : "Electronics",
                price: 555,
                inStock: true,
                tags: ["gadgets","tech"]
            },
            {
                name: "Watch",
                category : "Fashion",
                price: 99,
                inStock: true,
                tags: ["accessories","fashion"]
            },
            {
                name: "Gold Ring",
                category : "Fashion",
                price: 299,
                inStock: true,
                tags: ["accessories","fashion"]
            },
            {
                name: "Shoes",
                category : "fashion",
                price: 59,
                inStock: false,
                tags: ["accessories","fashion"]
            }

        ]

        const result = await Product.insertMany(sampleProducts);

        res.status(201).json({
            success : true,
            data : `Inserted ${result.length} sample products`
        });


    }catch(error){
        console.error('Data Insertion error:', error);
        res.status(500).json({
            success: false,
            message: 'Data Insertion failed. Please try again.'
        });
    }
};

const getProductStats = async(req,res)=> {

    try{
        const result = await Product.aggregate([
            //Stage 1
            {
                $match: {
                    inStock: true,
                    price: {
                        $gte: 100,
                    },
                },
            },
            //Stage 2
            {
                $group: {
                    _id: "$category",
                    avgPrice: {
                        $avg: "$price"
                    },
                    count: {
                        $sum: 1,
                    }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Data fetched successfully',
            Data: result 
        });
        
    }catch(error){
        console.error('Get Product Status error:', error);
        res.status(400).json({
            success: false,
            message: 'Data Extraction failed. Please try again.'
        }); 
    }
};

const getProductAnalysis = async(req,res) =>{
    try{
        const result = await Product.aggregate([
            {
            $match: {
                category: "Electronics",
            },
        },{
            $group: {
                _id : null,
                totalRevenue : {
                    $sum : "$price"
                },
                maxProductPrice : {
                    $max : "$price"
                },
                minProductPrice : {
                    $min : "$price"
                }
            }
        }
    ]);

    res.status(200).json({
        success : true,
        data : result
    });

    }catch(error){
        console.error('Product Anaylsis error:', error);
        res.status(400).json({
            success: false,
            message: 'Product analysis failure. Please try again.'
        }); 
    }
}
module.exports = {insertSampleProducts,getProductStats,getProductAnalysis};