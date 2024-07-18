import Product from '../../model/Product.js';
import mongoose from 'mongoose';

export const addProducts = async (request, response) => {
    try {
        let data = request.body;
        data = await Product.create(data);
        response.status(201).json({ data, message: 'data addedd' });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while adding expenses' });
    }
}

export const getProducts = async (request, response) => {
    try {
        const { createdBy } = request.query;

        const productData = await Product.aggregate([
            {
                $match: {
                    isDeleted: false,
                    createdBy: new mongoose.Types.ObjectId(createdBy)
                }
            },
            {
                $lookup: {
                    from: 'productcategories',
                    localField: 'productCategory',
                    foreignField: '_id',
                    as: 'categoryData'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'currency',
                    foreignField: '_id',
                    as: 'currencyData'
                }
            },
            {
                $addFields: {
                    "categoryname": { $arrayElemAt: ["$categoryData.name", 0] },
                    "currencyName": { $arrayElemAt: ["$currencyData.currencyName", 0] }
                }
            },
            {
                $project: {
                    categoryData: 0,
                    currencyData: 0
                }
            }
        ]);
        const totalRecords = productData.length;
        if (productData && productData.length > 0) {
            response.status(200).json({ productData , totalRecords});
        } else {
            response.status(203).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error while fetching data : ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const updateProducts = async (request, response) => {
    try {
        const { id } = request.params;
        let data = request.body;
        data = await Product.findOneAndUpdate({ _id: id }, {
            $set: data
        });

        if (data) {
            response.status(200).json({ message: 'data updated ', data })
        }
        else {
            response.status(204).json({ message: 'data not found' });
        }
    } catch (error) {
        console.log("error while updating Dta : ", error);
        response.status(500).json({ message: 'error while updating expense' });
    }
}

export const deleteProducts = async (request, response) => {
    try {
        const { id } = request.params;
        const data = await Product.findOneAndUpdate({ _id: id }, {
            $set: { isDeleted: true }
        });

        if (data) {
            response.status(200).json({ message: 'data deleted ', data });
        }
        else {
            response.status(203).json({ message: 'data not found' });
        }
    } catch (error) {
        console.log("error while deleting ", error);
    }
}