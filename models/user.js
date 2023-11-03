const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
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
      default: 1,
      required: true,
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
    vendor_id:{
      type: mongoose.ObjectId,
      ref: "Vendor",
    },
    vuser_id:{
      type:mongoose.ObjectId,
      ref:"Vuser"
    }
    
  },
  { timestamps: true }
);

// //password hash
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified('password')) return next();
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const User = mongoose.model("User", UserSchema);

module.exports = { User };
