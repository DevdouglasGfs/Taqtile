/**
 * Should reflect the UserType defined in the GraphQL schema.
 */
export interface UserDto {
    id: number,
    name: string,
    phone: string,
    birthDate: Date,
    email: string,
    role: "user" | "admin",
    password?: string
}

/**
 * Type which is used to validate the login data.
 * Used in the Login page.
 */
export type UserBasicLoginData = Required<Pick<UserDto, 'email'> & { password: string }>;
