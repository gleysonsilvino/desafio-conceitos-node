const express = require("express");
const cors = require("cors");
const {uuid, isUuid} = require('uuidv4');
// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validadeID(request, response, next) {
  const {id} = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({error: "Invalid repository ID."})
  }
  return next();
}

app.use('/repositories/:id', validadeID);

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  // TODO
  const {url, title, techs} = request.body;
  
  const repository = {
    id : uuid(),
    url,
    title,
    techs,
    likes:0
  } 
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {url, title, techs} = request.body;
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json("Repository not found");
  }
  const repository = {
    id,
    url,
    title,
    techs,
    likes:repositories[repositoryIndex].likes
  } 
  repositories[repositoryIndex] = repository;
  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json("Repository not found");
  }

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if(repositoryIndex < 0) {
    return response.status(400).json("Repository not found");
  }
  repositories[repositoryIndex].likes+=1;
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
