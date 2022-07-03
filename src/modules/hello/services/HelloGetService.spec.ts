import IDatabase from '../../app/db/IDatabase';
import IHelloRepository from '../repositories/IHelloRepository';
import FakeHelloRepository from '../repositories/fakes/FakeHelloRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import HelloGetService from './HelloGetService';

let fakeHelloRepository: IHelloRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let helloGetService: HelloGetService;

describe('HelloGetService', () => {
  beforeEach(() => {
    fakeHelloRepository = new FakeHelloRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);

    helloGetService = new HelloGetService(
      fakeHelloRepository,
      fakeDatabaseRepository,
    );
  });

  it('should to be able to make a simple test', async () => {
    const response = await helloGetService.execute({
      message: 'test message',
    });

    expect(response.another_message).toBe('another_message: test message');
  });
});
