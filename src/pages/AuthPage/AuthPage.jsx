import { useState } from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {

  const [showBool, setShowBool] = useState(false)

  function handleClick() {
    setShowBool(!showBool)
  }
 
  return (
    <main className='w-full'>
      <div className='flex justify-center'>
        <button onClick={handleClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4'>Show {showBool ? "Sign Up Page" : "Login Page"}</button>
      </div>
      {
        showBool ?
        <LoginForm setUser={setUser} />
        :
        <SignUpForm setUser={setUser} />
      }
    </main>
  );
}