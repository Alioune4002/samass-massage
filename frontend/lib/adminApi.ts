const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://samass-massage.onrender.com";

/* -----------------------------------------
   Helper : Fetch + token dans Authorization
------------------------------------------ */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getAdminToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("API ERROR:", res.status, errBody);
    throw new Error(`Erreur API (${res.status}) : ${errBody}`);
  }

  return res.json();
}

/* -----------------------------------------
   Helper pour récupérer le token du cookie
------------------------------------------ */
function getAdminToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

/* -----------------------------------------
   SERVICES
------------------------------------------ */
export const adminGetServices = () =>
  apiRequest("/api/services/");

export const adminCreateService = (data: any) =>
  apiRequest("/api/services/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminDeleteService = (id: number) =>
  apiRequest(`/api/services/${id}/`, {
    method: "DELETE",
  });

export const adminUpdateService = (id: number, data: any) =>
  apiRequest(`/api/services/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

/* -----------------------------------------
   AVAILABILITIES
------------------------------------------ */
export const adminGetAvailabilities = (service?: number, date?: string) => {
  const params = new URLSearchParams();

  if (service) params.set("service", String(service));
  if (date) params.set("date", date);

  return apiRequest(`/api/availabilities/?${params.toString()}`);
};

export const adminCreateAvailability = (data: any) =>
  apiRequest("/api/availabilities/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminDeleteAvailability = (id: number) =>
  apiRequest(`/api/availabilities/${id}/`, {
    method: "DELETE",
  });

/* -----------------------------------------
   BOOKINGS
------------------------------------------ */
export const adminGetBookings = () =>
  apiRequest("/api/bookings/");

export const adminGetBooking = (id: number) =>
  apiRequest(`/api/bookings/${id}/`);

export const adminConfirmBooking = (id: number) =>
  apiRequest(`/api/bookings/${id}/confirm/`, {
    method: "POST",
  });

export const adminCancelBooking = (id: number) =>
  apiRequest(`/api/bookings/${id}/cancel/`, {
    method: "POST",
  });

/* -----------------------------------------
   MESSAGES
------------------------------------------ */
export const adminGetMessages = () =>
  apiRequest("/api/messages/");
