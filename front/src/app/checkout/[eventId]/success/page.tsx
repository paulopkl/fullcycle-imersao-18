import Title from "@/components/Title";
import { EventModel } from "@/models";
import { cookies } from "next/headers";
import React from "react";

// queries
export async function getEvent(eventId: string): Promise<EventModel> {
  const response = await fetch(``, {
    headers: {
      apiKey: process.env.GOLANG_API_TOKEN as string,
    },
    cache: "no-store",
    ["next" as any]: {
      tags: [`events/${eventId}`],
    },
  });

  return response.json();
}

export default async function CheckoutSuccessPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await getEvent(params.eventId);
  const cookiesStore = cookies();
  const selectedSpots = JSON.parse(cookiesStore.get("spots")?.value || "[]");

  return (
    <main className="mt-10 flex flex-col flex-wrap items-center">
      <Title>Purchase made successfully</Title>
      <div className="mb-4 flex flex-col max-h-[250px] w-full max-w-[478px] gap-y-6 rounded-2xl bg-primary p-4">
        <Title>Purchase resume</Title>
        <p className="font-semibold">
          Event {event.name}
          <br />
          Local {event.location}
          <br />
          Date{" "}
          {new Date(event.date).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="font-semibold text-white">
          Chosen places: {selectedSpots.join(", ")}
        </p>
      </div>
    </main>
  );
}
