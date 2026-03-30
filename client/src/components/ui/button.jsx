import clsx from "clsx"

const variants = {
  default: "bg-neutral-900 text-white hover:bg-neutral-700",
  ghost: "text-black hover:bg-neutral-100",
  outline: "text-black border border-neutral-400 hover:bg-neutral-100",
}
const sizes = {
  default: "py-2 px-3 text-sm",
  sm: "py-2 px-3 text-xs",
  icon: "size-10 flex items-center justify-center",
}

const Button = ({
  children,
  className,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "rounded-md cursor-pointer active:scale-97 font-extralight tracking-normal",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
