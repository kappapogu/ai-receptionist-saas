import './globals.css';

export const metadata = {
  title: 'AI Receptionist | 24/7 AI Phone Agent for Dentists, Medspas & HVAC',
  description: 'Never miss a call again. Our AI receptionist books appointments, handles inquiries, and recovers missed calls 24/7.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
