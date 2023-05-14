import express from "express";
import { ProtectedRoute, isAdmin } from "../middleware/AuthMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

/* hospital Routes */

router.post( "/create-hospital", ProtectedRoute, isAdmin, formidable(), createHospitalController );

export default router;