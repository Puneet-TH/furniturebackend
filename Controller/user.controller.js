import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req,res) => {
    try {
        const { fullName, email, phoneNumber, password } = req.body;
        if (!fullName || !email || !phoneNumber || !password) {
            return res.json({
                success: false,
                message: "Please fill all the information"
            })
        }

        const user = await User.findOne({email});
        if (user) {
            return res.json({
                success: false,
                message: "Email already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword
        })


        const tokenData = {
            userId: newUser._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(201).json({
            message: "Account created",
            success: true,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating account"
        })
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not exist"
            })
        }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Email or password is wrong"
            })
        }

        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            succes:true,
            message:`welcome back ${user.fullName}`,
            user:{
                _id:user._id,
                fullName:user.fullName,
                email:user.email,  
            }
        })


    } catch (error) {
        return res.status(500).json({
                success: false,
                message: "server error while login"
            })
    }
}


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out"
    });
  }
};
