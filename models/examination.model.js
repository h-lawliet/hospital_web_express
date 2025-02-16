import mongoose from "mongoose";

const examinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    purpose: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true,
    },
    caution: {
      type: String,
      required: false,
    },
    result: {
      type: String,
      required: true
    }
  }
);

const Examination = mongoose.model("Examination", examinationSchema);

export default Examination;