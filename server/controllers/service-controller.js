import Service from "../models/service-model.js";

export const services = async (req, res) => {
    try {
        const response = await Service.find({}) ;
        if (!response) {
            return res.status(404).json({ msg: "No services found" });
        }
        res.status(200).json({msg : response});
        
    } catch (error) {
        console.error("Error fetching services:", error);
    }

}

export default { services };