import { UserIcon } from '@sanity/icons/User';
import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'image',
      title: 'Fotografía',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() })],
    }),
    defineField({ name: 'bio', title: 'Biografía breve', type: 'text', rows: 4, validation: (rule) => rule.max(320) }),
  ],
});
