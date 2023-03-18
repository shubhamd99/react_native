import {Model} from '@nozbe/watermelondb';
import {
  field,
  text,
  readonly,
  date,
  json,
} from '@nozbe/watermelondb/decorators';
import {TABLE_NAME} from './schema';

const sanitizeReactions = (jsonData: JSON) => jsonData;

class Post extends Model {
  static table = TABLE_NAME;

  @text('title') title: string | undefined;
  @text('body') body: string | undefined;
  // Field types. Fields are guaranteed to be the same type (string/number/boolean)
  // as the column type defined in Schema. If column is marked isOptional: true,
  // fields may also be null.
  @field('is_pinned') isPinned: boolean | undefined;
  @readonly @date('created_at') createdAt: number | undefined;
  @readonly @date('updated_at') updatedAt: number | undefined;
  @json('reactions', sanitizeReactions) reactions: string | undefined;
}

export default Post;
