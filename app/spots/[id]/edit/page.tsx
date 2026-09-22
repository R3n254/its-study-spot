"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditStudySpot() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [wifi, setWifi] = useState(false);
  const [ac, setAc] = useState(false);
  const [powerOutlet, setPowerOutlet] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState("Quiet");
  const [openingHours, setOpeningHours] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getStudySpot() {
      try {
        const response = await fetch(
          `http://localhost:8080/spots/${id}`
        );

        if (!response.ok) {
          throw new Error("Study spot not found");
        }

        const spot = await response.json();

        setName(spot.name);
        setLocation(spot.location);
        setDescription(spot.description);
        setWifi(spot.wifi);
        setAc(spot.ac);
        setPowerOutlet(spot.powerOutlet);
        setNoiseLevel(spot.noiseLevel);
        setOpeningHours(spot.openingHours);
      } catch (error) {
        console.error(error);
        alert("Failed to load study spot.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getStudySpot();
    }
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:8080/spots/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            location,
            description,
            wifi,
            ac,
            powerOutlet,
            noiseLevel,
            openingHours,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update study spot");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update study spot.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading study spot...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 px-8 py-6 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">Edit Study Spot</h1>
          <p className="mt-2 text-blue-100">
            Update information about this study location.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-8 py-10">
        <div className="rounded-xl bg-white p-8 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Facilities
              </label>

              <div className="flex flex-wrap gap-6 text-gray-700">
                <label>
                  <input
                    type="checkbox"
                    checked={wifi}
                    onChange={(event) => setWifi(event.target.checked)}
                    className="mr-2"
                  />
                  Wi-Fi
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={ac}
                    onChange={(event) => setAc(event.target.checked)}
                    className="mr-2"
                  />
                  AC
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={powerOutlet}
                    onChange={(event) =>
                      setPowerOutlet(event.target.checked)
                    }
                    className="mr-2"
                  />
                  Power Outlet
                </label>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Noise Level
              </label>

              <select
                value={noiseLevel}
                onChange={(event) => setNoiseLevel(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              >
                <option value="Quiet">Quiet</option>
                <option value="Moderate">Moderate</option>
                <option value="Loud">Loud</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Opening Hours
              </label>

              <input
                type="text"
                value={openingHours}
                onChange={(event) => setOpeningHours(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href="/"
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}