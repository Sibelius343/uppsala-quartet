import mongoose from "mongoose";
import { Video } from "../interfaces/media";

const mediaSchema = new mongoose.Schema<Omit<Video, "id">>({
  videoId: String,
  videoTitle: String,
  videoDescription: String
});

mediaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
  }
})

export default mongoose.models.Media as mongoose.Model<Video, {}, {}, {}, Video> || mongoose.model('Media', mediaSchema);