export default async (req) => {
  const headers = { "Content-Type": "application/json" };

  try {
    const url = new URL(req.url);
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ message: "Missing weather API key." }),
        { status: 500, headers }
      );
    }

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ message: "Missing latitude or longitude." }),
        { status: 400, headers }
      );
    }

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await weatherRes.json();

    if (!weatherRes.ok) {
      return new Response(
        JSON.stringify({
          message: data?.message || "Failed to fetch weather data.",
        }),
        { status: weatherRes.status, headers }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Server error",
        detail: error?.message || String(error),
      }),
      { status: 500, headers }
    );
  }
};