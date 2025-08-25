// 'use client'
// import { supabase } from "@/lib/SupabaseClient"

// const app = ()=>{
  
//    async function signInWithGoogle() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//         redirectTo: "http://localhost:3000/slamEntry", 
//       },
//   })
//   if (error) console.error(error)
//   else console.log('Redirecting...', data)
// }
   

// async function signInWithGithub() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//   })
//    if (error) console.error(error)
//   else console.log('Redirecting...', data)
// }

// async function signInWithFacebook() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//   })
//   if (error) console.error(error)
//   else console.log('Redirecting...', data)
// } 

// async function signInWithFigma() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//   })
//   if (error) console.error(error)
//   else console.log('Redirecting...', data)
// }

// async function signInWithSpotify() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//   })
//   if (error) console.error(error)
//   else console.log('Redirecting...', data)
// }
//     return (
//         <div>
//             <div>
//                 <h1>Slam Tales – Memories & More</h1>
//                 <h3>More than words, it’s a bond.</h3>
//             </div>
//            <div>
//             <button onClick={signInWithGoogle}>Login with Google</button>
//             <button onClick={signInWithGithub}>Login with Github</button>
//             <button onClick={signInWithFacebook}>Login with Facebook</button>
//             <button onClick={signInWithFigma}>Login with Figma</button>
//             <button onClick={signInWithSpotify}>Login with Spotify</button>
//            </div>
//         </div>
//     )
// }
// export default app;
'use client'
import { supabase } from "@/lib/SupabaseClient"

export default function App() {
  async function signInWithGoogle() {
    const {data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "http://localhost:3000/slamEntry" },
    })
    if (error) console.error(error)
    else console.log("Login details",data)
  }

  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    })
    if (error) console.error(error)
  }

  async function signInWithFacebook() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    })
    if (error) console.error(error)
  }

  async function signInWithFigma() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "figma",
    })
    if (error) console.error(error)
  }

  async function signInWithSpotify() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
    })
    if (error) console.error(error)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-pink-400 to-purple-500 text-white">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-10 w-[90%] max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-yellow-200 drop-shadow">
          Slam Tales – Memories & More
        </h1>
        <h3 className="text-lg mb-6 italic text-green-200">
          More than words, it’s a bond.
        </h3>

        <div className="flex flex-col gap-4">
          <button
            onClick={signInWithGoogle}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold shadow-md"
          >
            Login with Google
          </button>
          <button
            onClick={signInWithGithub}
            className="w-full bg-gray-800 hover:bg-gray-900 py-3 rounded-xl font-semibold shadow-md"
          >
            Login with Github
          </button>
          <button
            onClick={signInWithFacebook}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold shadow-md"
          >
            Login with Facebook
          </button>
          <button
            onClick={signInWithFigma}
            className="w-full bg-pink-500 hover:bg-pink-600 py-3 rounded-xl font-semibold shadow-md"
          >
            Login with Figma
          </button>
          <button
            onClick={signInWithSpotify}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold shadow-md"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  )
}
