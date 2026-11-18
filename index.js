const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilita CORS para aceitar requisições do frontend
app.use(cors());

// Rota principal para verificação rápida
app.get('/', (req, res) => {
  res.send('API de Data e Hora está online!');
});

// Rota de consulta de data e hora
app.get('/api/datetime', (req, res) => {
  const agora = new Date();

  const data = agora.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  const hora = agora.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  res.json({
    data,
    hora,
    iso: agora.toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});