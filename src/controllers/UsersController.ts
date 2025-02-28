import { Request, Response } from "express";
import User from "../models/Userss";
import Comment from "../models/Comments";
import { sequelize } from '../config/database';
import bcrypt from "bcryptjs";


const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({ ...req.body, password: hashedPassword, attempts: 3 });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getUsers: async (_req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  getUserLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      console.log(`Buscando usuario con email: ${email}`);

      // Buscar el usuario por su email
      const user = await User.findOne({
        where: { email },
        include: [{
          model: Comment,
          as: 'comments'
        }]
      });

      if (!user) {
        console.log(`Usuario con email: ${email} no encontrado`);
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log(`Contraseña incorrecta para el usuario con email: ${email}`);
        
        // Restar un intento
        user.attempts -= 1;
        await user.save();

        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      console.log(`Usuario encontrado: ${JSON.stringify(user)}`);

      res.status(200).json(user);
    } catch (error) {
      console.error(`Error al obtener el usuario con comentarios: ${(error as Error).message}`);
      res.status(500).json({ error: (error as Error).message });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const [updated] = await User.update(req.body, { where: { user_id: req.params.user_id } });
      if (updated) {
        const updatedUser = await User.findByPk(req.params.user_id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      const { user_id } = req.params;

      // Eliminar los comentarios asociados al usuario
      const commentsDeleted = await Comment.destroy({
        where: { id_user: user_id },
        transaction
      });

      // Eliminar el usuario
      const deleted = await User.destroy({
        where: { user_id: user_id },
        transaction
      });

      if (deleted) {
        await transaction.commit();
        res.status(200).json({ message: "Usuario y comentarios eliminados exitosamente" });
      } else {
        await transaction.rollback();
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: (error as Error).message });
    }
  },
  
  deleteAllData: async (_req: Request, res: Response) => {
    const transaction = await sequelize.transaction();
    try {
      // Eliminar todos los comentarios
      await Comment.destroy({
        where: {},
        transaction
      });

      // Eliminar todos los usuarios
      await User.destroy({
        where: {},
        transaction
      });

      await transaction.commit();
      res.status(200).json({ message: "Todos los datos eliminados exitosamente" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: (error as Error).message });
    }
  },

  partialUpdateUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.user_id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      await User.update(req.body, { where: { user_id: req.params.user_id } });
      const updatedUser = await User.findByPk(req.params.user_id);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};

export default userController;