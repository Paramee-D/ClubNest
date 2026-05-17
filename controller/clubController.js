import Club from "../Model/clubModel.js";

// CREATE - Add a new club
export const createClub = async (req, res) => {
    try {
        const clubData = new Club(req.body);
        const { name } = clubData;

        const clubExist = await Club.findOne({ name });
        if (clubExist) {
            return res.status(400).json({ message: "Club already exists." });
        }

        const savedClub = await clubData.save();
        res.status(200).json(savedClub);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ALL - Get all clubs
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find();

        if (clubs.length === 0) {
            return res.status(404).json({ message: "No clubs found." });
        }

        res.status(200).json(clubs);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// READ ONE - Get a single club by ID
export const getClubById = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: "Club not found." });
        }

        res.status(200).json(club);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// UPDATE - Update club details
export const updateClub = async (req, res) => {
    try {
        const id = req.params.id;

        const clubExist = await Club.findById(id);
        if (!clubExist) {
            return res.status(404).json({ message: "Club not found." });
        }

        const updatedClub = await Club.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedClub);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// DELETE - Delete a club
export const deleteClub = async (req, res) => {
    try {
        const id = req.params.id;

        const clubExist = await Club.findById(id);
        if (!clubExist) {
            return res.status(404).json({ message: "Club not found." });
        }

        await Club.findByIdAndDelete(id);
        res.status(200).json({ message: "Club deleted successfully." });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};
