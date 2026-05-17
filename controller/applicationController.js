import Application from "../Model/applicationModel.js";
import Recruitment from "../Model/recruitmentModel.js";

// CREATE - Student submits an application
export const createApplication = async (req, res) => {
    try {
        const applicationData = new Application(req.body);
        const { recruitmentId, studentEmail } = applicationData;

        const recruitmentExist = await Recruitment.findById(recruitmentId);
        if (!recruitmentExist) {
            return res.status(404).json({ message: "Recruitment notice not found." });
        }

        if (!recruitmentExist.isOpen) {
            return res.status(400).json({ message: "This recruitment is closed. Applications are no longer accepted." });
        }

        const alreadyApplied = await Application.findOne({ recruitmentId, studentEmail });
        if (alreadyApplied) {
            return res.status(400).json({ message: "You have already applied for this recruitment." });
        }

        const savedApplication = await applicationData.save();
        res.status(200).json(savedApplication);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ALL - Get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate({
            path: "recruitmentId",
            select: "title deadline isOpen",
            populate: {
                path: "clubId",
                select: "name",
            },
        });

        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found." });
        }

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ONE - Get a single application by ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate({
            path: "recruitmentId",
            select: "title deadline isOpen",
            populate: {
                path: "clubId",
                select: "name",
            },
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        res.status(200).json(application);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ - Get all applications for a specific recruitment
export const getApplicationsByRecruitment = async (req, res) => {
    try {
        const recruitmentExist = await Recruitment.findById(req.params.recruitmentId);
        if (!recruitmentExist) {
            return res.status(404).json({ message: "Recruitment notice not found." });
        }

        const applications = await Application.find({ recruitmentId: req.params.recruitmentId });

        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this recruitment." });
        }

        res.status(200).json(applications);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// UPDATE - Update application status
export const updateApplicationStatus = async (req, res) => {
    try {
        const id = req.params.id;

        const applicationExist = await Application.findById(id);
        if (!applicationExist) {
            return res.status(404).json({ message: "Application not found." });
        }

        const updatedApplication = await Application.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedApplication);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// DELETE - Delete an application
export const deleteApplication = async (req, res) => {
    try {
        const id = req.params.id;

        const applicationExist = await Application.findById(id);
        if (!applicationExist) {
            return res.status(404).json({ message: "Application not found." });
        }

        await Application.findByIdAndDelete(id);
        res.status(200).json({ message: "Application deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
