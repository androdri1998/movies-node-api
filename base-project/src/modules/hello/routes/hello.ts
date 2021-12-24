import { Router } from 'express';
import multer from 'multer';

import HelloController from '../controllers/HelloController';
import HelloRepository from '../repositories/implementations/HelloRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import database from '../../app/db';
import uploadConfig from '../../../config/upload';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../../app/middlewares/ensureAuthentication';
import StorageProvider from '../../app/providers/implementations/StorageProvider';
import {
  helloSchema,
} from '../schemas/hello.schema';

const upload = multer(uploadConfig.multer);

const helloRouter = Router();

const storageProvider = new StorageProvider();
const helloRepository = new HelloRepository(database);
const databaseRepository = new DatabaseRepository(database);

const helloController = new HelloController(
  helloRepository,
  databaseRepository,
  storageProvider,
);

helloRouter.post(
  '/upload',
  [upload.array('upload', 2)],
  helloController.store,
);

helloRouter.get(
  '/',
  [ensureAuthentication, validateParams(helloSchema)],
  helloController.get,
);

export default helloRouter;
