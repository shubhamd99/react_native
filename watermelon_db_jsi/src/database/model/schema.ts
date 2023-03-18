import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const TABLE_NAME = 'posts';

export default appSchema({
  version: 1,
  tables: [
    // All tables automatically have a string column id (of string type) to uniquely identify records
    // -- therefore you cannot declare a column named id yourself
    tableSchema({
      name: TABLE_NAME,
      columns: [
        {name: 'title', type: 'string'},
        {name: 'subtitle', type: 'string', isOptional: true},
        {name: 'body', type: 'string'},
        {name: 'is_pinned', type: 'boolean'},
        {name: 'created_at', type: 'number'},
        {name: 'updated_at', type: 'number'},
        {name: 'reactions', type: 'string', isOptional: true},
      ],
    }),
  ],
});
