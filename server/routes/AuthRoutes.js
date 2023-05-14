import express from "express";
import { loginController, registerController } from "../controller/AuthController.js";
import { ProtectedRoute, isAdmin } from "../middleware/AuthMiddleware.js";

const router = express.Router();

/* routing */

/* register */
router.post( '/register', registerController );

router.post( '/login', loginController );

router.get( '/admin-auth', ProtectedRoute, isAdmin, ( req, res ) =>
{
    return res.status( 200 ).send( { ok: true } );
} );

export default router;