import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PostService } from 'src/modules/post/post.service';

@ValidatorConstraint({ name: 'isPostField', async: true })
@Injectable()
export class IsPostField implements ValidatorConstraintInterface {
  constructor(private readonly service: PostService) {}
  public async validate(
    val: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const { property: field, value } = args;

    if (typeof field !== 'string' || typeof value !== 'string') {
      throw new Error('Properties for IsPostField constraint are not string');
    }

    return (await this.service.exists({ field, value })) ? false : true;
  }

  public defaultMessage(args: ValidationArguments): string {
    return `Post with ${args.property} ${args.value} exists in the DB`;
  }
}
