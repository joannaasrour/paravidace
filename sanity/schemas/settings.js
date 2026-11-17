import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'settings',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroPhotos', title: 'Slideshow photos (top of the home page)', type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' },
      description: 'Wide (landscape) photos look best. Drag to change the order.',
    }),
    defineField({ name: 'aboutPhoto', title: 'About section photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
