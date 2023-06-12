'use strict'

const port = 3001

const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

const staticPath = path.join(__dirname, 'assets');
app.use(serve(staticPath));

app.use(async (ctx) => {
    if(ctx.path == '/'){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'index.html'));
    }

    if(ctx.path == '/cocktail-add'){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'add.html'));
    }

    if(ctx.path == '/recetas' && ctx.method == 'POST'){
        ctx.body = 'Datos enviados';
        console.log(ctx.path, ctx.method);
    }

    if(ctx.path == '/enterprise'){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'enterprise.html'));
    }
  });

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => console.log(`Iniciando Koa.JS en http://127.0.0.1:${port}/`));