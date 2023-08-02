import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import { Token, User } from "models";
import { generate_acc_no } from "utils";

const phoneNumberPattern = /^0[987][01][0-9]{8}$/;

async function register(req: Request, res: Response) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      address,
      phone_number,
      repeatpassword,
      date_of_birth,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !gender ||
      !email ||
      !password ||
      !address ||
      !phone_number ||
      !repeatpassword ||
      !date_of_birth
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== repeatpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (!phoneNumberPattern.test(phone_number)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const user = User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }
    const check_token = await Token.findOne({ email: email.toLowerCase() });
    if (!check_token) {
      const token = crypto.randomBytes(4).toString("hex");
      const new_token = new Token({
        token,
        email: email.toLowerCase(),
      });
      await new_token.save();
      //Token should be sent to the user via a send email service
    } else {
      const token = check_token.token;
      //Token should be sent to the user via a send email service
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const account_number = generate_acc_no(phone_number);
    const new_user = new User({
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      email: email.toLowerCase(),
      authentication: { password: hashedPassword },
      gender: gender.toLowerCase(),
      address: address.toLowerCase(),
      phone_number: phone_number.toLowerCase(),
      account_balance: "0.00",
      verified: true, //this will change once i get the auth service up nad running
      date_of_birth,
      account_number,
    });

    const saved_user = await new_user.save();
    return res.status(201).json({ user: saved_user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

export { register };
