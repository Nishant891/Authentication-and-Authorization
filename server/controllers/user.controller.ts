import { createUser, findUser, generateAccessToken, generateRefreshToken, updateRefreshToken } from "../services/user.service";
import { User, ResponseData } from "../types/user.types";
import { Request, Response } from "express";
import { HandleError } from "../utils/error.handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { customRequest } from "../middlewares/auth.middleware";

dotenv.config();

export const createNewUser = async (req: Request, res: Response) => {
  const userData = req.body as User;
  try {
    const user = await createUser(userData);
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: true});
    res.status(200).json({
      success: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      message: "User created successfull",
    });
  } catch (err) {
    res.status(400).json(HandleError(err));
  }
};

export const createOTP = async (req: Request, res: Response) => {
  const userData = req.body as User;

  const user = await findUser(userData.email);

  if (user) {
    res.status(400).json({
      success: false,
      message: "User already exits",
    });
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);

    userData.password = hashedPassword;

    const result = await createActivationCode(userData);

    res.status(200).json({
      success: true,
      message: "Activation code created",
      payload: result,
    });
  } catch (err) {
    res.status(400).json(HandleError(err));
  }
};

export const createActivationCode = async (user: User) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const activationToken = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "3d",
    }
  );
  return {
    token: activationToken,
  };
};

export const loginUser = async (req: Request, res: Response) => {
  const userData = req.body as User;

  const user = await findUser(userData.email);

  if(!user){
    res.status(400).json({
      success: false,
      message: "User does not exits",
    });
  }

  if (!bcrypt.compare(userData.password, user.password)) {
    res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }

  const Id = {
    userId : user._id
  }
  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(Id.userId);

  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave: true});
  res
  .status(200)
  .json({
    accessToken : accessToken,
    refreshToken : refreshToken,
    success: true,
    message: "User loggedIn successfully",
  });
};

export const logoutUser = async(req:customRequest, res: Response) => {
  try {
    const userId = req.body.userId;
    await updateRefreshToken(userId);
    res
    .status(200)
    .json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (error) {
    throw new Error("Unable to logout user")
  }
}

