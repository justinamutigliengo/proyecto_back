import mongoose from "mongoose";

const collection = "adopme_adoption";

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  pet: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Pets",
  },
});

const adoptionModel = mongoose.model(collection, schema);

export default adoptionModel;
