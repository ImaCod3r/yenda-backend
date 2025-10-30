import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function authStore(req, res, next) {
    const token = req.cookies.store_token;

    if (!token)
        return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== "store")
            return res.status(403).json({ message: "Acesso negado" });

        req.store = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido", error: error.message });
    }
};