import express from "express";
import { loginStore, logoutStore, profile } from "../controllers/authStoreController.js";
import authStore from "../middlewares/authStore.js";

const router = express.Router();

router.post("/login", loginStore);
router.post("/logout", logoutStore);
router.get("/profile", authStore, profile);

export default router;
