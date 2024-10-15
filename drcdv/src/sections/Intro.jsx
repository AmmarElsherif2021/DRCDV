import { Link } from 'react-router-dom'

export function Intro() {
  return (
    <div className='intro'>
      <h1>Welcome to Our App!</h1>
      <div>
        <Link to='/login' className='btn btn-primary'>
          Log In
        </Link>
        <Link to='/signup' className='btn btn-secondary'>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
