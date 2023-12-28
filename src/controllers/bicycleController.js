const Bicycle = require('../models/Bicycle');

const getAllBicycles = async (req, res) => {
    try {
        const bicycles = await Bicycle.find();
        return res.status(200).json(bicycles);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}
const getBicyclesStatistic = async (req, res) => {
    try {
        const allBicycles = await Bicycle.countDocuments();
        const availableBicycles = await Bicycle.countDocuments({ status: 'available' });
        const bookedBicycles = await Bicycle.countDocuments({ status: 'busy' });
        const averagePriceResult = await Bicycle.aggregate([
            {
                $group: {
                    _id: null,
                    averagePrice: { $avg: { $toDouble: "$price" } }
                }
            }
        ]);

        const averagePrice = averagePriceResult.length > 0 ? averagePriceResult[0].averagePrice : 0;

        return res.status(200).json({allBicycles, availableBicycles, bookedBicycles, averagePrice});
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}
const getBicyclesByStatus = async (req, res) => {
    try {
        const bicycleStatus = req.query.status;
        const validBicycleStatus = ['available', 'busy', 'unavailable', 'all']; 
        if (!validBicycleStatus.includes(bicycleStatus)) {
            return res.status(400).json({ error: "Invalid bicycle status" });
        }
        if (bicycleStatus === 'all') {
            const bicycles = await Bicycle.find();
            return res.status(200).json(bicycles);    
        }
        const bicycles = await Bicycle.find({ status: bicycleStatus });

        return res.status(200).json(bicycles);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}


const updateBicycleStatus = async (req, res) => {
    try {
        const bicycleId = req.params.id;
        const newStatus = req.body.status;
        const validStatusValues = ['available', 'busy', 'unavailable'];
        if (!validStatusValues.includes(newStatus)) {
            return res.status(400).json({ error: "Invalid status value" });
        }
        const updatedBicycle = await Bicycle.findByIdAndUpdate(
            bicycleId,
            { $set: { status: newStatus } },
            { new: true }
        );

        if (!updatedBicycle) {
            return res.status(404).json({ error: "Bicycle not found" });
        }

        return res.status(200).json(updatedBicycle);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

const createBicycle = async (req, res) => {
    try {
        const data = req.body;
        const bicycle = await Bicycle.create(data);

        if (!bicycle) {
        return res.status(404).json({message: 'Bicycle not created'})
        }

        return res.status(201).json(bicycle);
    } catch (err) {
        console.log(err);
         return res.status(500).json({error: err.message});
    }
}
const deleteBicycle = async (req, res) => {
    try {
        const bicycleId = req.params.id;
        const bicycle = await Bicycle.findByIdAndDelete(bicycleId);
        if (!bicycle) {
        return res.status(404).json({message: 'Bicycle not deleted'})
        }
       return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err.message});
    }
}

module.exports = { getAllBicycles, createBicycle, deleteBicycle, getBicyclesStatistic, updateBicycleStatus, getBicyclesByStatus };
