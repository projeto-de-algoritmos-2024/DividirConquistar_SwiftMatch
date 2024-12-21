import express from 'express';
import sequelize, { authenticate } from './config/database.js';
import Usuario from './models/User.js';
import cors from 'cors';


const app = express();

app.use(cors());

app.use(express.json());

// Testando a conexão com o banco de dados
authenticate();

sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });

// Rota para criar um novo usuário
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
    }
  
    try {
      // Verifique se o nome de usuário já existe
      const existingUser = await Usuario.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }
  
      // Criar o novo usuário
      const newUser = await Usuario.create({ username, password });
      res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Verifique se o nome de usuário existe
    const user = await Usuario.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
  
    // Verifique se a senha está correta (use uma biblioteca de hash para comparar as senhas)
    if (user.password !== password) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
  
    // Caso o login seja bem-sucedido, retorne um sucesso
    return res.status(200).json({ message: 'Login bem-sucedido' });
  });
  
  
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});