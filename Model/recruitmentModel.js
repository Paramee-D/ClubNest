import mongoose from "mongoose";

const recruitmentSchema = new mongoose.Schema({
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    slots: {
        type: Number,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    postedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Recruitment", recruitmentSchema);
