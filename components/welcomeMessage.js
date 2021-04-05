const WelcomeMessage = ({ value, styles, user }) => (
  <div>
    {value ? (
      <span className={styles.title}>
        Welcome Back,
        <br /> your last configuration has benn saved
      </span>
    ) : (
      <span className={styles.title}>
        Welcome, {user}
        <br /> There's no saved theme. please edit your config and save it.
      </span>
    )}
  </div>
)

export default WelcomeMessage
