import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mymcha- Redefined",
  description: "Creative Corner for the Creatives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header />
            <main className="min-h-screen ">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
