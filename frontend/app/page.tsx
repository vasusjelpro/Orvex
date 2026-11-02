import Link from "next/link";

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <h1>Orvex</h1>
        <p className="lema">COMPRA TU PC SIN DUDAS</p>
        <p className="nota">Comprobamos que todo encaje y que la fuente alcance, antes de que pagues.</p>
      </section>
      <section className="container modos pb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <Link href="/armador" className="modo">
              <h2>PC personalizada</h2>
              <p>
                Elige procesador, placa, memoria, gráfica, gabinete y fuente. Verificamos la compatibilidad y el
                consumo, y agregas todo el armado al carrito de una vez.
              </p>
              <span className="ir">Armar mi PC</span>
            </Link>
          </div>
          <div className="col-md-6">
            <Link href="/tienda" className="modo">
              <h2>Compra individual</h2>
              <p>
                ¿Solo necesitas una pieza o quieres armar tu carrito a tu manera? Explora el catálogo por categoría y
                compra lo que quieras.
              </p>
              <span className="ir">Ver catálogo</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
