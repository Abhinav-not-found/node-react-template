import { Link } from "react-router"

const AuthUi = ({ children, variant = "login" }) => {
  return (
    <div className='w-md space-y-8 bg-white px-5 py-8 md:p-10 rounded-2xl shadow-lg'>
      <h1 className='text-4xl font-semibold tracking-tighter text-center'>
        {variant === "register" ? "Register" : "Login"}
      </h1>
      {children}
      <p className='text-base md:text-md text-center'>
        {variant === "register" ? "Already" : "Don't"} have an account?{" "}
        <Link
          to={variant === "register" ? "/login" : "/register"}
          className='underline underline-offset-2'
        >
          {variant === "register" ? "Login" : "Register"}
        </Link>
      </p>
    </div>
  )
}

export default AuthUi
