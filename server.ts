import express from 'express'
import indexRoute from './routers/indexRoute';
import characterRoutes from './routers/characterRoutes';
import { connectToMongoDB } from './utils/db';
import { addAllCharacters } from './services/characterService';

const port = 3000;
const app = express();

app.use(express.json());
app.use('/character', characterRoutes);
app.use('/', indexRoute);

app.listen(port, async () => {
  await connectToMongoDB();
  await addAllCharacters('data'); // Add all characters from 'data' folder to the DB when the server starts
  console.log(`Server is running on http://localhost:${port}`);
});
