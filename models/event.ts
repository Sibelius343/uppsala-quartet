import mongoose from "mongoose";
import { PerformanceEvent } from "../interfaces/events";

const eventSchema = new mongoose.Schema<Omit<PerformanceEvent, "id">>({
  title: {
    type: String,
    required: true
  },
  date: String,
  location: String,
  description: String,
  imgUrl: String
});

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
})

export default mongoose.models.Event as mongoose.Model<PerformanceEvent, {}, {}, {}, PerformanceEvent> || mongoose.model('Event', eventSchema);