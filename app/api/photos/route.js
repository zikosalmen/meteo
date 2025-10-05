"use server"
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ville = searchParams.get("ville") || "Tunis";

    const apiKey = process.env.PH_KEY;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${ville}&srnamespace=6&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();

    let title=data?.query?.search?.[0].title;

    const url1=`https://commons.wikimedia.org/w/api.php?action=query&titles=${title}&prop=imageinfo&iiprop=url&format=json`;
    const res1= await fetch(url1);
    const data1=await res1.json()

    return new Response(JSON.stringify(data1), {
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
