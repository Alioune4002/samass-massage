"use client";

import CardService from "../components/CardService";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Massage Relaxant Tonique",
      description:
        "Un massage complet alternant douceur et gestes toniques pour libérer les tensions et apaiser profondément.",
      formulas: [{ duration: "1h", price: 80 }],
    },
    {
      id: 2,
      title: "Massage Tonique",
      description:
        "Massage dynamique et revitalisant pour stimuler la circulation et dénouer les contractures.",
      formulas: [
        { duration: "45 minutes", price: 50 },
        { duration: "1h", price: 70 },
      ],
    },
    {
      id: 3,
      title: "Massage Tantrique",
      description:
        "Approche profonde et consciente pour reconnecter le corps, le souffle et les sensations.",
      formulas: [
        { duration: "1h", price: 80 },
        { duration: "1h30", price: 120 },
      ],
    },
  ];

  return (
    <div>
     
      <section className="bg-pastel py-20 text-center">
        <h1 className="text-4xl font-bold text-forest mb-4">
          Mes Massages
        </h1>
        <p className="text-softgray max-w-xl mx-auto">
          Des expériences adaptées à votre énergie du moment.
        </p>
      </section>

      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <CardService
              key={s.id}
              title={s.title}
              description={s.description}
              formulas={s.formulas}
              serviceId={s.id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
