import {
  DataDTO,
} from './dto';

export default interface IHelloRepository {
  getDate(data: DataDTO): Promise<String>;
}
