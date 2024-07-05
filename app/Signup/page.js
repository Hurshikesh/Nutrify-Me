'use client'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const { data: session } = useSession();

  if(session){
    const router = useRouter()
    router.push('/Dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Sign Up for NutrifyMe</h2>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1h-8.87v2.89h5.31c-.23 1.19-1.33 3.5-3.95 3.5-2.37 0-4.31-1.97-4.31-4.31 0-2.33 1.94-4.3 4.31-4.3 1.36 0 2.28.6 2.81 1.12l2-2c-1.28-1.2-2.93-1.94-4.81-1.94-4.01 0-7.27 3.25-7.27 7.26 0 4 3.25 7.26 7.27 7.26 4.18 0 6.95-3 6.95-7.22 0-.49-.05-1.07-.11-1.5z"/>
            </svg>
            Sign Up with Google
          </button>

          <button
            onClick={() => signIn('facebook')}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.325v21.351C0 23.402.598 24 1.325 24h11.494v-9.294H9.692V10.41h3.127V7.797c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.465.099 2.795.143v3.24h-1.917c-1.504 0-1.794.715-1.794 1.763v2.311h3.587l-.467 3.295h-3.12V24h6.116c.728 0 1.325-.598 1.325-1.324V1.325C24 .598 23.402 0 22.675 0z"/>
            </svg>
            Sign Up with Facebook
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.495.998.108-.775.418-1.306.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.304-.54-1.53.105-3.185 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.003-.403c1.02.004 2.045.137 3.003.403 2.28-1.552 3.285-1.23 3.285-1.23.645 1.655.24 2.88.12 3.185.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.372.81 1.103.81 2.222 0 1.606-.015 2.896-.015 3.29 0 .32.215.693.825.577C20.565 21.796 24 17.303 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Sign Up with GitHub
          </button>
        </div>

        <div className="text-center text-gray-600 mt-4">
          Already have an account? <Link href="/login"><div className="text-green-600 hover:underline">Log In</div></Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
