export default function IsAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Apenas os administradores podem executar essa função!' });
    }
    next();
}