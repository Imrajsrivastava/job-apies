import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const listJobs = async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "name email");
  res.json(jobs);
};

export const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const job = await Job.findById(jobId).populate("postedBy", "email");
  const candidate = req.user;
  console.log("Candidate applying:", candidate);
  const alreadyApplied = await Application.findOne({
    job: jobId,
    candidate: candidate._id,
  });
  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied to this job" });
  }

  const application = await Application.create({
    job: jobId,
    candidate: candidate._id,
  });

  await sendEmail(
    candidate.email,
    "Job Application Submitted",
    `You applied to ${job.title}`
  );
  await sendEmail(
    job.postedBy.email,
    "New Applicant",
    `${candidate.name} applied to your job.`
  );

  res.json({ message: "Applied successfully" });
};

export const myApplications = async (req, res) => {
  const apps = await Application.find({ candidate: req.user._id }).populate(
    "job",
    "title"
  );
  res.json(apps);
};
