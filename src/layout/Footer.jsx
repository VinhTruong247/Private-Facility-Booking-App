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
        <h2>Bringing communities and spaces together.</h2>
      </div>

      <div className="foot-media">
        <FacebookIcon />
        <TwitterIcon />
        <LinkedInIcon />
        <InstagramIcon />
        <YouTubeIcon />
      </div>

      <div className="footer-menu">

        <div className="platform-features">
          <h5>Platform Features</h5>
          <ul>
            <li>Platform & Partnership Overview</li>
            <li>Scheduling & Reservations System</li>
            <li>Work Order Management System</li>
            <li>Building Automation Systems</li>
            <li>Facilitron FIT</li>
            <li>Implementation & Training</li>
            <li>Reporting & Financials</li>
            <li>Cost Analysis</li>
            <li>Pricing</li>
            <li>Facility Management Software</li>
            <li>School Facility Management</li>
            <li>Getting Started</li>
            <li>Our Support Team</li>
            <li>Facilitron vs Other Platforms</li>
          </ul>
        </div>

        <div className="facility-rentals">
          <h5>Renting Facilities</h5>
          <ul>
            <li>Renting Facilities Overview</li>
            <li>Facility Rentals for Education</li>
            <li>Facility Rentals for Sports</li>
            <li>Facility Rentals for Music & Arts</li>
            <li>Facility Rentals for Religious Groups</li>
            <li>Theater Rentals</li>
          </ul>
        </div>

        <div class="resources">
          <h5>Resources</h5>
          <ul>
            <li>News & Updates</li>
            <li>Webinars</li>
            <li>Case Studies</li>
            <li>Facilitron Famous</li>
            <li>Schedule a Demo</li>
          </ul>
        </div>

        <div class="about-us">
          <h5>About Us</h5>
          <ul>
            <li>The Company</li>
            <li>The Team</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
          <h5>Support</h5>
          <ul>
            <li>Administrator Support</li>
            <li>Work Orders Support</li>
            <li>Launch Chat</li>
            <li>1-800-272-2962</li>
          </ul>
        </div>

        <div className="copyright">
          <p>©2024 SportScape Connect. All Rights Reserved </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;