export declare class PasswordHash {
    hash(password: string): Promise<string>;
    verify(hashedPassword: string, passwordText: string): Promise<boolean>;
}
