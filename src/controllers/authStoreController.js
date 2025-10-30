import Store from "../models/Store.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

async function loginStore(req, res) {
    try {
        const { email, password } = req.body;

        const store = await Store.findOne({ where: { email } });
        if (!store) return res.status(404).json({ message: "Loja não encontrada" });

        const isMatch = await bcrypt.compare(password, store.password);
        if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

        const token = jwt.sign(
            { id: store.id, role: "store" },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("store_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            message: "Login bem-sucedido",
            store: {
                id: store.id,
                name: store.name,
                email: store.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no login", error: error.message });
    }
};

async function profile(req, res) {
    try {
        const store = await Store.findByPk(req.store.id, {
            attributes: [
                "id",
                "isVerified",
                "nif",
                "longitude",
                "latitude",
                "name",
                "number",
                "whatsapp",
                "description",
                "email",
                "photo",
                "role",
                "category_id",
                "address",
                "created_at",
                "updated_at",
            ],
        });

        if (!store)
            return res.status(404).json({ error: "Loja não encontrada." });

        return res.json({ store });
    } catch (err) {
        console.error("Profile error:", err);
        return res.status(500).json({ error: "Erro ao carregar perfil da loja." });
    }
}

async function logoutStore(req, res) {
    try {
        res.clearCookie("store_token", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.json({ message: "Logout efetuado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao sair", error: error.message });
    }
}

export { loginStore, logoutStore, profile }