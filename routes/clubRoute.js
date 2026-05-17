import express from "express";
import { createClub, getAllClubs, getClubById, updateClub, deleteClub } from "../Controller/clubController.js";

const route = express.Router();

route.post("/create", createClub);
route.get("/getallclubs", getAllClubs);
route.get("/getclub/:id", getClubById);
route.put("/update/:id", updateClub);
route.delete("/delete/:id", deleteClub);

export default route;