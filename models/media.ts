import mongoose from "mongoose";
import { Media } from "../interfaces/media";

const mediaSchema = new mongoose.Schema<Omit<Media, "id">>({
  videoIds: [String]
});

mediaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
})

export default mongoose.models.Media as mongoose.Model<Media, {}, {}, {}, Media> || mongoose.model('Media', mediaSchema);