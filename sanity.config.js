'use client';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'paravidace',
  title: 'Paravidace',
  basePath: '/studio',
  projectId: projectId || 'missing',
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title('Paravidace').items([
          S.listItem().title('Home page').id('settings').child(S.document().schemaType('settings').documentId('settings')),
          S.divider(),
          S.listItem().title('Completed projects').child(S.documentList().title('Completed projects').filter('_type == "project" && status != "Upcoming"').defaultOrdering([{ field: 'name', direction: 'asc' }])),
          S.listItem().title('Upcoming projects').child(S.documentList().title('Upcoming projects').filter('_type == "project" && status == "Upcoming"')),
          S.listItem().title('Shown on home page').child(S.documentList().title('Home page projects').filter('_type == "project" && featured == true').defaultOrdering([{ field: 'order', direction: 'asc' }])),
          S.divider(),
          S.documentTypeListItem('project').title('All projects'),
        ]),
    }),
  ],
});
