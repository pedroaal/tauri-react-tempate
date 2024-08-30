export interface IButtonIconProps {
  icon: JSX.Element
  isDisabled?: boolean
  className?: string
  onClick: () => void
}

const ButtonIconWrapper = (props: IButtonIconProps) => {
  const { icon, isDisabled, className, onClick } = props

  return (
    <button
      role="button"
      type="button"
      className={`btn btn-square ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon}
    </button>
  )
}

export default ButtonIconWrapper
