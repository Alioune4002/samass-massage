const BASE_URL = "https://samass-massage.onrender.com";

export async function createAvailability(data: {
  service: number;
  start_datetime: string;
  end_datetime: string;
}) {
  const res = await fetch(`${BASE_URL}/api/availabilities/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création de la disponibilité");
  }

  return res.json();
}


export async function getServices() {
  const res = await fetch(`${BASE_URL}/api/services/`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erreur chargement services");
  return res.json();
}


export async function getAvailabilities(
  serviceId: number,
  date?: string
) {
  const url = new URL(`${BASE_URL}/api/availabilities/`);

  url.searchParams.append("service", String(serviceId));
  if (date) url.searchParams.append("date", date);

  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Erreur chargement disponibilités");
  return res.json();
}



export async function createBooking(data: {
  client_name: string;
  client_email: string;
  client_phone?: string;
  availability: number;
  service: number;
}) {
  const res = await fetch(`${BASE_URL}/api/bookings/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const res = await fetch(`${BASE_URL}/api/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteAvailability(id: number) {
  const res = await fetch(
    `${BASE_URL}/api/availabilities/${id}/`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}
