import express from "express";
import { check } from "express-validator";
import { getUsers, login } from "../controllers/users";

/* ************************************************************** */

export const usersRoutes = express.Router();

usersRoutes.get("/", getUsers);

usersRoutes.post("/login", [check("phone").not().isEmpty()], login);
