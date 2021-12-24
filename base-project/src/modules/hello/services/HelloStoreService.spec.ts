import IDatabase from '../../app/db/IDatabase';
import IHelloRepository from '../repositories/IHelloRepository';
import FakeHelloRepository from '../repositories/fakes/FakeHelloRepository';
import IDatabaseRepository from '../../app/repositories/IDatabaseRepository';
import FakeDatabaseRepository from '../../app/repositories/fakes/FakeDatabaseRepository';
import IStorageProvider from '../../app/providers/IStorageProvider';
import FakeStorageProvider from '../../app/providers/fakes/FakeStorageProvider';
import HelloStoreService from './HelloStoreService';

let fakeHelloRepository: IHelloRepository;
let fakeDatabaseRepository: IDatabaseRepository;
let helloStoreService: HelloStoreService;
let fakeStorageProvider: IStorageProvider;

describe('HelloStoreService', () => {
  beforeEach(() => {
    fakeHelloRepository = new FakeHelloRepository({} as IDatabase);
    fakeDatabaseRepository = new FakeDatabaseRepository({} as IDatabase);
    fakeStorageProvider = new FakeStorageProvider();

    helloStoreService = new HelloStoreService(
      fakeHelloRepository,
      fakeDatabaseRepository,
      fakeStorageProvider
    );
  });

  it('should to be able to make a simple test', async () => {
    const response = await helloStoreService.execute({
      photoUpload: 'filename_test',
    });

    expect(response.another_message).toBe('filename: filename_test');
  });
});
