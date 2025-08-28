import express from 'express'
import { login,logout,signup } from '../Controller/user.controller.js';

const router = express.Router();

router.route("/Register").post(signup);
router.route("/Login").post(login);
router.route("/Logout").post(logout);


export default router;