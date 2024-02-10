export type User = {
  id: string;
  username: string;
  mail: string;
  unity_id: string;
  unity: string;
  position: string;
  permissions: string;
  active: boolean;
}

export type CreateUser = {
  id: string;
  username: string;
  mail: string;
  password?: string;
  unity_id: string;
  position: string;
  permissions: string;
}

export type NewCreateUser = {
  username: string;
  mail: string;
  unity: string;
  position: string;
}

export type UpdateUser = {
  username?: string;
  mail?: string;
  password?: string;
  unity?: string;
  position?: string;
  permissions?: string;
  active?: boolean;
}
