const express = require('express');
const app = express();
const { Joke, Sequelize } = require('./db');
const { Op } = require("sequelize");
const e = require('express');

app.set("json spaces", "\t");
app.use(express.json());

app.get('/jokes', async (req, res, next) => {
  if (req.query.tags){
    try {
      // TODO - filter the jokes by tags and content
      const jokes = await Joke.findAll({
        where: {
          tags: {
            [Op.substring]: req.query.tags,
          }
        }
      });
      res.send(jokes);
    } catch (error) {
      console.error(error);
      next(error)
    }
    return;
  }
  if (req.query.content){
    try {
      // TODO - filter the jokes by tags and content
      const jokes = await Joke.findAll({
        where: {
          joke: {
            [Op.substring]: req.query.content,
          }
        }
      });
      res.send(jokes);
    } catch (error) {
      console.error(error);
      next(error)
    }
    return;
  }
  try {
    // TODO - filter the jokes by tags and content
    const jokes = await Joke.findAll();
    res.send(jokes);
  } catch (error) {
    console.error(error);
    next(error)
  }
});
app.get('/jokes/:id', async (req, res, next)=> {
  try {
    const jokes = await Joke.findByPk(req.params.id);
    res.send(jokes)
  } catch (error) {
    console.error(error);
    next(error)
  }
})
app.post('/jokes', async(req, res, next) => {
  try {
    const joke = await Joke.create(req.body);
    res.status(201).send(joke)
  } catch (error) {
    console.error(error);
    next(error)
    
  }
});

app.put('/jokes/:id', async(req, res, next)=> {
  try {
    const joke = await Joke.put(req.body);
    res.status(201).send(joke);
  } catch (error) {
    console.error(error);
    next(error);
  }
})



// we export the app, not listening in here, so that we can run tests
module.exports = app;
