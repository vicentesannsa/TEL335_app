'use strict'

const port = 3001

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(serve(`./assets`));

router.get('/', async (ctx, next) => {
    ctx.body = FileSystem.createReadStream('index.html')
});

router.post('/recetas', async (ctx, next) => {
    ctx.body = 'Datos enviados';
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => console.log(`Iniciando Koa.JS en http://127.0.0.1:${port}/`));