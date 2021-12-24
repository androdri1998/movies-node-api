import { Router } from 'express';

import helloRoutes from '../../hello/routes';

const appRoutes = Router();

appRoutes.use(helloRoutes);

export default appRoutes;
