import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  listJobs,
  applyJob,
  myApplications,
} from "../controllers/candidate.controller.js";

const condidateRouter = express.Router();
condidateRouter.use(protect);

condidateRouter.get("/jobs", listJobs);
condidateRouter.post("/apply", applyJob);
condidateRouter.get("/applications", myApplications);

export default condidateRouter;
