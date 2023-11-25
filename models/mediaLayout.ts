import mongoose from "mongoose";
import { MediaLayout, NewMediaLayout } from "../interfaces/media";

interface MongooseMediaItem {
  id: string;
  _id?: string;
  _v?: string;
}

interface MongooseMediaLayout {
  _id?: string;
  _v?: string;
  layout: MongooseMediaItem[];
}

const mediaLayoutSchema = new mongoose.Schema<NewMediaLayout>({
  layout: [
    {
      itemType: {
        type: String,
        required: true
      },
      mediaItemId: {
        type: String,
        required: false
      },
      headerText: {
        type: String,
        required: false
      }
    }
  ]
});

mediaLayoutSchema.set('toJSON', {
  transform: (document, returnedObject: MongooseMediaLayout) => {
    delete returnedObject._id;
    delete returnedObject._v;
    returnedObject.layout.forEach((item, i) => {
      item.id = item._id?.toString() || `${i}`;
      delete item._id;
      delete item._v;
    })
  }
})

export default mongoose.models.MediaLayout as mongoose.Model<MediaLayout, {}, {}, {}, MediaLayout> || mongoose.model('MediaLayout', mediaLayoutSchema);