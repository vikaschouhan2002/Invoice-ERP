import Offer from "../../model/Offer.js";

export const addOfferController = async (request, response) => {
  try {
    let data = request.body;
    console.log("data : ", data);
    data = await Offer.create(data);
    response.status(201).json({ message: "data added", data });
  } catch (error) {
    console.log("error : ", error);
    response.status(500).json({ message: "error while add offer" });
  }
};

export const getOffer = async (request, response) => {
  try {
    const { createdBy } = request.query;
    const offerData = await Offer.find({
      $and: [
        { isDeleted: false },
        { isExpired: false },
        { createdBy: createdBy },
      ],
    })
      .populate({
        path: "createdBy",
        select: "firstName lastName",
      })
      .populate({
        path: "tax",
      })
      .populate({
        path: "lead",
        select: "type status source",
        populate: {
          path: "people company",
          select: "name firstName lastName",
        },
      })
      .exec();
    const totalRecords = offerData.length;

    console.log("offerData : ", offerData);
    response.status(200).json({ offerData, totalRecords });
  } catch (error) {
    console.log("error : ", error);
    response.status(500).json({ message: "error while fetching" });
  }
};

export const getOfferById = async (request, response) => {
  const { id } = request.params;
  try {
    const offerData = await Offer.findById(id)
      .populate({
        path: "createdBy",
        select: "firstName lastName",
      })
      .populate({
        path: "tax",
      })
      .populate({
        path: "lead",
        select: "type status source",
        populate: {
          path: "people company",
        },
      })
      .exec();
    if (!offerData) {
      return response.status(404).json({ message: "Offer not found" });
    }
    response.status(200).json({ offerData });
  } catch (error) {
    console.log("error : ", error);
    response.status(500).json({ message: "Error while fetching offer" });
  }
};

export const updateOffer = async (request, response) => {
  try {
    const id = request.params.id;
    let data = request.body;
    console.log("id : ", id);
    console.log("data : ", data);
    const updateData = await Offer.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      }
    );
    if (updateData) {
      console.log("update Data : ", updateData);
      response.status(200).json({ message: "data updated" });
    } else {
      response.status(204).json({ message: "data not found" });
    }
  } catch (error) {
    console.log("error : ", error);
    response.status(500).json({ message: "error while updating" });
  }
};

export const deleteOffer = async (request, response) => {
  try {
    const id = request.params.id;
    const deleteOffer = await Offer.findOneAndUpdate(
      { _id: id },
      {
        $set: { isDeleted: true },
      }
    );
    if (deleteOffer) {
      response.status(200).json({ message: "data deleted", deleteOffer });
    } else {
      response.status(203).json({ message: "data not found" });
    }
  } catch (error) {
    console.log("error : ", error);
    response.status(500).json({ message: "error while deleting" });
  }
};
