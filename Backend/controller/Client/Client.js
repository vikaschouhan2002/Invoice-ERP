import mongoose from 'mongoose';
import Client from "../../model/Client.js ";

export const addClient = async (request, response) => {
    try {
        const data = request.body;
        console.log("data in body : ", data);
        if (data.type === 'People') {
            data.company = null;
        } else if (data.type === 'Company') {
            data.people = null;
        }
        const query = {};
        if (data.people) {
            query.people = new mongoose.Types.ObjectId(data.people);
        }
        if (data.company) {
            query.company = new mongoose.Types.ObjectId(data.company);
        }

        const existData = await Client.findOne({
            $or: [
                query.people ? { people: query.people } : null,
                query.company ? { company: query.company } : null
            ].filter(Boolean) 
        });

        console.log("exist Data : ", existData);

        if (!existData || existData.isDeleted === true) {
            const clientData = {};
            if (data.people) {
                clientData.people = data.people;
            }
            if (data.company) {
                clientData.company = data.company;
            }
            if (data.type) {
                clientData.type = data.type;
            }
            if (data.createdBy) {
                clientData.createdBy = data.createdBy;
            }

            const newClient = new Client(clientData);
            await newClient.save();

            response.status(201).json({ message: 'client created successfully' });
        } else {
            response.status(205).json({ message: 'client already exists' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error when adding data' });
    }
};

export const getClientData = async (request, response) => {
    const { createdBy } = request.query;
    try {
        const clientData = await Client.aggregate([
            {
                $match: {
                    isDeleted: false,
                    createdBy: new mongoose.Types.ObjectId(createdBy)
                }
            },
            {
                $lookup: {
                    from: "peoples",
                    localField: "people",
                    foreignField: "_id",
                    as: "peopleData"
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
                    companyData: 0,

                }
            }
        ]);
        const totalRecords = clientData.length;

        if (clientData.length > 0) {
            response.status(200).json({ clientData, totalRecords });
        } else {
            response.status(203).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const updateClientController = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        
        if (data.type === 'People') {
            data.company = null;
        } else if (data.type === 'Company') {
            data.people = null;
        }
        const updateClient = await Client.findOneAndUpdate({ _id: id }, {
            "$set": data
        });

        if (updateClient !== null)
            response.status(200).json({ message: 'data updated sucessfully' });
        else
            response.status(203).json({ message: 'data not found' });

    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error when updating data' });
    }
}

export const deleteClientController = async (request, response) => {
    try {
        const id = request.params.id;
        const deleteClient = await Client.findOneAndUpdate({ _id: id }, {
            "$set": {
                isDeleted: true
            }
        });
        if (deleteClient !== null) {
            response.status(200).json({ message: "data deleted successfully " });
        }
        else
            response.status(203).json({ message: 'data not found' });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while deleting data' });
    }
}