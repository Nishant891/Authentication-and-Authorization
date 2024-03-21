import { Schema, model } from "mongoose";
import { isEmail } from 'validator';

const PasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~`!@#$%^&*()\-_=+\\|[\]{};:'",<.>/?]).{6,}$/;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User already exists"],
    validate: {
      validator: isEmail,
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (v: string) {
        return PasswordRegex.test(v);
      },
      message: (props: { value: any }) =>
        `${props.value} is not a valid password!`,
    },
  },
});

export const UserModel = model("User", UserSchema);
