import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(registerDto: RegisterDto): Promise<object>;
    login(loginDto: LoginDto): Promise<object>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<object>;
}
