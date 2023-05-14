import express from "express";
import { deleteUSerController, editUSerController, getAllUsersController } from "../controller/UserController.js";

const router = express.Router();

/* user routes */

/* get all users */
router.get( '/getall-users', getAllUsersController );

/* edit user */
router.put( '/edit-user/:id', editUSerController );

/* delete user */
router.delete( '/delete-user/:id', deleteUSerController );

export default router;