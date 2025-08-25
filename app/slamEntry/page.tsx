'use client'
import { supabase } from "@/lib/SupabaseClient"

import { useState } from "react"
import { useEffect } from "react"
export default function SlamEntry() {
  useEffect(() => {
    async function getUser() {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Error fetching user:", error.message)
      } else {
        localStorage.setItem('displayName',user?.user_metadata.full_name)
        console.log("User details:", user)
      }
    }
    getUser()
  }, [])

  const full_name = localStorage.getItem('displayName')
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    birthday: "",
    image: null as File | null,
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
  })

  const handleInputChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }))
  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    let imageUrl = null;

    if (formData.image instanceof File) {
      const fileExt = formData.image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `slam/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("slamimages")
        .upload(filePath, formData.image);

      if (uploadError) {
        console.error("Image upload failed:", uploadError);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("slamimages")
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    const { data, error } = await supabase
      .from("slambook")
      .insert([{ ...formData, image: imageUrl }])
      .select();

    if (error) console.error("DB insert error:", error);
    else console.log("Inserted successfully:", data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-pink-200 to-green-200 p-6">
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
          <input  className="input-style placeholder-gray-900" name="name" value={formData.name || full_name || ""} onChange={handleInputChange} placeholder="Enter your Name" type="text"/>
          <input className="input-style border-pink-400" name="nickname" value={formData.nickname} onChange={handleInputChange} placeholder="Nickname" type="text" />
          <input className="input-style border-green-400" name="birthday" value={formData.birthday} onChange={handleInputChange} type="date" />
          <input className="input-style border-orange-400" name="image" onChange={handleInputChange} type="file" />
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
    </div>
  )
}
