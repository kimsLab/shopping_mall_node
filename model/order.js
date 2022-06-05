import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        // orderItem : [
        //     {
        //         name : {
        //             type: String,
        //
        //         },
        //         qty : {},
        //         price : {},
        //         product : {}
        //     }
        // ],
        // shippigAdress : {},
        // paymentmethod : {},
        // paymentResult : {},
        // texPrice : {},
        // shippingPrice : {},
        // totalPrice : {},
        // isPaid : {},
        // paidAt : {},
        // isdelevery : {},
        // deleveredAt : {}

        product : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : "Product"
        },
        user : {
          type : mongoose.Schema.Types.ObjectId,
          required : true,
          ref : "User"
        },
        qty : {
            type : Number,
            required: true,
            default : 1
        },
    },
    {
        timestamps: true,
    }
)


const Order = mongoose.model('Order', orderSchema)

export default Order