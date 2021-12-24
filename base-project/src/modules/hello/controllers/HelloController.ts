import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IHelloRepository from '../repositories/IHelloRepository';
import HelloGetService from '../services/HelloGetService';
import HelloStoreService from '../services/HelloStoreService';


export default class HelloController {
  private helloRepository: IHelloRepository;

  private storageProvider: IStorageProvider;

  private databaseRepository: IDatabaseRepository;

  constructor(helloRepository: IHelloRepository, databaseRepository: IDatabaseRepository, storageProvider: IStorageProvider) {
    this.databaseRepository = databaseRepository;
    this.helloRepository = helloRepository;
    this.storageProvider = storageProvider;

    this.store = this.store.bind(this);
    this.index = this.index.bind(this);
    this.get = this.get.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { message } = req.query;

    const helloService = new HelloGetService(
      this.helloRepository,
      this.databaseRepository
    );

    const response = await helloService.execute({ message: message as string });

    return res.status(HTTPStatusCode.OK).json(response);
  }

  async store(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const { files } = req;

    const filesUpload: Express.Multer.File[] = files as Express.Multer.File[];
    const [photoUpload, _] = filesUpload;

    const helloStoreService = new HelloStoreService(
      this.helloRepository,
      this.databaseRepository,
      this.storageProvider,
    );

    const response = await helloStoreService.execute({
      photoUpload: photoUpload ? photoUpload.filename : null,
    });

    return res.status(HTTPStatusCode.CREATED).json(response);
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res.status(HTTPStatusCode.OK).json({});
  }

  async index(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res.status(HTTPStatusCode.OK).json({});
  }

  async destroy(
    req: Request,
    res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res.status(HTTPStatusCode.NO_CONTENT).json({});
  }
}
