import "./NavStyle.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "../assets/css/footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>©2023 Cursus. All Rights Reserved </p>
      </div>

      <div className="foot-media">
        <FacebookIcon />
        <TwitterIcon />
        <LinkedInIcon />
        <InstagramIcon />
        <YouTubeIcon />
      </div>
    </footer>
  );
}

export default Footer;