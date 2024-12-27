import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Quiz App',
  description: 'Made by Polleck',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} bg-gradient-to-tl from-blue-500 to-purple-500 bg-no-repeat bg-fixed antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
