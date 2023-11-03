const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const VuserSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        phone: {
          type: Number,
          required: true,
          unique: true,
        },
        address: {
          type: {},
          required: true,
        },
       
        role: {
          type: Number,
          default: 2,
          required: true,
        },
        vendor:{
          type: mongoose.ObjectId,
            ref: "Vendor",
          },
       
        tokens: [
          {
            token: {
              type: String,
              required: true,
            },
          },
        ],
        status: {
          type: Number,
          default: 1,
        },
        photo: {
          data: Buffer,
          contentType: String,
        },
      },
      { timestamps: true }
    );
    
    // //password hash
    // VuserSchema.pre("save", async function (next) {
    //   if (this.isModified("password")) {
    //     this.password = await bcrypt.hash(this.password, 10);
    //   }
    //   next();
    // });
    
    const Vuser = mongoose.model("Vuser", VuserSchema);
    
    module.exports = { Vuser };
    
