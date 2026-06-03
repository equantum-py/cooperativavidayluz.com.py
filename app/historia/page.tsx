'use client';

import { motion } from 'framer-motion';

export default function HistoriaPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 to-emerald-900 text-white px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Reseña Histórica
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Cooperativa Multiactiva Vida y Luz Ltda.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl space-y-6 leading-8 text-lg">

          <p>
            La historia de la Cooperativa Multiactiva Vida y Luz Ltda. nace del sueño noble y solidario
            de un hombre visionario: <strong>Don Lucilo Miranda Villalba</strong>, quien, movido por su
            profundo amor al prójimo y por los valores cristianos, decidió emprender un camino de servicio.
          </p>

          <p>
            Corría el año 1997, una época de dificultades económicas, donde muchas familias necesitaban
            apoyo. Fue entonces cuando nació la idea de crear una cooperativa basada en la ayuda mutua,
            la honestidad y la fe.
          </p>

          <p>
            Este proyecto no fue improvisado: surgió de conversaciones, oraciones y reuniones entre hermanos
            de la Iglesia que compartían una visión común de solidaridad.
          </p>

          <p>
            Con el acompañamiento del Ingeniero Ángel Caballero (INCOOP), se logró encaminar la constitución
            legal de la cooperativa, fortaleciendo sus bases institucionales.
          </p>

          <p>
            Así nació oficialmente la Cooperativa Multiactiva Vida y Luz Ltda., una institución creada no
            solo para servicios financieros, sino como instrumento de esperanza para muchas familias.
          </p>

          <p>
            Don Lucilo Miranda Villalba integró el Consejo de Administración desde 1997 hasta 2020,
            dedicando más de dos décadas al crecimiento de la institución con entrega y humildad.
          </p>

          <p>
            Su legado vive en cada decisión, en cada socio y en cada historia transformada por la cooperativa.
          </p>

          <p>
            Hoy, Vida y Luz sigue siendo un símbolo de esperanza, trabajo honesto y compromiso social.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-50 px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Una historia que sigue creciendo
        </h2>
        <p className="mt-4 text-gray-600">
          Construimos futuro sobre bases de fe, solidaridad y compromiso.
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-emerald-900 px-8 py-4 text-white font-semibold"
        >
          Volver al inicio
        </a>
      </section>

    </main>
  );
}