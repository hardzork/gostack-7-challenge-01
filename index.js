const express = require("express");

const server = express();

server.use(express.json());

//arrProjects é o lugar onde serão armazenados os projetos e suas tarefas
const arrProjects = [];

/*
ROTA: POST /projects: A rota deve receber ide title dentro do corpo de cadastrar um 
novo projeto dentro de um array no seguinte formato { id: "1", title: "Novo Projeto", tasks: [] }; 
Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com àspas duplas.
*/
server.post("/projects", (req, res) => {
  let { id, title } = req.body;
  let newProject = {
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

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const found = arrProjects.find(item => item.id === id);
  found.title = title;

  return res.status(201).json({ message: "Project updated successfuly!" });
});

// server.use((req, res, next) => {
//   console.time("Request");
//   console.log(`método: ${req.method}; URL: ${req.url}`);
//   next();
//   console.timeEnd("Request");
// });

// function checkUserExists(req, res, next) {
//   if (!req.body.name) {
//     return res.status(400).json({ error: "User name is required" });
//   }
//   return next();
// }

// function checkUserInArray(req, res, next) {
//   const user = users[req.params.index];
//   if (!user) {
//     return res.status(400).json({ error: "User does not exists" });
//   }
//   req.user = user;
//   return next();
// }

// server.get("/users", (req, res) => {
//   return res.json(users);
// });

// server.get("/users/:index", checkUserInArray, (req, res) => {
//   const { index } = req.params;

//   return res.json(req.user);
// });

// server.post("/users", checkUserExists, (req, res) => {
//   const { name } = req.body;
//   users.push(name);
//   return res.json(users);
// });

// server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
//   const { index } = req.params;
//   const { name } = req.body;
//   users[index] = name;
//   return res.json(users);
// });

// server.delete("/users/:index", checkUserInArray, (req, res) => {
//   const { index } = req.params;
//   users.splice(index, 1);
//   res.send();
// });

server.listen(3000);
