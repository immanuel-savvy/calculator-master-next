const metadata = {
  title: "Calculator Master - Your everything calculator website",
  description:
    "Looking for a website with a variety of calculators? Look no further than our site! We offer a wide range of calculators to help you with everything from financial planning to health and fitness. With our user-friendly interface, you'll be able to quickly and easily access the tools you need to make informed decisions. Start exploring today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
