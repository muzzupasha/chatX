import express from "express";
import {checkUsername, getAuthUser, getOtherUser, Login, Logout, register} from "../controllers/userController.js";
import isAuthanticated from "../middlewares/isAuthanticated.js";

const router = express.Router();

router.route('/register').post(register); // route for user registration
router.route('/login').post(Login); // route for user login
router.route('/logout').get(Logout); // route for user logout
router.route('/me').get(isAuthanticated, getAuthUser); // route for getting the authenticated user's information
router.route('/getOtherUser').get(isAuthanticated,getOtherUser) // route for getting other users except the logged-in user
router.route('/check-username').get(checkUsername); //  route for checking if a username is available (debouncing the user search input)
 
export default router;