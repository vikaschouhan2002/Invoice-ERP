import ExpensesCategory from "../../model/ExpenseCategory.js";

export const addNewCategory = async (request, response) => {
    try {
        let data = request.body;
        console.log("data : ", data);
        data = await ExpensesCategory.create(data);
        response.status(201).json({ message: 'category created', data });
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while add category' });
    }
}

export const getExpenseCategory = async (request, response) => {
    try {
        const { createdBy } = request.query;
        const expensecategory = await ExpensesCategory.find({
            isDeleted: false,
            createdBy: createdBy
        });
        const totalRecords = expensecategory.length;
        if (expensecategory.length > 0)
            response.status(200).json({ expensecategory, totalRecords });
        else
            response.status(203).json({ message: 'collection is empty' });
    } catch (error) {
        response.status(500).json({ message: 'error while fetching category' });
    }
}

export const updateExpenseCategory = async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;

        console.log("data : ", data);
        const updateData = await ExpensesCategory.findOneAndUpdate({ _id: id }, {
            $set: data
        });

        if (updateData !== null)
            response.status(200).json({ updateData, message: 'data updated' });
        else
            response.status(203).json({ message: 'no data found' });

    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while updating data' });
    }
}

export const deleteExpenseCategory = async (request, response) => {
    try {
        const id = request.params.id;
        const updateData = await ExpensesCategory.findOneAndUpdate({ _id: id }, {
            "$set": {
                isDeleted: true
            }
        });

        if (updateData !== null) {
            response.status(200).json({ message: 'data updated', updateData });
        }
        else {
            response.status(204).json({ message: 'data not found' });
        }
    } catch (error) {
        console.log("error : ", error);
        response.status(500).json({ message: 'error while deleting categroy' });
    }
}