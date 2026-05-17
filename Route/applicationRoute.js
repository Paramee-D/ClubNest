import express from "express";
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    getApplicationsByRecruitment,
    updateApplicationStatus,
    deleteApplication,
} from "../Controller/applicationController.js";

const route = express.Router();

route.post("/apply", createApplication);
route.get("/getallapplications", getAllApplications);
route.get("/getapplication/:id", getApplicationById);
route.get("/getbyrecruitment/:recruitmentId", getApplicationsByRecruitment);
route.put("/update/:id", updateApplicationStatus);
route.delete("/delete/:id", deleteApplication);

export default route;
