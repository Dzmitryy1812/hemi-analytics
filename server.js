const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Обслуживание статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Корневой маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Маршрут для получения данных о стоимости газа Ethereum
app.get('/eth-gas', async (req, res) => {
  try {
    const response = await axios.get('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YOUR_API_KEY');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Ошибка при получении данных о стоимости газа');
  }
});

// Маршрут для получения текущих цен на BTC и ETH
app.get('/prices', async (req, res) => {
  try {
    const ethPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const btcPrice = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    res.json({
      eth: ethPrice.data.ethereum.usd,
      btc: btcPrice.data.bitcoin.usd
    });
  } catch (error) {
    res.status(500).send('Ошибка при получении данных о ценах');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен по адресу http://localhost:${port}`);
});
