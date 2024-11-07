import express from 'express';
import rootRoutes from '../src/routes'
import * as dotenv from 'dotenv';
import cors from 'cors'


dotenv.config();
const app = express();
const port = 3000;

app.use(express.json())
app.use('*',cors())

app.use('/api/v1',rootRoutes)



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});