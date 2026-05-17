import Recruitment from "../Model/recruitmentModel.js";
import Club from "../Model/clubModel.js";

// CREATE - Post a new recruitment notice
export const createRecruitment = async (req, res) => {
    try {
        const recruitmentData = new Recruitment(req.body);
        const { clubId, title } = recruitmentData;

        const clubExist = await Club.findById(clubId);
        if (!clubExist) {
            return res.status(404).json({ message: "Club not found. Cannot post recruitment." });
        }

        const recruitmentExist = await Recruitment.findOne({ clubId, title });
        if (recruitmentExist) {
            return res.status(400).json({ message: "Recruitment notice with this title already exists for this club." });
        }

        const savedRecruitment = await recruitmentData.save();
        res.status(200).json(savedRecruitment);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ALL - Get all recruitment notices
export const getAllRecruitments = async (req, res) => {
    try {
        const recruitments = await Recruitment.find().populate("clubId", "name category contactEmail");

        if (recruitments.length === 0) {
            return res.status(404).json({ message: "No recruitment notices found." });
        }

        res.status(200).json(recruitments);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ONE - Get a single recruitment notice by ID
export const getRecruitmentById = async (req, res) => {
    try {
        const recruitment = await Recruitment.findById(req.params.id).populate("clubId", "name category contactEmail");

        if (!recruitment) {
            return res.status(404).json({ message: "Recruitment notice not found." });
        }

        res.status(200).json(recruitment);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ - Get all recruitments for a specific club
export const getRecruitmentsByClub = async (req, res) => {
    try {
        const clubExist = await Club.findById(req.params.clubId);
        if (!clubExist) {
            return res.status(404).json({ message: "Club not found." });
        }

        const recruitments = await Recruitment.find({ clubId: req.params.clubId });

        if (recruitments.length === 0) {
            return res.status(404).json({ message: "No recruitment notices found for this club." });
        }

        res.status(200).json(recruitments);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// UPDATE - Update a recruitment notice
export const updateRecruitment = async (req, res) => {
    try {
        const id = req.params.id;

        const recruitmentExist = await Recruitment.findById(id);
        if (!recruitmentExist) {
            return res.status(404).json({ message: "Recruitment notice not found." });
        }

        const updatedRecruitment = await Recruitment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedRecruitment);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// DELETE - Delete a recruitment notice
export const deleteRecruitment = async (req, res) => {
    try {
        const id = req.params.id;

        const recruitmentExist = await Recruitment.findById(id);
        if (!recruitmentExist) {
            return res.status(404).json({ message: "Recruitment notice not found." });
        }

        await Recruitment.findByIdAndDelete(id);
        res.status(200).json({ message: "Recruitment notice deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
