import IDatabase from '../../../app/db/IDatabase';
import IHelloRepository from '../IHelloRepository';
import { DataDTO } from '../dto';

export default class HelloRepository implements IHelloRepository {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async getDate({ month }: DataDTO): Promise<String> {
    // SELECT WITH VALUES
    // const response = await this.database.query(
    //   `select foo where month = $1 `,
    //   [month],
    // );
    const response = await this.database.query(
      `select now()`
    );
    return response.results[0];
  }
}
