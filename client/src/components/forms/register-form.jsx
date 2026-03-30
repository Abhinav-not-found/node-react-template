import { useForm } from "react-hook-form"
import Button from "@/components/ui/button"

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const handleFormSubmit = () => (data) => {
    console.log(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit())}
      className='text-md space-y-3'
    >
      <Field name='name' errors={errors}>
        <Input
          name={"name"}
          rules={{
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Name cannot exceed 20 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name should contain only letters",
            },
          }}
          register={register}
          errors={errors}
        />
      </Field>
      <Field name={"email"} errors={errors}>
        <Input
          name={"email"}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
          register={register}
          errors={errors}
        />
      </Field>
      <Field name={"password"} errors={errors}>
        <Input
          name={"password"}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password cannot exceed 20 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
              message: "Password must contain letters and numbers",
            },
          }}
          register={register}
          errors={errors}
        />
      </Field>
      <Button type='submit' className={"w-full mt-2 py-3 rounded-xl"}>
        Submit
      </Button>
    </form>
  )
}

export default RegisterForm

const Field = ({ children, name, errors }) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor='' className='first-letter:uppercase'>
        {name}
      </label>
      {children}
      {errors?.[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name]?.message} *</p>
      )}
    </div>
  )
}

const Input = ({ name, register, errors, type = "text", rules }) => {
  return (
    <input
      name={name}
      type={type}
      {...register(name, rules)}
      className={`ring rounded-md py-1 px-2 ${errors?.[name] && "outline-red-500 ring-red-500"}`}
    />
  )
}
