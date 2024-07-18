import Tax from "../../model/Tax.js";

export const addTax = async (request, response) => {
    try {
        const data = request.body;
        if (data.isDefault === true) {
            await Tax.updateMany({ $set: { isDefault: false } });
        }
        await Tax.create(data);
        response.status(201).json({ message: 'Tax added' });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while adding tax' });
    }
}

export const getTaxes = async (request, response) => {
    try {
        const { createdBy } = request.query;

        const taxData = await Tax.find({
            isDeleted: false,
            createdBy: createdBy
        });
        const totalRecords = taxData.length;

        if (taxData.length > 0) {
            response.status(200).json({ taxData , totalRecords });
        }
        else {
            response.status(204).json({ message: 'collection is empty' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const updateTaxes = async (request, response) => {
    try {
        const id = request.params.id;
        let data = request.body;
        console.log("data : ", data);
        const update = await Tax.findOneAndUpdate({ _id: id }, {
            $set: data
        });

        if (update !== null) {
            console.log("data : in first if : ", data.isDefault);
            if (update.isDefault === true && data.isDefault === false) {
                const result = await Tax.findOneAndUpdate({ isDeleted: false }, { $set: { isDefault: true } }, { returnOriginal: false });
                console.log("result : ", result);
            }
            else if (data.isDefault === true) {
                const data1 = await Tax.updateMany({ _id: { $ne: id } }, { $set: { isDefault: false } });
            }
            response.status(200).json({ message: 'data updated' });
        }
        else {
            response.status(204).json({ message: 'data not found' });
        }

    } catch (error) {
        console.log("error occured ", error);
        response.status(500).json({ message: 'error while fetching data' });
    }
}

export const deleteTax = async (request, response) => {
    try {
        const id = request.params.id;
        const data = await Tax.findOneAndUpdate({ _id: id }, {
            $set: {
                isDeleted: true
            }
        });

        if (data) {
            if (data.isDefault === true) {
                const result = await Tax.findOneAndUpdate({ isDeleted: false }, { $set: { isDefault: true } }, { returnOriginal: false });
                console.log("result : ", result);
            }
            response.status(200).json({ message: 'data deleted ' });
        }
        else {
            response.status(203).json({ message: 'data not found' });
        }

    } catch (error) {
        console.log("error ", error);
        response.status(500).json({ message: 'error while deleting ' });
    }
}