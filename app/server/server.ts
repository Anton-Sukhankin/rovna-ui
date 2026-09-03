import express from 'express';

const app = express();

app.get('/api', (request, response) => {
  return response.json([1, 2, 3, 4, 5]);
});
app.get('/api/todos/', (request, response) => {
  return response.json([1, 2, 3, 4, 5]);
});
app.post('/api/upload/', (request, response) => {
  response.json('Hello World');
});
app.listen(8080, () => {
  console.log('Server has stared');
});
