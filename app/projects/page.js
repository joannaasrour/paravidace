import { Header, Footer, ProjectsIndex } from '../components';

export const metadata = {
  title: 'Projects · Paravidace',
  description: 'Commercial stores, restaurants, supermarkets and more, built by Paravidace all over Lebanon, and in Cyprus and Romania.',
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="sub-page">
        <ProjectsIndex />
      </main>
      <Footer />
    </>
  );
}
