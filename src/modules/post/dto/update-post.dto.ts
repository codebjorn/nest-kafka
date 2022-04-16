import { IsOptional, IsString, Validate } from 'class-validator';
import { IsPostField } from 'src/common/constraint';
import { PostData } from '../interface';

export class UpdatePostDto implements PostData {
  @IsString()
  @IsOptional()
  @Validate(IsPostField, ['title'])
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly body: string;
}
