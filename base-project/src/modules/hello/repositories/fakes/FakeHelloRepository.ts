import IDatabase from '../../../app/db/IDatabase';
import { generateCurrentDate } from '../../../app/utils/date';
import IHelloRepository from '../IHelloRepository';
import {
  DataDTO
} from '../dto';

export default class FakeHelloRepository implements IHelloRepository {
  private database;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async getDate({ month }: DataDTO): Promise<String> {
    return generateCurrentDate();
  }
}
