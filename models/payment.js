const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        payment: {},
      
        vendor:{
          type: mongoose.ObjectId,
            ref: "Vendor",
          },
          status:{
            type:String,
            default: "success",
          },
          date:{
            type:String,
          }
      },
     
      { timestamps: true }
    );
    

    const Payment = mongoose.model("Payment", PaymentSchema);
    
    module.exports = { Payment };
    
