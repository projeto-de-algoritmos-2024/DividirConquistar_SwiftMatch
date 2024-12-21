// src/routes/usuario.js
import express from 'express';
import Usuario from '../models/User.js'; // Importa o modelo

const router = express.Router();

// Rota para criar um novo usuário
router.post('/registrar', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
  }

  try {
    // Criar o usuário no banco de dados sem criptografar a senha
    const usuario = await Usuario.create({
      nome,
      senha,  // A senha é armazenada como texto claro
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

export default router;
