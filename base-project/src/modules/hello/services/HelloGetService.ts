import HTTPStatusCode from 'http-status-codes';

import AppError from '../../app/errors/AppError';
import messages from '../../app/intl/messages/en-US';
import IHelloRepository from '../repositories/IHelloRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';

interface ExecuteDTO {
  message: string;
}

interface ExecuteResponse {
  another_message: string;
}

export default class HelloGetService {
  private helloRepository: IHelloRepository;
  private databaseRepository: IDatabaseRepository;

  constructor(helloRepository: IHelloRepository, databaseRepository: IDatabaseRepository) {
    this.databaseRepository = databaseRepository;
    this.helloRepository = helloRepository;

    this.execute = this.execute.bind(this);
  }

  async execute({ message }: ExecuteDTO): Promise<ExecuteResponse> {
    try {
      await this.databaseRepository.beginTransaction();

      const response = await this.helloRepository.getDate({ month: 1 });
      if (!response) {
        throw new AppError(
          messages.errors.INTERNAL_ERROR_SERVER,
          HTTPStatusCode.INTERNAL_SERVER_ERROR,
        )
      }

      await this.databaseRepository.commit();

      return { another_message: `another_message: ${message}` }
    } catch (error) {
      await this.databaseRepository.rollback();
      throw error;
    }
  }
}
