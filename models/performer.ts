import mongoose from "mongoose";
import { Performer } from "../interfaces/performer";

const performerSchema = new mongoose.Schema<Omit<Performer, "id">>({
  name: {
    type: String,
    required: true
  },
  instrument: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  picUri: {
    type: String,
    required: true
  }
});

performerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
})

export default mongoose.models.Performer as mongoose.Model<Performer, {}, {}, {}, Performer> || mongoose.model('Performer', performerSchema);