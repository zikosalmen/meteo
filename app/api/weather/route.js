"use server"
export async function GET(request) {
  try {

    const { searchParams } = new URL(request.url);
    const ville = searchParams.get("ville") || "Tunis"; 
    const lang =searchParams.get("lang") || "fr";    

    const apiKey =process.env.WEATHER_KEY;
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=${lang}`;
    const res =await fetch(url)
    const data =await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
