import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
@Injectable() //injectable zorgt dat dit een singleton is en dat deze dus altijd opnieuw gebruikt wordt idpv opnieuw een object hiervan te maken
export class FirebaseGuard extends AuthGuard(
  'firebase-auth',
) {
  getRequest(context: ExecutionContext) {
    console.log(context)
    const ctx = GqlExecutionContext.create(context) // doorgeven van REST (post) naar GraphQL
    console.log(ctx)
    // in commandline (zelfde als je npm run dev runt) moet je  $env:GOOGLE_APPLICATION_CREDENTIALS=... uitvoeren
    return ctx.getContext().req
  }
}
