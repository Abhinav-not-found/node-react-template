import RegisterForm from "@/components/forms/register-form"
import AuthUi from "@/components/ui/auth-ui"

const Register = () => {
  return (
    <main className='flex items-center justify-center h-screen bg-neutral-100 px-3 md:px-0'>
      <AuthUi variant='register'>
        <RegisterForm />
      </AuthUi>
    </main>
  )
}

export default Register
