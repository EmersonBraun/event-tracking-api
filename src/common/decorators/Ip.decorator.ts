import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IP = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
  const { ip } = ctx.switchToHttp().getRequest();
  const cleanIp = ip.replace('::ffff:','')
	return cleanIp
});