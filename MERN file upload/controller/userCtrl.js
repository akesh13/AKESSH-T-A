const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createAccessToken , createRefreshToken } = require('../middleware/token')


const userCtrl = {
    register: async (req, res) => {
        try {
            // res.json({ msg: "register controller called"})

            const { name, email, mobile, password } = req.body;

            if(password.length < 6)
                return res.status(400).json({ msg: "Password must be atleast 6 characters."})

            // encrypt the password
            let passHash = await bcrypt.hash(password, 10);


            // validate email and mobile
            let extUser = User.findOne({ email });
            if (extUser.email === email)
                    return res.status(400).json({ msg: "Email id already registered"})

            if(extUser.mobile === mobile)
                return res.status(400).json({ msg: "Mobile number already registered" })

            // pass data through model
            let newUser = User({
                name,
                email,
                mobile,
                password:passHash
            });

            await newUser.save();

                res.status(200).json({msg: "User Registered Successfully"})

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            // res.json({ msg: "login controller called"})
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).json({ msg: "User doesn't exists." });

            // res.json({ data: user })
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                        return res.status(400).json({ msg: "Password doesn't match"})

            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/v1/auth/refresh_token'
            })

            res.json({ accessToken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
     },
    logout: async (req, res) => {
        try {
            // res.json({ msg: "logout controller called"})
            res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh_token' })
            return res.status(200).json({ msg: "Logout successfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
     },
    getUser: async (req,res) => {
        try {
            // res.json({ msg: "get user controller called"})
            const user = await User.findById(req.user.id).select('-password')
                if(!user)
                    return res.status(400).json({ msg: "user doesn't exists."})
            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: async (req, res) => {
        // this controller used to manage auth session
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token)
                return res.status(400).json({ msg: "Session Expired, Login Again.." })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err)
                    return res.status(400).json({ msg: "Invalid Authentication. Login Again." })

                const accessToken = createAccessToken({ id: user.id })
                res.json({ accessToken })
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};

module.exports = userCtrl;