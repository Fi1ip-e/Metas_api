const express = require('express');
const app = express();
const cors = require('cors');

require('./models/metas');
const mongoose = require('mongoose');
const Meta = mongoose.model('Meta');
 
//>>>>>CONEXÃO COM O BANCO
mongoose.connect('mongodb://localhost/mymetas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexão realizada com sucesso");
}).catch((err) => {
  console.log("Falha ao conectar com o banco " + err);
})

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors());
  next();
})

//>>>> ROTAS

app.get('/cadastrar', async (req, res) => {
  return res.json({nome: 'Semana do backand'});
});
app.get('/metas', async (req, res) => {
  await Meta.find({}).then((metas) => {
    return res.json({
      error: false,
      metas
    });
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "Nenhum registro encontrado"
    })
  })
})
app.post('/meta', async (req, res) => {

  await sleep(3000);
  function sleep(ms){
    return new Promise((resolve) => {
      setTimeout(resolve,ms);
    })
  }

  await Meta.create(req.body, (err) => {
    if (err) return res.status(400).json({
      error: true,
    message: "erro: Meta não cadastrada!"
    })
  })
  return res.json({message: "Meta cadastrada com sucesso!"})
})
 
app.listen(8081), () => {console.log("Aplicação rodando")};