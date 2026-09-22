import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

type StudySpot = {
  id: number;
  name: string;
  location: string;
  description: string;
  wifi: boolean;
  ac: boolean;
  powerOutlet: boolean;
  noiseLevel: string;
  openingHours: string;
};

async function getStudySpots(): Promise<StudySpot[]> {
  const response = await fetch("http://localhost:8080/spots", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch study spots");
  }

  return response.json();
}

export default async function Home() {
  const studySpots = await getStudySpots();

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 px-8 py-6 text-white">
        <h1 className="text-3xl font-bold">ITS Study Spot Finder</h1>

        <p className="mt-2 text-blue-100">
          Find the perfect place to study around ITS.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Study Spots
            </h2>

            <p className="mt-1 text-gray-600">
              Explore study places around campus.
            </p>
          </div>

          <Link
            href="/spots/new"
            className="rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            + Add Study Spot
          </Link>
        </div>

        {studySpots.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow">
            <p className="text-gray-600">
              No study spots have been added yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studySpots.map((spot) => (
              <div
                key={spot.id}
                className="rounded-xl bg-white p-6 shadow"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {spot.name}
                </h3>

                <p className="mt-2 text-gray-600">
                  {spot.location}
                </p>

                <p className="mt-4 text-sm text-gray-600">
                  {spot.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {spot.wifi && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      Wi-Fi
                    </span>
                  )}

                  {spot.ac && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      AC
                    </span>
                  )}

                  {spot.powerOutlet && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      Power Outlet
                    </span>
                  )}
                </div>

                <div className="mt-5 border-t pt-4 text-sm text-gray-500">
                  <p>Noise Level: {spot.noiseLevel}</p>
                  <p>Opening Hours: {spot.openingHours}</p>
                </div>

                <div className="mt-5 flex gap-3">
  <Link
    href={`/spots/${spot.id}/edit`}
    className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
  >
    Edit
  </Link>

  <DeleteButton id={spot.id} />
</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}