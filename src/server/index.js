import * as path from 'path';
import * as url from 'url';
import express from 'express';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const PORT = process.env.PORT || 3000;
// const URI_PREFIX = '/api/clients';

const app = express();
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('index', { title: 'Hey' });
});

app.listen(PORT, () => {
	console.log(`Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`);
});
