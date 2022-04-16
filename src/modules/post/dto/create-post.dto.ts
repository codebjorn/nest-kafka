import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsPostField } from 'src/common/constraint';
import { PostData } from '../interface';

export class CreatePostDto implements PostData {
  @IsString()
  @IsNotEmpty()
  @Validate(IsPostField, ['title'])
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly body: string;
}
