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

app.use(bodyParser());

const staticPath = path.join(__dirname, 'assets');
app.use(serve(staticPath));

app.use(async (ctx) => {
    const url = ctx.request.url;

    if(ctx.path == '/'){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'index.html'));
    }

    if (url.startsWith('/cocktail/')){
        

        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'cocktail.html'));
    }

    if(ctx.path == '/cocktail-add'){
        ctx.type = 'html';
        ctx.body = fs.createReadStream(path.join(staticPath, 'add.html'));
    }

    if(ctx.path == '/recetas' && ctx.method == 'POST'){
        const body = ctx.request.body;

        for (const property in body) {
            if (property == "ingredients" || property == "preparation") {
                body[property] = body[property].replace(/\r|\n/g, "").split(".")
                body[property].pop()
            }
        }

        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(body)
            }

            res = await fetch("http://localhost:3000/recetas", options),
            json = await res.json();

            if(!res.ok) throw {status: res.status, statusText: res.statusText};
            
            ctx.redirect("/cocktail-add")
        } catch (err) {
            console.log(err);
            ctx.redirect("/")
        }
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