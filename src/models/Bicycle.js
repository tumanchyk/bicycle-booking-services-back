const { model, Schema } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const BicycleSchema = new Schema({
    name: {
        type: String,
        required: [true, "Bicycle name is required"],
        minlength: [5, "Bicycle name should be at least 5 characters"]
    },
    id: {
        type: String,
        required: [true, "Bicycle id is required"],
        minlength: [5, "Bicycle name should be at least 5 characters"]
    },
    type: {
        type: String,
        required: [true, "Bicycle type is required"],
        minlength: [5, "Bicycle type should be at least 5 characters"]
    },
    color: {
        type: String,
        required: [true, "Bicycle color is required"],
        minlength: [5, "Bicycle color should be at least 5 characters"]
    },
    wheelSize: {
        type: Number,
        required: [true, "Wheel size is required"],
    },
    price: {
        type: Number,
        required: [true, "Bicycle price is required"]
    },
    description: {
        type: String,
        required: [true, "Bicycle description is required"],
        minlength: [5, "Bicycle description should be at least 5 characters"]
    },
    status: {
        type: String,
        enum: ['available', 'busy', 'unavailable'],
        default: 'available'
    }
}, { versionKey: false, timestamps: true });

BicycleSchema.post("save", handleMongooseError);


const Bicycle = model('Bicycles', BicycleSchema);

module.exports = Bicycle;