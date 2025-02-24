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
      required: false
    },
    purpose: {
      type: String,
      required: false,
    },
    method: {
      type: String,
      required: false
    },
    time: {
      type: String,
      required: false,
    },
    caution: {
      type: String,
      required: false,
    },
    result: {
      type: String,
      required: false
    }
  }
);

const Examination = mongoose.model("Examination", examinationSchema);

export default Examination;