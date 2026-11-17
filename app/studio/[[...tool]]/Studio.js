'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';
import { projectId } from '../../../sanity/env';

export default function Studio() {
  if (!projectId) {
    return (
      <div style={{ fontFamily: 'Montserrat, Arial, sans-serif', padding: '120px 24px', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
        <h1 style={{ fontWeight: 500 }}>Admin panel not connected yet</h1>
        <p>The Sanity account still needs to be linked. Once the Project ID is added, this page becomes the Paravidace admin panel.</p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
