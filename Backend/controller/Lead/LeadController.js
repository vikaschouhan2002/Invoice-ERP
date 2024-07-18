import mongoose from 'mongoose';
import Offer from "../../model/Offer.js";
import Lead from "../../model/Lead.js";

export const addLeadController = async (request, response) => {
    try {
        const data = request.body;
        const newData = await Lead.create(data);
        if (newData !== null)
            response.status(201).json({ message: 'data created successfully' });
        else
            response.status(203).json({ message: 'data not created' });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'Error while posting data' });
    }
}

export const getLeadController = async (request, response) => {
    try {
        const { createdBy } = request.query;
        const leadData = await Lead.aggregate([
            {
                $match: {
                    isDeleted: false,
                    createdBy: new mongoose.Types.ObjectId(createdBy)
                }
            },
            {
                $lookup: {
                    from: 'peoples',
                    localField: 'people',
                    foreignField: '_id',
                    as: 'peopleData'
                }
            },
            {
                $lookup: {
                    from: 'companies',
                    localField: 'company',
                    foreignField: '_id',
                    as: 'companyData'
                }
            },
            {
                $addFields: {
                    "name": {
                        $cond: [{ $eq: ["$type", 'People'] }, { $concat: [{ $arrayElemAt: ['$peopleData.firstName', 0] }, ' ', { $arrayElemAt: ['$peopleData.lastName', 0] }] }, { $arrayElemAt: ['$companyData.name', 0] }]
                    },
                    "email": {
                        $cond: [{ $eq: ["$type", 'People'] }, { $arrayElemAt: ['$peopleData.email', 0] }, { $arrayElemAt: ['$companyData.email', 0] }]
                    },
                    "country": {
                        $cond: [{ $eq: ["$type", "People"] }, { $arrayElemAt: ['$peopleData.country', 0] }, { $arrayElemAt: ['$companyData.country', 0] }]
                    },
                    "phone": {
                        $cond: [{ $eq: ["$type", "People"] }, { $arrayElemAt: ['$peopleData.phone', 0] }, { $arrayElemAt: ["$companyData.phone", 0] }]
                    }
                }
            },
            {
                $project: {
                    peopleData: 0,
                    companyData: 0
                }
            }
        ]);
        const totalRecords = leadData.length;
        if (leadData.length > 0) {
            response.status(200).json({ leadData, totalRecords });
        }
        else {
            response.status(203).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const updateLeadController = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        console.log("data : ", data);
        const updateLead = await Lead.updateOne({ _id: id }, {
            "$set": data
        });
        if (updateLead !== null) {
            const leadData = await Lead.findOne({ _id: id });
            console.log("lead Data : ", leadData);
            response.status(200).json({ message: 'Lead Data updated', leadData });
        }
        else
            response.status(204).json({ message: 'data not found' });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while updating data' });
    }
}

export const deleteLeadController = async (request, response) => {
    try {
        const id = request.params.id;
        const offerdata = await Offer.find({
            $and: [
                { lead: id },
                { isDeleted: false }
            ]
        });
        if (offerdata.length > 0) {
            response.status(203).json({ message: 'this lead have offer so cant deleted' });
        }
        else {
            const deleteLead = await Lead.findOneAndUpdate({ _id: id }, {
                "$set": {
                    isDeleted: true
                }
            });
            if (deleteLead !== null) {
                console.log("delte : ", deleteLead);
                response.status(200).json({ message: 'data deleted successfully' });
            } else {
                response.status(204).json({ message: 'data not found' });
            }
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while deleting data ' });
    }
}