import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UsersService } from 'src/users/users.service'

export const RolesGuard = (roles: string[]) => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    constructor(readonly usersService: UsersService) {}

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context)
      const user = ctx.getContext().req.user

      const customUser = await this.usersService.findOne(
        user.uid,
      )
      console.log({ user })
      console.log({ customUser })

      console.log(roles)
      // what if there are no roles required?
      // what if there are no roles on the user?

      return roles.includes(customUser.role.name)
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}

export default RolesGuard
