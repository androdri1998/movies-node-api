import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IHelloRepository from '../repositories/IHelloRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  photoUpload: string | null;
}

interface ExecuteResponse {
  another_message: string;
}

export default class HelloStoreService {
  private helloRepository: IHelloRepository;
  private databaseRepository: IDatabaseRepository;
  private storageProvider: IStorageProvider;

  constructor(helloRepository: IHelloRepository, databaseRepository: IDatabaseRepository, storageProvider: IStorageProvider) {
    this.databaseRepository = databaseRepository;
    this.helloRepository = helloRepository;
    this.storageProvider = storageProvider;

    this.execute = this.execute.bind(this);
  }

  async execute({ photoUpload }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const response = await this.helloRepository.getDate({ month: 1 });
      if (!response) {
        throw new AppError(
          messages.errors.INTERNAL_ERROR_SERVER,
          HTTPStatusCode.INTERNAL_SERVER_ERROR,
        )
      }

      let photoUploadSaved = null;
      if (photoUpload) {
        photoUploadSaved = await this.storageProvider.saveFile(photoUpload);
      }

      await this.databaseRepository.commit();

      return { another_message: `filename: ${photoUpload}` }
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}
