import { Sora, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Adopfide — Transform Learning Into Career Success',
  description:
    'Industry-focused learning, internships, certifications, placements, and business-ready talent solutions. Built for students, professionals and enterprises.',
  keywords: ['Adopfide', 'EdTech', 'Internships', 'Placements', 'Career', 'Upskilling', 'Resume Builder', 'Mock Tests'],
  openGraph: {
    title: 'Adopfide — Transform Learning Into Career Success',
    description: 'Industry-focused learning, internships, certifications, placements, and business-ready talent solutions.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
