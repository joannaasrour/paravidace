import { defineField, defineType, defineArrayMember } from 'sanity';

const SECTORS = ['Retail', 'Restaurants', 'Supermarkets', 'Commercial', 'Residential'];
const SERVICES = ['Architecture', 'Engineering', 'Contracting', 'Consultation'];

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    { name: 'main', title: 'Project', default: true },
    { name: 'photos', title: 'Photos' },
    { name: 'branches', title: 'Branches' },
    { name: 'display', title: 'Website display' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Brand / project name', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Web address', type: 'slug', group: 'main', options: { source: 'name', maxLength: 80 }, validation: (r) => r.required(), description: 'Click "Generate".' }),
    defineField({ name: 'status', title: 'Status', type: 'string', group: 'main', initialValue: 'Completed', options: { list: ['Completed', 'Upcoming'], layout: 'radio', direction: 'horizontal' } }),
    defineField({ name: 'sector', title: 'Type', type: 'string', group: 'main', initialValue: 'Retail', options: { list: SECTORS } }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'main', description: 'Mall or town, e.g. "Beirut Souks". Leave empty if you list branches.' }),
    defineField({ name: 'country', title: 'Country', type: 'string', group: 'main', initialValue: 'Lebanon', options: { list: ['Lebanon', 'Cyprus', 'Romania'] } }),
    defineField({ name: 'services', title: 'Services we provided', type: 'array', group: 'main', of: [{ type: 'string' }], options: { list: SERVICES, layout: 'grid' } }),
    defineField({ name: 'year', title: 'Year (optional)', type: 'number', group: 'main' }),

    defineField({ name: 'cover', title: 'Main photo', type: 'image', group: 'photos', options: { hotspot: true } }),
    defineField({
      name: 'gallery', title: 'More photos', type: 'array', group: 'photos',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'galleryTall', title: 'Show extra photos as tall (portrait) pictures', type: 'boolean', group: 'photos', initialValue: true }),
    defineField({ name: 'logo', title: 'Brand logo (shown when there is no photo yet)', type: 'image', group: 'photos' }),
    defineField({ name: 'logoBg', title: 'Logo background colour (optional, e.g. #081631)', type: 'string', group: 'photos' }),

    defineField({
      name: 'locations', title: 'Branches', type: 'array', group: 'branches',
      description: 'For brands you built in several places. Leave empty for a single store.',
      of: [defineArrayMember({
        type: 'object', name: 'branch', title: 'Branch',
        fields: [
          { name: 'name', title: 'Branch name', type: 'string', validation: (r) => r.required() },
          { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
          { name: 'map', title: 'Google Maps link (optional)', type: 'url' },
        ],
        preview: { select: { title: 'name', media: 'image' } },
      })],
    }),

    defineField({ name: 'featured', title: 'Show on the home page', type: 'boolean', group: 'display', initialValue: false }),
    defineField({ name: 'order', title: 'Order on the home page (1 = first)', type: 'number', group: 'display' }),
  ],
  orderings: [
    { title: 'Home page order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'name', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', location: 'location', status: 'status', media: 'cover', logo: 'logo', branches: 'locations' },
    prepare: ({ title, location, status, media, logo, branches }) => ({
      title,
      subtitle: [branches?.length ? `${branches.length} branches` : location, status === 'Upcoming' ? 'Upcoming' : null].filter(Boolean).join(' · '),
      media: media || logo,
    }),
  },
});
