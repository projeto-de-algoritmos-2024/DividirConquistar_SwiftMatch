import express from 'express';
import sequelize, { authenticate } from './config/database.js';
import Usuario from './models/User.js';
import cors from 'cors';
import Ranking from './models/Ranking.js';


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

  try {
    const user = await Usuario.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Usuário ou senha incorretos' });
    }

    // Retorne o ID do usuário após o login
    return res.status(200).json({ message: 'Login bem-sucedido', userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.post('/api/save-ranking', async (req, res) => {
  const { userId, ranking } = req.body;

  if (!userId || !ranking) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  try {
    // Verificar se já existe um ranking para o usuário
    const existingRanking = await Ranking.findOne({ where: { userId } });

    if (existingRanking) {
      // Atualizar o ranking existente
      existingRanking.ranking = ranking;
      await existingRanking.save();
      return res.status(200).json({ message: 'Ranking atualizado com sucesso' });
    }

    // Criar um novo ranking
    const newRanking = await Ranking.create({ userId, ranking });
    res.status(201).json({ message: 'Ranking salvo com sucesso', ranking: newRanking });
  } catch (error) {
    console.error('Erro ao salvar ranking:', error);
    res.status(500).json({ message: 'Erro ao salvar ranking', error: error.message });
  }
});

// Rota para buscar amigo
app.post('/api/find-friend', async (req, res) => {
  const { username} = req.body;

  try {
    // Verifica se o usuário existe
    const user = await Usuario.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o amigo tem ranking
    const ranking = await Ranking.findOne({ where: { userId: user.id } });
    if (!ranking) {
      return res.status(400).json({ message: 'Amigo não completou o rankeamento' });
    }

    // Retorna os rankings para comparação
    return res.json({
      username: user.username,
      friendRanking: ranking.dataValues.ranking,
    });
  } catch (error) {
    console.error('Erro ao buscar amigo:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para buscar o ranking de um usuário
app.get('/api/get-ranking', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário não fornecido' });
  }

  try {
    // Busca o ranking do usuário
    const ranking = await Ranking.findOne({ where: { userId } });

    if (!ranking) {
      return res.status(404).json({ message: 'Ranking não encontrado para o usuário' });
    }

    // Retorna o ranking do usuário
    return res.json({
      userId,
      ranking: ranking.dataValues.ranking,
    });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ message: 'Erro ao buscar ranking', error: error.message });
  }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`);
});