import Enquiry from "../models/enquiry.model.js";

export const makeEnquiry = async (req, res) => {
    try {
        const { name, user } = req.body;

        const message = `I'm interested in the ${name}. Please provide more details about pricing, availability, and delivery options.`;

        await Enquiry.create({
            message,
            user
        });

        return res.status(201).json({
            success: true,
            message: "Enquiry sent successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while making enquiry"
        });
    }
};

export const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().populate("user");

        return res.status(200).json({
            success: true,
            enquiries
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching enquiries"
        });
    }
};

export const getUserEnquiries = async (req, res) => {
    try {
        const { userId } = req.params;

        const enquiries = await Enquiry.find({ user: userId });

        return res.status(200).json({
            success: true,
            enquiries
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching user enquiries"
        });
    }
};
