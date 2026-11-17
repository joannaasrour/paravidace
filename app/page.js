import HomeClient from './HomeClient';
import { getContent } from './lib/content';

export const revalidate = 60;

export default async function Home() {
  const { projects, heroPhotos, aboutPhoto } = await getContent();
  return <HomeClient projects={projects} heroPhotos={heroPhotos} aboutPhoto={aboutPhoto} />;
}
