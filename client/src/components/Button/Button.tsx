import './Button.scss'

interface ButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLButtonElement> {
    className?: string
    disabled?: boolean
}
export default function Button(props: ButtonProps) {

    const { className, children, disabled, ...rest } = props

    const classes = [
        className,
        '--button',
        disabled ? '--button-inactive' : ''
    ].join(' ')

    return (
        <button className={classes} {...rest} disabled={disabled}>
            {children}
        </button>
    )
}