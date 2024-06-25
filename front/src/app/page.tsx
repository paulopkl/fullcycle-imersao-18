import Image from "next/image";
import Title from "./components/Title";
import { EventModel } from "./models";
import EventCard from "./components/EventCard";

export default function Home() {
  const events: EventModel[] = [
    {
      id: "1",
      name: "Desenvolvimento de Soft",
      organization: "Cubos",
      date: "2022-12-31T00:00:00.000Z",
      location: "são Paulo",
      image_url: "",
      price: 100,
      rating: "1",
    },
    {
      id: "1",
      name: "Desenvolvimento de Soft",
      organization: "Cubos",
      date: "2022-12-31T00:00:00.000Z",
      location: "são Paulo",
      image_url: "",
      price: 100,
      rating: "1",
    },
  ];

  return (
    <main className="mt-10 flex flex-col">
      <Title>Eventos disponíveis</Title>
      <div className="mt-8 sm:grid sm:grid-cols-auto-fit-cards flex flex-wrap justify-center gap-x-2 gap-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
