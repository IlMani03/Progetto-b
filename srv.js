const express = require('express');

const app = express();
const server = express();
server.use(express.static("public"));
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://IlMani:ilmani@cluster0.d04jj.mongodb.net/Database?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.once("open", ()=>{
    console.log("conneso a mongo db");
});


server.use(express.static(__dirname +'public'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => 
{
    console.log("listening on");
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index2.html");
});

app.get("/torna", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {
   var nome = req.body.nome;
   var cognome = req.body.cognome;
   var classe = req.body.classe
   var data = new Date();

    var dati =  {
    "nome": nome,
    "cognome": cognome,
    "classe": classe,
    "data": data
   };
   db.collection(classe.toUpperCase()).insertOne(dati);
   console.log("nome: " + nome);
   console.log("cognome: " + cognome);
   console.log("classe: " + classe);
   res.send("grazie per aver inserito i dati");
});