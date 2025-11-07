import User from "../models/User.js";
import bcrypt from "bcryptjs";

async function getAllUsers(_, res) {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, number, email, password, photo, province, street, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    // const isOwner = String(req.user.id) === String(user.id);
    // const isAdmin = req.user.role === "admin";

    // Permissões:
    // - Dono pode alterar suas próprias informações (exceto role)
    // - Admin pode alterar qualquer usuário (inclusive role)
    // if (!isOwner && !isAdmin) {
    //   return res.status(403).json({ message: "Você não tem permissão para alterar este usuário." });
    // }

    // // Validação de role (apenas admin pode mudar)
    // if (role !== undefined) {
    //   if (!isAdmin) {
    //     return res.status(403).json({ message: "Apenas administradores podem alterar o cargo." });
    //   }

    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Role inválido." });
    }

    if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.update({
    name: name ?? user.name,
    number: number ?? user.number,
    email: email ?? user.email,
    password: user.password,
    photo: photo ?? user.photo,
    province: province ?? user.province,
    street: street ?? user.street,
    role: role ?? user.role,
    updated_at: new Date(),
  });

  res.json({ message: "Usuário atualizado com sucesso", user });

} catch (error) {
  console.error(error)
  res.status(500).json({ message: "Erro ao atualizar usuário", error });
}
};

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover usuário", error });
  }
};

export { getAllUsers, deleteUser, updateUser, getUserById }