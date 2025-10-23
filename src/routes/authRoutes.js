import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Bem-vindo ao perfil!", userId: req.user.id });
});

export default router;