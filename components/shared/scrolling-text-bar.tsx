import styles from './scrolling-banner.module.css'

interface ScrollingTextBarPropTypes {
    children: React.ReactNode
    color?: string
}

const ScrollingBanner: React.FC<ScrollingTextBarPropTypes> = ({ children, color }) => {
    return (
        <div className={`${styles.container} ${color ? styles[color] : styles.lime}`}>
            <p className={styles.text}>
                {children}
            </p>
        </div>
    )
}

export default ScrollingBanner