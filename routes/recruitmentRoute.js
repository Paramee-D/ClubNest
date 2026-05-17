import express from "express";
import {
    createRecruitment,
    getAllRecruitments,
    getRecruitmentById,
    getRecruitmentsByClub,
    updateRecruitment,
    deleteRecruitment
} from "../Controller/recruitmentController.js";

const route = express.Router();

route.post("/create", createRecruitment);
route.get("/getallrecruitments", getAllRecruitments);
route.get("/getrecruitment/:id", getRecruitmentById);
route.get("/getbyclub/:clubId", getRecruitmentsByClub);
route.put("/update/:id", updateRecruitment);
route.delete("/delete/:id", deleteRecruitment);

export default route;