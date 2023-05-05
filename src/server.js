import express from 'express';
import morgan from 'morgan';
import routerProducts from './routes/productsRouter.js';
import routerCart from './routes/cartRouter.js'
import Path from './path.js'
import bodyParser from 'body-parser'
const app = express();
const port = 8080;
const path = Path

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(path + '/public'))


app.use('/products', routerProducts);
app.use('/carts', routerCart)

app.listen(port, ()=>{
console.log('server ok en port', port)
});