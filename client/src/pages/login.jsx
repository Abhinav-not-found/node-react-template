import LoginForm from "@/components/forms/login-form"
import AuthUi from "@/components/ui/auth-ui"

const Login = () => {
  return (
    <main className='flex items-center justify-center h-screen bg-neutral-100 px-3 md:px-0'>
      <AuthUi>
        <LoginForm />
      </AuthUi>
    </main>
  )
}

export default Login
