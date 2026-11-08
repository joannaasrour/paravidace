import './globals.css';

export const metadata = {
  title: 'Paravidace',
  description: 'Paravidace: contracting, engineering, architecture and consultation in Lebanon and Cyprus. 30+ years, 100+ projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
