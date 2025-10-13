import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

let cityDataCache = null;

async function getCityData() {
  if (!cityDataCache) {
    const filePath = path.join(process.cwd(), "public", "city.list.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    cityDataCache = JSON.parse(fileContents);
  }
  return cityDataCache;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const valeur = searchParams.get("valeur")?.toLowerCase() || "";

    if (valeur.length < 3) {
      return NextResponse.json([]);
    }

    const cityData = await getCityData();

    const results = cityData
      .filter((city) => city.name.toLowerCase().includes(valeur))
      .slice(0, 50)
      .map((city) => ({
        label: `${city.name}, ${city.country}`,
        value: {
          stateName: city.name,
          countryName: city.country,
          lat: city.coord.lat,
          lon: city.coord.lon,
        },
      }));

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
