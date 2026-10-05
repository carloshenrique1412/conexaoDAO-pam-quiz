import express from 'express'
import cors from 'cors'

import { inserirUsuario } from './DAO/usuarios/inserirUsuario.js'
import { inserirResultado } from './DAO/resultado/inserirResultado.js'

import { inserirResposta } from './DAO/respostas/inserirRespostas.js'
import { buscarResposta } from './DAO/respostas/buscarRespostas.js'
import { buscarResultado } from './DAO/resultado/buscarResultado.js'
import { buscarusuario } from './DAO/usuarios/buscarUsuario.js'


const app = express()
app.use(cors())
app.use(express.json())


// Rota Base
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do quiz Rodando perfeitamente!' })
})


app.get('/api/buscarRespostas', async (req, res) => {
  let respostas = await buscarResposta();
  res.json(respostas);
})

app.get('/api/buscarResultado', async (req, res) => {
  let resultado = await buscarResultado();
  res.json(resultado);
})

app.get('/api/buscarUsuario', async (req, res) => {
  let usuario = await buscarusuario();
  res.json(usuario);
})

app.post("/api/resultado", async (req, res) => {
  const { nome, email, estado, sexo, acertos, respostas } = req.body;
  console.log("Recebendo dados do quiz:", req.body);
  try {
    const resultUsuario = await inserirUsuario([nome, email, estado, sexo]);
    console.log("Resultado inserirUsuario:", resultUsuario);

    const usuarioId = resultUsuario.insertId;
    console.log("usuarioId:", usuarioId);

    const resultResultado = await inserirResultado([usuarioId, acertos]);
    console.log("Resultado inserirResultado:", resultResultado);

    const resultadoId = resultResultado.insertId;
    console.log("resultadoId:", resultadoId);

    for (const r of respostas) {
      const resultResposta = await inserirResposta([resultadoId, r.questao, r.alternativaMarcada]);
      console.log("Resultado inserirResposta:", resultResposta);
    }

    res.status(201).json({ mensagem: "Salvo com sucesso!" });
  } catch (erro) {
    console.error("Erro ao inserir resultado do quiz:", erro);
    res.status(500).json({ erro: erro.message });
  }
});
// Inicialização do Servidor
app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000')
})
