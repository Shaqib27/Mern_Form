const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ Message: "User is already Exit", success: false })
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "Signup successfuly",
            success: true
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errmsg = "Auth failed email or password is wrong"
        if (!user) {
            return res.status(403).json({ Message: errmsg, success: false })
        }
        const ispassEql = await bcrypt.compare(password, user.password);
        if (!ispassEql) {
            return res.status(403).json({ message: errmsg, success: false });
        }

        const jwtToken = jwt.sign({ email: email.user, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "login successfuly",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })

    }
}


module.exports = {
    signup,
    login,
}