import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>CineVerse</h2>
          <p>Your Ultimate Movie Destination</p>
        </div>
        
        <div className="footer-social">
          <h3>Connect with Me</h3>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/sumit-jha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">🔗</span>
              LinkedIn
            </a>
            <a 
              href="https://x.com/_sumitjha_?t=4nSWLPjfWOEhS06PoX9-Lg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <span className="social-icon">𝕏</span>
              Twitter
            </a>
          </div>
        </div>

        <div className="footer-credits">
          <p>Made with ❤️ by <span className="highlight">Sumit Jha</span></p>
          <p className="copyright">© 2024 CineVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 