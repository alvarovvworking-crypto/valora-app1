import { supabase } from '../lib/supabase'

export default function Login() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    if (error) console.error('Error:', error.message)
  }

  return (
    <div>
      <h1>Valora</h1>
      <button onClick={handleGoogleLogin}>
        Continuar con Google
      </button>
    </div>
  )
}
5
