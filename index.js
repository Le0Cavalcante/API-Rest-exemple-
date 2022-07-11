 import express, { response } from 'express';
 import  {StatusCodes}  from  'http-status-codes';

 const app = express();
 const PORT = process.env.PORT || 3000;
 let users = [
    {id: 1, name:'Leonardo Cavalcante', age: 27}, 
    {id: 2, name:'Roberta Moraes', age: 28}, 
 ];

 app.use(express.json());

 app.listen(PORT, () =>{
    console.log(`Servidor Rodando em http://localhost:${PORT}`);
 });

 
 app.get('/', function (request, response) {
    return response.send('<h1>Trabalhando com servidor express</h1>')
  }); 
  
  app.get('/users', (request, response) => {
    return response.send(users);
  });

  app.get ('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user =>{
     return (user.id === Number(userId))
    });
    return response.send(users);
  });

  app.post('/users', (request, response)=>{
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.Created).send(newUser);
  });

  app.put('/users/userId', (request, response) =>{
    const userId = request.params.userId;
    const updateUser = request.body;

    users =  users.map(user => {
      if (userId === user.id) return updateUser;
      return user;
    });
    return response.send(updateUser);

  });

  app.delete('/users/:userId', (request, response) =>{
    const userId = request.params.userId;

    users = users.filter((user)=>user.id !== Number(userId));
    return response.status(StatusCodes.NO_CONTENT). send();

  })

   