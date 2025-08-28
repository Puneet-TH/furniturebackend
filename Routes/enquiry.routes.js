import express from 'express'
import { getUserEnquiries, makeEnquiry } from '../Controller/Enquiry.controller.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
const router = express.Router();



router.route("/createEnquiry").post(isAuthenticated,makeEnquiry);
router.route("/getEnquiries/:userId").get(isAuthenticated,getUserEnquiries);


export default router;