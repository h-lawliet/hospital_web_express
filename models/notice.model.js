import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: false,
		},
		url: {
			type: String,
			required: false,
		},
		imageUrls: {
			type: Array,
			required: false,
		},
		views: {
			type: Number,
			required: true,
		},
		time: {
			type: String,
			required: true
		},
		endDate: {
			type: String,
			required: true
		}
	}
)

const Notice = mongoose.model("Notice", noticeSchema)

export default Notice