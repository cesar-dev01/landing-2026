import { DocumentTextIcon } from '@sanity/icons/DocumentText';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', group: 'content', validation: (rule) => rule.required().max(90) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Resumen', type: 'text', rows: 4, group: 'content', validation: (rule) => rule.required().max(200) }),
    defineField({ name: 'publishedAt', title: 'Fecha de publicación', type: 'datetime', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'updatedAt', title: 'Última actualización', type: 'datetime', group: 'content' }),
    defineField({ name: 'author', title: 'Autor', type: 'reference', to: [{ type: 'author' }], group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'categories', title: 'Categorías', type: 'array', group: 'content', of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })], validation: (rule) => rule.min(1).unique() }),
    defineField({
      name: 'mainImage', title: 'Imagen principal', type: 'image', group: 'content', options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() })],
    }),
    defineField({
      name: 'body', title: 'Contenido', type: 'array', group: 'content',
      of: [
        defineArrayMember({ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Título 2', value: 'h2' }, { title: 'Título 3', value: 'h3' }, { title: 'Cita', value: 'blockquote' }] }),
        defineArrayMember({ type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Texto alternativo', type: 'string', validation: (rule) => rule.required() })] }),
      ], validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo', title: 'Metadatos', type: 'object', group: 'seo', fields: [
        defineField({ name: 'title', title: 'Título SEO', type: 'string', validation: (rule) => rule.max(60).warning('Idealmente no más de 60 caracteres') }),
        defineField({ name: 'description', title: 'Descripción SEO', type: 'text', rows: 3, validation: (rule) => rule.max(160).warning('Idealmente no más de 160 caracteres') }),
        defineField({ name: 'noIndex', title: 'Excluir de buscadores', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  orderings: [{ title: 'Más recientes', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
});
