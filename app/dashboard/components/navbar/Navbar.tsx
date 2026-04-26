import styles from "./navbar.module.css";

export default function Navbar() {
  const now = new Date();

  const time = now
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s+/g, ""); // 9:15AM

  const day = now.toLocaleDateString("en-US", {
    weekday: "short",
  }); // Sun

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  }); // April 26

  const result = `${time} ${day}, ${date}`;

  return (
    
    <div className={styles.navbar}>
      <div className={styles.sideNavbar}>
        <div className={styles.hamburger}>☰</div>
        <div>Navbar</div>
      </div>

      <div className={styles.rightSection}>
        <p>{result}</p>

        <div className={styles.avatarWrapper}>
          <img
            className={styles.gengar}
            src="https://media.pocketgamer.biz/images/112645/77243/pokemonunitegengar_s470.jpg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}