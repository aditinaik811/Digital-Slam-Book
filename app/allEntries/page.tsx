'use client'

import { supabase } from "@/lib/SupabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";
interface SlamEntry {
  id: string;  // uuid, not number
  name: string;
  nickname: string;
  birthday: string;
  favourite_color: string;
  favourite_song: string;
  favourite_food: string;
  favourite_book: string;
  favourite_pet: string;
  describe_yourself: string;
  if_animal: string;
  superpower: string;
  favourite_memory: string;
  crush: string;
  message_for_me: string;
  created_at: string;
}

export default function AllEntryPage() {
  const [entries, setEntries] = useState<SlamEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<SlamEntry | null>(null);

  useEffect(() => {
    async function fetchEntries() {
      const { data, error } = await supabase.from("slambook").select("*");
      if (error) console.error("Error fetching entries:", error.message);
      else setEntries(data as SlamEntry[]);
    }
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-pink-200 to-blue-200 p-8">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
        📖 All Slam Book Entries
      </h1>

      {/* Grid of entries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white shadow-lg rounded-xl p-4 border border-pink-300 cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedEntry(entry)}
          >
            <h2 className="text-xl font-semibold text-blue-700">
              {entry.name}
            </h2>
            <p className="text-pink-600">Nickname: {entry.nickname}</p>
            <p className="text-sm text-gray-600">Birthday: {entry.birthday}</p>
          </div>
        ))}
      </div>

      {/* Modal to show full entry */}
      {selectedEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
              {selectedEntry.name}’s Slam Entry
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ReadOnlyField label="Name" value={selectedEntry.name} />
              <ReadOnlyField label="Nickname" value={selectedEntry.nickname} />
              <ReadOnlyField label="Birthday" value={selectedEntry.birthday} />
              <ReadOnlyField label="Favourite Color" value={selectedEntry.favourite_color} />
              <ReadOnlyField label="Favourite Song" value={selectedEntry.favourite_song} />
              <ReadOnlyField label="Favourite Food" value={selectedEntry.favourite_food} />
              <ReadOnlyField label="Favourite Book" value={selectedEntry.favourite_book} />
              <ReadOnlyField label="Favourite Pet" value={selectedEntry.favourite_pet} />
              <ReadOnlyField label="Describe Yourself" value={selectedEntry.describe_yourself} />
              <ReadOnlyField label="If Animal" value={selectedEntry.if_animal} />
              <ReadOnlyField label="Superpower" value={selectedEntry.superpower} />
              <ReadOnlyField label="Favourite Memory" value={selectedEntry.favourite_memory} />
              <ReadOnlyField label="Crush" value={selectedEntry.crush} />
              <ReadOnlyField label="Message for Me" value={selectedEntry.message_for_me} />
            </div>
          </div>
        </div>
      )}
      {/* Go to All Entries Page */}
      <div className="mt-6">
        <Link href="/slamEntry">
          <button className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
            Make a entry in SLAM
          </button>
        </Link>
      </div>
    </div>
  );
}

/* Helper component for read-only fields */
function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <input
        type="text"
        value={value || "—"}
        readOnly
        className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800"
      />
    </div>
  );
}
