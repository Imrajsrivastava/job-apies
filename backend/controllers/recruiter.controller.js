import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const postJob = async (req, res) => {
  const { title, description } = req.body;
  const job = await Job.create({ title, description, postedBy: req.user._id });
  res.status(201).json(job);
};

export const getApplicants = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const jobs = await Job.find({ postedBy: recruiterId });
    console.log("Jobs posted by recruiter:", jobs);

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs posted yet" });
    }

    const jobIds = jobs.map((job) => job._id);
    const applicants = await Application.find({ job: { $in: jobIds } })
      .populate("candidate", "email")
      .populate("job", "title");

    if (applicants.length === 0) {
      return res.status(404).json({ message: "No applicants yet" });
    }

    res.json(applicants);
  } catch (err) {
    console.error("Error in getApplicants:", err);
    res.status(500).json({ message: "Server error" });
  }
};
