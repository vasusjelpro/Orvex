"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import type { Producto } from "./api";

export interface Linea {
  producto: Producto;
  cantidad: number;
}
interface Ctx {
  lineas: Linea[];
  agregarVarios: (ps: Producto[]) => void;
  quitar: (id: number) => void;
  limpiar: () => void;
}

const CartCtx = createContext<Ctx | null>(null);
const CLAVE = "orvex-carrito";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<Linea[]>([]);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setLineas(JSON.parse(guardado));
    } catch {
      /* sin almacenamiento: el carrito vive solo en memoria */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(lineas));
    } catch {
      /* ignorar */
    }
  }, [lineas]);

  const agregarVarios = (ps: Producto[]) =>
    setLineas((prev) => {
      const sig = [...prev];
      for (const p of ps) {
        const i = sig.findIndex((l) => l.producto.id === p.id);
        if (i >= 0) sig[i] = { ...sig[i], cantidad: sig[i].cantidad + 1 };
        else sig.push({ producto: p, cantidad: 1 });
      }
      return sig;
    });
  const quitar = (id: number) => setLineas((prev) => prev.filter((l) => l.producto.id !== id));
  const limpiar = () => setLineas([]);

  return <CartCtx.Provider value={{ lineas, agregarVarios, quitar, limpiar }}>{children}</CartCtx.Provider>;
}

export function useCart(): Ctx {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

export function CartLink() {
  const { lineas } = useCart();
  const n = lineas.reduce((s, l) => s + l.cantidad, 0);
  return (
    <Link href="/carrito" className="btn-carrito">
      Carrito{n > 0 ? ` (${n})` : ""}
    </Link>
  );
}
