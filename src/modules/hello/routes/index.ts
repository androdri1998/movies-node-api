import { Router } from 'express';

import helloRoutes from './hello';

const helloRouter = Router();

helloRouter.use('/hello', helloRoutes);

export default helloRouter;
