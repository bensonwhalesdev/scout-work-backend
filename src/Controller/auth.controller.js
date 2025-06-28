const User = require("../Model/auth.model")


const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "User logged in successfully", user });
        } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        }
}
module.exports = { 
    register ,
    login
};