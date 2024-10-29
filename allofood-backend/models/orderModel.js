const mongoose = require('mongoose');
const User = require('./userModel');
const Item = require('./itemModel');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (userId) {
                const user = await User.findById(userId);
                return user != null;
            },
            message: "User does not exist sadly",
        },
    },
    deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    notifiedDeliveryPeople: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    deliveryAssignedAt: {
        type: Date,
        default: null
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Ready', 'Assigned', 'On the Way', 'Delivered', 'Cancelled', 'Rejected'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

orderSchema.pre('save', async function(next) {
    try {
        this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Order', orderSchema);