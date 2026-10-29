import "./globals.css";
export const metadata = {
  title: "Football Scores | Tournament Central",
  description: "Tournament fixtures, scores and standings",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
