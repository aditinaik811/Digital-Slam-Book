'use client'

import { supabase } from "@/lib/SupabaseClient"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export default function SlamEntry() {
  const [fullName, setFullName] = useState("");
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthday: "",
    favouriteColor: "",
    favouriteSong: "",
    favouriteFood: "",
    favouriteBook: "",
    favouritePet: "",
    describeYourself: "",
    ifAnimal: "",
    superpower: "",
    favouriteMemory: "",
    crush: "",
    messageForMe: ""
  });

  useEffect(() => {
    async function getUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        const displayName = user?.user_metadata?.full_name ?? "";
        localStorage.setItem("displayName", displayName);
        setFullName(displayName);
      }
    }

    getUser();

    const storedName = localStorage.getItem("displayName");
    if (storedName) setFullName(storedName);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dbData = {
      name: formData.name || fullName,
      nickname: formData.nickname,
      birthday: formData.birthday,
      favourite_color: formData.favouriteColor,
      favourite_song: formData.favouriteSong,
      favourite_food: formData.favouriteFood,
      favourite_book: formData.favouriteBook,
      favourite_pet: formData.favouritePet,
      describe_yourself: formData.describeYourself,
      if_animal: formData.ifAnimal,
      superpower: formData.superpower,
      favourite_memory: formData.favouriteMemory,
      crush: formData.crush,
      message_for_me: formData.messageForMe,
    };

    const { data, error } = await supabase.from("slambook").insert([dbData]).select();

    if (error) {
      console.error("DB insert error:", error.message, error.details, error.hint);
    } else {
      console.log("Inserted successfully:", data);
      router.push('/allEntries')
      

    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 via-pink-200 to-green-200 p-6">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-3xl w-full border-2 border-orange-300"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">💌 My Digital Slam Book</h1>
          <p className="text-pink-600 mt-2">Fill in your memories and vibes 🌸</p>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            className="input-style placeholder-gray-900"
            name="name"
            value={formData.name || fullName}
            onChange={handleInputChange}
            placeholder="Enter your Name"
            type="text"
          />
          <input
            className="input-style border-pink-400"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
            placeholder="Nickname"
            type="text"
          />
          <input
            className="input-style border-green-400"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            type="date"
          />
        </div>

        {/* Favourites */}
        <h2 className="text-xl font-semibold text-orange-600 mb-2">✨ Your Favourites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input className="input-style border-blue-400" name="favouriteColor" value={formData.favouriteColor} onChange={handleInputChange} placeholder="Favourite Color" type="text" />
          <input className="input-style border-pink-400" name="favouriteSong" value={formData.favouriteSong} onChange={handleInputChange} placeholder="Favourite Song" type="text" />
          <input className="input-style border-green-400" name="favouriteFood" value={formData.favouriteFood} onChange={handleInputChange} placeholder="Favourite Food" type="text" />
          <input className="input-style border-orange-400" name="favouriteBook" value={formData.favouriteBook} onChange={handleInputChange} placeholder="Favourite Book" type="text" />
          <input className="input-style border-blue-400" name="favouritePet" value={formData.favouritePet} onChange={handleInputChange} placeholder="Favourite Pet" type="text" />
        </div>

        {/* Personality */}
        <h2 className="text-xl font-semibold text-green-600 mb-2">🌟 Personality & Fun</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input className="input-style border-pink-400" name="describeYourself" value={formData.describeYourself} onChange={handleInputChange} placeholder="Describe yourself in one word" type="text" />
          <input className="input-style border-green-400" name="ifAnimal" value={formData.ifAnimal} onChange={handleInputChange} placeholder="If you could be any animal, which one and why?" type="text" />
          <input className="input-style border-orange-400" name="superpower" value={formData.superpower} onChange={handleInputChange} placeholder="Your dream superpower" type="text" />
          <input className="input-style border-blue-400" name="favouriteMemory" value={formData.favouriteMemory} onChange={handleInputChange} placeholder="Your favourite memory" type="text" />
          <input className="input-style border-pink-400" name="crush" value={formData.crush} onChange={handleInputChange} placeholder="Your crush" type="text" />
          <input className="input-style border-green-400" name="messageForMe" value={formData.messageForMe} onChange={handleInputChange} placeholder="Message for me" type="text" />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md hover:scale-105 transition"
        >
          Submit ✨
        </button>
      </form>

      {/* Go to All Entries Page */}
      <div className="mt-6">
        <Link href="/allEntries">
          <button className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition">
            📖 View All Entries
          </button>
        </Link>
      </div>
    </div>
  );
}
