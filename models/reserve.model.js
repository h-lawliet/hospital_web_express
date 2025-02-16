import mongoose from "mongoose";

const reserveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  }
);

reserveSchema.set('timestamps', true)

const Reserve = mongoose.model("Reserve", reserveSchema);

export default Reserve