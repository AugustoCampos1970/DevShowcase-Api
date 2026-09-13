const express = require('express');
const app = express();
const PORT = 3001; // Usando porta diferente para evitar conflitos

app.use(express.json());

// Rota simples de teste
app.get('/test', (req, res) => {
  res.json({ message: 'API de teste funcionando!', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor de teste funcionando',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor de teste rodando na porta ${PORT}`);
  console.log(`🔗 Teste: http://localhost:${PORT}/test`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});