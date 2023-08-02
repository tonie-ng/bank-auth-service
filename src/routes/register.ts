import { register } from "controllers";
import express from "express";

const router = express.Router();

router.post("/register", register);

export { router };
