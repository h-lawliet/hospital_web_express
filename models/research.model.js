import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    journal: {
      type: String,
      required: false,
    },
    doi: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    impact: {
      type: String,
      required: false,
    },
  }
);

const Research = mongoose.model("Research", researchSchema);

export default Research;