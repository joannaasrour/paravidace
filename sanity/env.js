// Paste the Sanity Project ID here once the account exists (sanity.io/manage).
// While it is empty, the website uses the projects in app/data.js.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-10-01';
