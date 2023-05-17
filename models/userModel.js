import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        requireed: true,
    },
    email: {
        type: String,
        requireed: true,
        unique: true,
    },
    password: {
        type: String,
        requireed: true,
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;