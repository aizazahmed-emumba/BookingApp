import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

}, {
    timestamps: true
})


schema.methods.getJWTToken = function () {
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })
}
schema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
}
schema.pre('save', async function (next) {
        if (!this.isModified('password')) {
          return  next();
        }
    const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword;
        next();
    }
     )


export const User = mongoose.model('User', schema);


