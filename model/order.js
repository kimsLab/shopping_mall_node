import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {

    },
    {
        timestamps: true,
    }
)


const Order = mongoose.model('Product', orderSchema)

export default Order