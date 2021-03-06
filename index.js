const express = require("express");

const server = express();

server.use(express.json());

//arrProjects é o lugar onde serão armazenados os projetos e suas tarefas
const arrProjects = [];

//requestCounter será o lugar onde armazenaremos a quantidade de requisições feitas em nessa api.
let requestCounter = 0;

/**
 * Crie um middleware global chamado em todas requisições que imprime (console.log)
 * uma contagem de quantas requisições foram feitas na aplicação até então;
 */
server.use((req, res, next) => {
  requestCounter++;
  console.log(`Requisições feitas até o momento: ${requestCounter}`);
  return next();
});

/**
 * Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto
 * nos parâmetros da URL que verifica se o projeto com aquele ID existe.
 * Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;
 */
function verifyProjectExistence(req, res, next) {
  const { id } = req.params;
  const found = arrProjects.find(item => item.id === id);

  if (!found) {
    return res.status(400).json({ message: "Project not found!" });
  }

  return next();
}

/**
 * ROTA: POST /projects: A rota deve receber ide title dentro do corpo de cadastrar um
 * novo projeto dentro de um array no seguinte formato { id: "1", title: "Novo Projeto", tasks: [] };
 * Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.
 */
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const newProject = {
    id,
    title,
    tasks: []
  };
  arrProjects.push(newProject);
  return res.status(200).json({ message: "Project created successfuly!" });
});

/*
ROTA: GET /projects: Rota que lista todos os projetos e suas tarefas;
*/
server.get("/projects", (req, res) => {
  return res.json(arrProjects);
});

/*
ROTA: PUT /projects/:id: A rota deve alterar apenas o título do projeto com o id presente nos parâmetros da rota;
*/
server.put("/projects/:id", verifyProjectExistence, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const found = arrProjects.find(item => item.id === id);
  found.title = title;

  return res.status(201).json({ message: "Project updated successfuly!" });
});

/*
ROTA: DELETE /projects/:id: A rota deve deletar o projeto com o id presente nos parâmetros da rota;
*/
server.delete("/projects/:id", verifyProjectExistence, (req, res) => {
  const { id } = req.params;

  const index = arrProjects.findIndex(item => item.id === id);
  arrProjects.splice(index, 1);

  return res.status(200).json({ message: "Project removed successfuly!" });
});

/*
ROTA: POST /projects/:id/tasks: A rota deve receber um campo title e armazenar 
uma nova tarefa no array de tarefas de um projeto específico escolhido 
através do id presente nos parâmetros da rota;
*/
server.post("/projects/:id/tasks", verifyProjectExistence, (req, res) => {
  const { id } = req.params;
  const { taskTitle } = req.body;

  const found = arrProjects.find(item => item.id === id);
  found.tasks.push(taskTitle);

  return res
    .status(200)
    .json({ message: `Task created on ${found.title} Project!` });
});

server.listen(3000);
