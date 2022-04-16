import { PostData } from './post-data.interface';

export interface PersistentPostData extends PostData {
  _id: string;
}
