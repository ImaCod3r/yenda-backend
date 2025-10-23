import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    // Pega o token do cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Acesso negado. Faça login primeiro." });
    }
    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Anexa o usuário no request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
