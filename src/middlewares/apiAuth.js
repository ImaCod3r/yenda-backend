import dotenv from "dotenv";
dotenv.config();

export const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-secret-key'];
    const validApiKey = process.env.API_SECRET_KEY;

    if (!apiKey || apiKey !== validApiKey) {
        return res.status(403).json({ error: "Acesso negado. Chave de API inválida ou ausente." });
    }

    next();
};
