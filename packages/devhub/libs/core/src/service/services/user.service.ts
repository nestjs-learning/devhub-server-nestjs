import {Injectable} from '@nestjs/common';
import {InjectRepository} from 'nestjs-mikro-orm';
import {EntityRepository} from 'mikro-orm';
import {User} from '@libs/db/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {
  }

  async create(newUser) {
    // const user = new User(input: {
    //   name: newUser.name,
    //   displayName: newUser.displayName,
    //   passwordHash: newUser.passwordHash,
    // });
    // await this.userRepository.persistAndFlush(user);
  }

  findOne(req: any): Promise<User> {
    const one = this.userRepository.findOne({
      ...req,
    });
    return one;
  }

}
