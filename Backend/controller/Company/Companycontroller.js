import mongoose from 'mongoose';
import Company from "../../model/Company.js";
import People from "../../model/People.js";
import Client from "../../model/Client.js";

export const addCompany = async (request, response) => {
    try {
        const data = request.body;
        const existData = await Company.findOne({ email: data.email });
        if (existData) {
            console.log("already exist");
            response.status(203).json({ message: 'Email already exist' });
        } else {
            const companyData = await Company.create(data);
            if (companyData) {
                response.status(201).json({ message: 'data added' });
            }
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: error });
    }
}

export const getCompany = async (request, response) => {
    const { createdBy } = request.query;

    try {
        const companyData = await Company.aggregate([
            {
                $match: {
                    isDeleted: false,
                    createdBy: new mongoose.Types.ObjectId(createdBy)
                }
            },
            {
                $lookup: {
                    from: "peoples",
                    localField: "contact",
                    foreignField: "_id",
                    as: "peopleData"
                }
            },
            {
                $addFields: {
                    "contact": { $concat: [{ $arrayElemAt: ["$peopleData.firstName", 0] }, " ", { $arrayElemAt: ["$peopleData.lastName", 0] }] },
                    "contact_id": { $arrayElemAt: ["$peopleData._id", 0] }
                }
            },
            {
                $project: {
                    peopleData: 0,
                    // Contact:0 // Exclude the peopleData array from the output
                }
            }
        ]);
        const totalRecords = companyData.length;

        if (companyData.length > 0) {
            response.status(200).json({ companyData, totalRecords });
        } else {
            response.status(203).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const updateDataController = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        const update = await Company.findOneAndUpdate({ _id: id }, {
            $set: data
        });
        if (update !== null) {
            response.status(200).json({ message: "data updated sucessfully" });
        } else {
            response.status(203).json({ message: 'data not found' })
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: error });
    }
}

export const deleteCompany = async (request, response) => {
    try {
        const id = request.params.id;
        console.log("id : ", id);
        const existpeople = await People.find({
            $and: [{ company: id }, { isDeleted: false }]
        });
        const existclient = await Client.find({
            $and: [
                { company: id },
                { isDeleted: false }
            ]
        });
        if (existclient.length > 0 || existpeople.length > 0) {
            response.status(203).json({ message: 'cannot delete company if they are client or attached to people' });
        }
        else {
            const deletedata = await Company.updateOne({ _id: id }, {
                "$set": {
                    isDeleted: true
                }
            });
            if (deletedata.acknowledged) {
                response.status(200).json({ message: 'Company Deleted Sucessfully' });
            } else {
                response.status(204).json({ message: 'data not deleted because no data found' });
            }
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while deleting data' });
    }
}