const express = require('express');
const app = express();
const path = require('path');
const { conn, Task, User } = require('./db');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/tasks', async(req, res, next)=> {
  try {
    res.send(await Task.findAll({
      attributes: {
        exclude: ['image']
      },
      order: [['priority', 'asc']]
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/tasks/:id/image', async(req, res, next)=> {
  try {
    const task = await Task.findByPk(req.params.id);
    const image = task.image;
    const [header, data] = image.split(',');
    const bytes = Buffer.from(data, 'base64');
    const contentType = header.slice(5).split(';')[0];
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': bytes.length
    });
    res.end(bytes);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/tasks/:id', async(req, res, next)=> {
  try {
    const task = await Task.findByPk(req.params.id);
    res.send(await task.update(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/tasks', async(req, res, next)=> {
  try {
    res.status(201).send(await Task.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ error: err.message });
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    if(process.env.NO_SEED){
      return;
    }
    await conn.sync({ force: true });
    const [quq, trash, milk] = await Promise.all(
      ['quq', 'take out trash', 'get milk'].map( name => Task.create({ name }))
    );
    await milk.update({ isComplete: true, priority: 1 });
    const [moe, lucy, larry] = await Promise.all(
      ['moe', 'lucy', 'larry'].map( name => User.create({ name }))
    );

    await trash.update({ userId: moe.id });
    require('fs').readFile('trash.png', 'base64', async(err, data)=> {
      const image = `data:image/png;base64,${data}`;
      await trash.update({ image });
    });
  }
  catch(ex){
    console.log(ex);
  }
});
