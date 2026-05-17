import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    recruitmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruitment",
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentEmail: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    whyJoin: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Application", applicationSchema);
