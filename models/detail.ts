import mongoose from "mongoose";
import { Detail } from "../interfaces/detail";

const detailSchema = new mongoose.Schema<Omit<Detail, "id">>({
  detailType: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

detailSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
})

export default mongoose.models.Detail as mongoose.Model<Detail, {}, {}, {}, Detail> || mongoose.model('Detail', detailSchema);