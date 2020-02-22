export interface UserInfoData {
  _id: string;
  name: string;
  email: string;
}

export interface CreateUserInput {
  name: string;
  email?: string;
  password: string;
}
