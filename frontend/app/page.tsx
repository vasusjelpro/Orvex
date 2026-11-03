import Link from "next/link";
import { CATEGORIAS } from "@/lib/api";

const DESC: Record<string, string> = {
  PROCESADOR: "El cerebro de tu PC",
  PLACA_MADRE: "Conecta todo",
  RAM: "Memoria para multitarea",
  TARJETA_GRAFICA: "Juegos y edición",
  ALMACENAMIENTO: "SSD y discos",
  REFRIGERACION: "Temperaturas bajo control",
  GABINETE: "Donde vive tu PC",
  FUENTE: "Energía estable",
};

export default function Inicio() {
  return (
    <div className="container">
      <section className="bento">
        <Link href="/armador" className="bento-card bento-lg">
          <span className="eyebrow">PC personalizada</span>
          <h2>Arma tu PC. Nosotros comprobamos que funcione.</h2>
          <p>Elige tus piezas y verifica compatibilidad y consumo antes de pagar.</p>
        </Link>
        <Link href="/tienda" className="bento-card bento-violeta">
          <span className="eyebrow">Compra individual</span>
          <h2>Solo lo que necesitas</h2>
          <p>Explora el catálogo y compra pieza por pieza.</p>
        </Link>
        <div className="bento-fila">
          <div className="bento-card bento-coral">
            <h2 className="h5">Compatibilidad</h2>
            <p>Socket, RAM, formato y medidas.</p>
          </div>
          <div className="bento-card bento-verde">
            <h2 className="h5">Fuente de poder</h2>
            <p>Consumo estimado con margen de seguridad.</p>
          </div>
          <div className="bento-card bento-negro">
            <h2 className="h5">Sin sorpresas</h2>
            <p>Detectamos el error antes de que compres.</p>
          </div>
        </div>
      </section>

      <section className="seccion">
        <h2 className="mb-3">Compra por categoría</h2>
        <div className="tiles">
          {CATEGORIAS.map((c, i) => (
            <a key={c.id} className="tile" href={`/tienda?cat=${c.id}`}>
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.etiqueta}</h3>
              <p>{DESC[c.id]}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="seccion pt-0">
        <h2 className="mb-3">Cómo funciona</h2>
        <div className="pasos">
          <div className="paso"><div className="n">1</div><strong>Elige tus piezas</strong><p className="mb-0 text-secondary">Una por categoría, o solo las que necesites.</p></div>
          <div className="paso"><div className="n">2</div><strong>Verifica</strong><p className="mb-0 text-secondary">Orvex revisa que todo encaje y que la fuente alcance.</p></div>
          <div className="paso"><div className="n">3</div><strong>Compra con confianza</strong><p className="mb-0 text-secondary">Agrega al carrito el armado completo o piezas sueltas.</p></div>
        </div>
      </section>
    </div>
  );
}
