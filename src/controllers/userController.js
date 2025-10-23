import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // nunca retornar senha
      order: [["id", "ASC"]],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

export const getUserById = async (req, res) => {
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
export const updateUser = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Não autorizado" });
    }

  const { id } = req.params;
  const { name, number, email, password, photo, country, province, street, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const isOwner = String(req.user.id) === String(user.id);
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Não autorizado a modificar outro usuário" });
    }

    // If role is provided, only admins can change it
    if (role !== undefined) {
      const allowedRoles = ["user", "admin"];
      if (!isAdmin) {
        return res.status(403).json({ message: "Apenas administradores podem alterar o role" });
      }
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role inválido" });
      }
    }

    if (password) user.password = await bcrypt.hash(password, 10);

    await user.update({
      name: name || user.name,
      number: number || user.number,
      email: email || user.email,
      password: user.password,
      photo: photo || user.photo,
      country: country || user.country,
      province: province || user.province,
      street: street || user.street,
      role: role || user.role,
      updated_at: new Date(),
    });

    res.json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover usuário", error });
  }
};