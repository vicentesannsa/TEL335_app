'use strict'

const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

app.use(serve(`./assets`));
app.listen(3000);

console.log('Iniciando Koa.JS en http://127.0.0.1:3000/');