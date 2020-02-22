import {Query, Resolver} from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query('login')
  async login(req, body: any) {
    console.log(body);
    return {
      data: {expiresIn: 36000},
    };
  }
}
