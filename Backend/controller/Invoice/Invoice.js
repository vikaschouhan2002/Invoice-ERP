import  Invoice  from "../../model/Invoice.js";

export const addInvoiceController = async (request, response) => {
    try {
        let data = request.body;
        data = await Invoice.create(data);
        response.status(201).json({ message: 'data added', data });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while add Invoice' });
    }
}

export const getInvoice = async (request, response) => {
    try {
        const InvoiceData = await Invoice.find({ $and: [{ isDeleted: false }, { isExpired: false }] })
            .populate({
                path: 'createdBy',
                select: 'firstName lastName'
            })
            .populate({
                path: 'tax',
            })
            .populate({
                path: 'client',
                select: 'type status source',
                populate: {
                    path: 'people company',
                }
            })
            .exec();

        response.status(200).json({ InvoiceData },);
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while fetching' });
    }
}

export const getInvoiceById = async (request, response) => {
    const { id } = request.params;
    try {
        const invoiceData = await Invoice.findById(id)
            .populate({
                path: 'createdBy',
                select: 'firstName lastName'
            })
            .populate({
                path: 'tax'
            })
            .populate({
                path: 'client',
                select: 'type status source',
                populate: {
                    path: 'people company'
                }
            })
            .exec();
        if (!invoiceData) {
            return response.status(404).json({ message: 'Invoice not found' });
        }
        response.status(200).json({ invoiceData });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'Error while fetching invoice' });
    }
}


export const updateInvoice = async (request, response) => {
    try {
        const id = request.params.id;
        let data = request.body;
        console.log("id : ", id);
        console.log("data : ", data);
        const updateData = await Invoice.findOneAndUpdate({ _id: id }, {
            $set: data
        });
        if (updateData) {
            console.log("update Data : ", updateData);
            response.status(200).json({ message: "data updated" });
        }
        else {
            response.status(204).json({ message: 'data not found' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while updating' });
    }
}

export const deleteInvoice = async (request, response) => {
    try {
        const id = request.params.id;
        console.log('id--- ',id);
        const deleteInvoice = await Invoice.findOneAndUpdate({ _id: id }, {
            $set: { isDeleted: true }
        });
        console.log('deleteInvoice---- ',deleteInvoice);
        if (deleteInvoice) {
            response.status(200).json({ message: 'Invoice deleted successfully', deletedInvoice: deleteInvoice });
        } else {
            response.status(404).json({ message: 'Invoice not found' });
        }
    } catch (error) {
        console.error("Error:", error);
        response.status(500).json({ message: 'Error while deleting invoice' });
    }
};
