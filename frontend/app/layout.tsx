import type { Metadata } from "next";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { CATEGORIAS } from "@/lib/api";
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@600;700&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          <div className="utility">
            <div className="container d-flex justify-content-between">
              <span>BETA · compatibilidad verificada antes de comprar</span>
              <span>Precios y datos de ejemplo</span>
            </div>
          </div>
          <header className="header">
            <div className="container fila">
              <Link className="marca" href="/">
                Orvex<b>.</b>
              </Link>
              <form className="buscar" action="/tienda" method="get" role="search">
                <input name="q" placeholder="Buscar procesador, placa, RTX…" aria-label="Buscar" />
                <button type="submit">Buscar</button>
              </form>
              <CartLink />
            </div>
          </header>
          <nav className="catnav">
            <div className="container">
              <Link className="pc" href="/armador">
                Armar mi PC
              </Link>
              <a href="/tienda">Todo</a>
              {CATEGORIAS.map((c) => (
                <a key={c.id} href={`/tienda?cat=${c.id}`}>
                  {c.etiqueta}
                </a>
              ))}
            </div>
          </nav>
          {children}
          <footer className="container py-4 text-muted small">Orvex · versión beta · precios y datos de ejemplo</footer>
        </CartProvider>
      </body>
    </html>
  );
}
