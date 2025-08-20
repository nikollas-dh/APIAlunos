// importando express
const express = require("express");
// cria aplicação
const app = express();
app.use(express.json());
const porta = 3000;

const alunos = [
    {
        id: 1,
        nome: "Nikollas",
        idade: "18",
        cpf: "4582324",
        cep: "01234567",
        uf: "SP",
        rua: "Av. Central",
        numero: 127,
        complemento: "Apto 15"
    },
]
app.get("/alunos", (req, res) => {
    res.json(alunos)
})
app.get("/alunos/:id",(req,res) =>{
    const id = parseInt(req.params.id)
    const aluno = alunos.find( (aluno => aluno.id === id))    
    if(aluno){
        res.json(aluno)
    }else{
        res.status(404).json(
            {erro: "Aluno não encontrado"}
        )
    }
})
app.post("/alunos", (req, res) => {
    const {nome, idade,cpf,cep,numero,uf,rua} = req.body;
     if (cpf.length != 11){
        return res.status(400).json({
            erro: "CPF contém 11 caracteres"
        })
    }
    if(!nome || !idade || !cpf || !cep || !numero || !uf || !rua)
    {
        return res.status(400).json({
            erro: "Existem campos obrigatórios a serem preenchidos!"
        })
    }  
    const existeCPF = alunos.filter((aluno => aluno.cpf === cpf)) 
   // existeCPF.length > 0 ?  console.log(existeCPF) :    console.log("CPF não existe")
     if(existeCPF.length > 0){
        return res.status(409).json({ 
            erro: "CPF existe na base"
     })
     }
    const id = alunos.length > 0? alunos [alunos.length-1].id +1:1
    const novoAluno = {id,nome,cpf,cep,numero,uf,rua}
    alunos.push(novoAluno)
    res.status(201).json({msg : "Criado com sucesso"})
})
app.delete("/alunos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const indice = alunos.findIndex(a => a.id === id)
    if( indice === -1){
        return res.status(404).json({
            mensagem :"Aluno não encontrado"
        })
    }
    console.log(indice)
    alunos.splice(indice,1);
    res.status(204).json({
        mensagem: "Aluno deletado com sucesso!"
    }) 
})

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));