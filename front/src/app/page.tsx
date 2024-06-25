import Title from "../components/Title";
import { EventModel } from "../models";
import EventCard from "../components/EventCard";

export async function getEvents(): Promise<EventModel[]> {
  const response = await fetch(`${process.env.GOLANG_API_URL}/events`, {
    headers: {
      apiKey: process.env.GOLANG_API_URL as string,
    },
    cache: "no-store",
  });

  return (await response.json()).events;
}

export default async function Home() {
  const events: EventModel[] = await getEvents();

  return (
    <main className="mt-10 flex flex-col">
      <Title>Available Events</Title>
      <div className="flex flex-wrap justify-center mt-8 sm:grid sm:grid-cols-auto-fit-cards gap-x-2 gap-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
