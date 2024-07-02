/**
 * Should reflect the UserType defined in the GraphQL schema.
 */
export interface UserDto {
  id: number;
  name: string;
  phone: string;
  birthDate: Date;
  email: string;
  role: 'user' | 'admin';
  password?: string;
}
