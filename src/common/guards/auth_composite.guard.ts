import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { RolesGuard } from "./roles.guard";
import { PoliciesGuard } from "./check_policy.guard";
import { AccountActivatedGuard } from "./account-activated.guard";

@Injectable()
export class AuthCompositeGuard implements CanActivate {
  private readonly logger = new Logger(AuthCompositeGuard.name);

  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly reflector: Reflector,
    private readonly roleGuard : RolesGuard,
    private readonly policyGuard : PoliciesGuard,
    private readonly accountActivatedGuard : AccountActivatedGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug("Public route accessed.");
      return true;
    }

    const jwtValid =  await this.jwtAuthGuard.canActivate(context);
    const roleValid = this.roleGuard.canActivate(context);
    const policyValid = await this.policyGuard.canActivate(context);
    const activationValid = this.accountActivatedGuard.canActivate(context);
    if(!jwtValid || !roleValid || !policyValid || !activationValid){
      return false;
    }
    return true;
  }
}