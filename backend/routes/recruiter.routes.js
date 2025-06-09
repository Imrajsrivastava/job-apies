import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { postJob, getApplicants } from "../controllers/recruiter.controller.js";

const recruiterRouter = express.Router();
recruiterRouter.use(protect);

recruiterRouter.post("/postJob", postJob);
recruiterRouter.get("/applicants", getApplicants);

export default recruiterRouter;
