import "./NavStyle.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer className="d-flex flex-column flex-md-row align-items-center">
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