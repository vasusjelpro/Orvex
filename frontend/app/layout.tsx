import type { Metadata } from "next";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CartLink, CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Orvex",
  description: "Arma tu PC y comprueba que funcione antes de comprar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          <header className="barra">
            <div className="container d-flex align-items-center justify-content-between py-3">
              <Link href="/" className="marca">
                Orvex
              </Link>
              <nav className="nav-pill">
                <Link href="/armador">PC personalizada</Link>
                <Link href="/tienda">Compra individual</Link>
              </nav>
              <CartLink />
            </div>
          </header>
          {children}
          <footer className="container py-4 text-muted small">Orvex · versión beta · precios y datos de ejemplo</footer>
        </CartProvider>
      </body>
    </html>
  );
}
