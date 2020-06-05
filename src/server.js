const express = require("express")
const server = express()

//pasta publica configurada
server.use(express.static("public"))


//utilizando template engine npm install nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:server,
    noCache:true
})
//configuração de caminho para a aplicação
server.get("/" , (req,res) => {
    return res.render("index.html", {title: "Seu marketplace de coleta de resíduos"})
})

server.get("/create-point" , (req,res) => {
   return res.render("create-point.html")
})

server.get("/search" , (req,res) => {
    return res.render("search-results.html")
 })

 
 
server.listen(3000)
