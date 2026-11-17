import { Header, Footer, ProjectsIndex } from '../components';
import { getContent } from '../lib/content';

export const revalidate = 60;

export const metadata = {
  title: 'Projects · Paravidace',
  description: 'Commercial stores, restaurants, supermarkets and more, built by Paravidace all over Lebanon, and in Cyprus and Romania.',
};

export default async function ProjectsPage() {
  const { projects } = await getContent();
  return (
    <>
      <Header />
      <main className="sub-page">
        <ProjectsIndex projects={projects} />
      </main>
      <Footer />
    </>
  );
}
