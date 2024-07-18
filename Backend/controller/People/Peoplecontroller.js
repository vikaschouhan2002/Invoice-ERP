import mongoose from 'mongoose';
import People from "../../model/People.js";
import Company from "../../model/Company.js";
import Client from "../../model/Client.js";

export const addPeopleController = async (request, response) => {
    try {
        const data = request.body;
        const existData = await People.findOne({ email: data.email });
        if (!existData) {
            const peopleData = await People.create(data);
            if (peopleData) {
                response.status(201).json({ message: 'data added' });
            }
        } else {
            console.log("already exist");
            response.status(203).json({ message: 'Email already exist' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error when store data' })
    }
}

export const getPeopleDataController = async (request, response) => {
    try {
        const { createdBy } = request.query;
        const peopleData = await People.aggregate([
            {
                $match: {
                    isDeleted: false,
                    createdBy: new mongoose.Types.ObjectId(createdBy)
                }
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "company",
                    foreignField: "_id",
                    as: "companyData"
                }
            },
            {
                $addFields: {
                    "company": { $arrayElemAt: ["$companyData.name", 0] },
                    "company_id": { $arrayElemAt: ["$companyData._id", 0] }
                }
            },
            {
                $project: {
                    companyData: 0 // Exclude the companyData array from the output
                }
            }
        ]);
        const totalRecords = peopleData.length;
        if (peopleData.length > 0) {
            response.status(200).json({ peopleData, totalRecords});
        } else {
            response.status(203).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error when fetching data' });
    }
}


export const updatePeopleController = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        const update = await People.findOneAndUpdate({ _id: id }, {
            "$set": data
        });
        if (update !== null) {
            response.status(200).json({ message: "data updated sucessfully" });
        } else {
            console.log("error while updating data : ", update);
            response.status(203).json({ message: 'data not found' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error when update data' });
    }
}

export const deletePeople = async (request, response) => {
    try {
        const id = request.params.id;
        const existcompany = await Company.find({
            $and: [
                { contact: id },
                { isDeleted: false }
            ]
        });
        const existclient = await Client.find({
            $and: [
                { people: id },
                { isDeleted: false }
            ]
        });
        console.log("exist client : ", existclient, ' exist company : ', existcompany);
        if (existclient.length > 0 || existcompany.length > 0) {
            response.status(203).json({ message: 'cannot delete people if he or she atteched to company or client' });
        }
        else {
            const deletedata = await People.updateOne({ _id: id }, {
                "$set": {
                    isDeleted: true
                }
            });
            if (deletedata.acknowledged) {
                console.log("data deleted");
                response.status(200).json({ message: 'Company Deleted Sucessfully' });
            } else {
                console.log("not data found");
                response.status(204).json({ message: 'data not deleted because no data found' });
            }
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while deleting data' });
    }
}