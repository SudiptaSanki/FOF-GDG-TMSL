import StarShape from './StarShape';
import './Frame.css';

const LOGOS = {
  fofkol: 'https://raw.githubusercontent.com/Alex-DevDrift/Assets/main/LEOxFOFKol/FOF%20KOL.png',
  tmsl: 'https://raw.githubusercontent.com/Alex-DevDrift/Assets/main/LEOxFOFKol/TMSL%20LOGO.png',
  gdg: 'https://raw.githubusercontent.com/Alex-DevDrift/Assets/main/LEOxFOFKol/GDG_On_Campus_TMSL.png',
  leo: 'https://raw.githubusercontent.com/Alex-DevDrift/Assets/main/LEOxFOFKol/LEO.png.png',
};

/* SVG decorations strictly encoded so html2canvas renders them reliably */
const encodeSvg = (svgStr) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;

const DECO = {
  diamond: encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" style="background:transparent;" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12 2L22 12L12 22L2 12Z" fill="#F3A7C8" stroke="#5C1B1B" stroke-width="1.5" stroke-linejoin="round"/></svg>`),
  star: encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" style="background:transparent;" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12 2L14 9L21 9L15.5 13.5L17.5 21L12 16.5L6.5 21L8.5 13.5L3 9L10 9Z" fill="#E4EE86" stroke="#5C1B1B" stroke-width="1.2" stroke-linejoin="round"/></svg>`),
  sparkle: encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" style="background:transparent;" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 13 8 18 12C18 12 13 16 12 22C12 22 11 16 6 12C6 12 11 8 12 2Z" fill="#F0ED9F" stroke="#5C1B1B" stroke-width="1.2" stroke-linejoin="round"/></svg>`)
};

export default function Frame({ userPhoto, onRemovePhoto }) {
  return (
    <div className="frame-outer">
      {/* Checkerboard border */}
      <div className="frame-checkerboard" id="capture-frame">
        <div className="frame-inner">
          {/* ── Decorative dashed guide lines ── */}
          <div className="guide guide-top" />
          <div className="guide guide-bottom" />
          <div className="guide guide-left" />
          <div className="guide guide-right" />
          {/* Removed bottom right cutout square as requested */}

          {/* Left ticks */}
          <div className="guide-tick tick-1" />
          <div className="guide-tick tick-2" />
          <div className="guide-tick tick-3" />
          <div className="guide-tick tick-4" />

          {/* ── Decorative elements ON the card (included in download) ── */}
          <img src={DECO.diamond} style={{width: 32, height: 32}} className="card-deco deco-top-left" alt="" />
          <img src={DECO.star} style={{width: 36, height: 36}} className="card-deco deco-top-right" alt="" />
          <img src={DECO.sparkle} style={{width: 28, height: 28}} className="card-deco deco-right-mid" alt="" />
          <img src={DECO.diamond} style={{width: 28, height: 28}} className="card-deco deco-bottom-left" alt="" />
          <img src={DECO.sparkle} style={{width: 32, height: 32}} className="card-deco deco-bottom-right" alt="" />
          <img src={DECO.star} style={{width: 32, height: 32}} className="card-deco deco-left-mid" alt="" />

          {/* ── Header: Logo pill ── */}
          <div className="logo-pill">
            <img src={LOGOS.fofkol} alt="Friends of Figma Kolkata" className="logo-img logo-fofkol" crossOrigin="anonymous" />
            <span className="logo-separator">×</span>
            <img src={LOGOS.tmsl} alt="Techno Main Salt Lake" className="logo-img logo-tmsl" crossOrigin="anonymous" />
            <span className="logo-separator">×</span>
            <img src={LOGOS.gdg} alt="GDG On Campus TMSL" className="logo-img logo-gdg" crossOrigin="anonymous" />
            <span className="logo-separator">×</span>
            <img src={LOGOS.leo} alt="LEO" className="logo-img logo-leo" crossOrigin="anonymous" />
          </div>

          {/* ── Title Block ── */}
          <div className="title-block">
            <h2 className="title-attending">I AM ATTENDING</h2>
            <h1 className="title-main">MAKE-A-THON</h1>
            <div style={{ paddingTop: '8px' }}>
              <div className="subtitle-pill">
                Go Beyond, Make It Real...
              </div>
            </div>
          </div>

          {/* ── Photo area ── */}
          <div className="photo-area">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="Your uploaded photo"
                className="user-photo"
              />
            ) : (
              <div className="photo-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5C1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                <span className="photo-placeholder-text">Your Photo Here</span>
              </div>
            )}
          </div>

          {/* ── Remove photo button (only in UI, excluded from export) ── */}
          {userPhoto && onRemovePhoto && (
            <button
              className="remove-photo-btn"
              onClick={onRemovePhoto}
              data-html2canvas-ignore="true"
              title="Remove photo"
            >
              ✕
            </button>
          )}

          {/* ── Date & Location row ── */}
          <div className="info-row">
            <span className="info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              29 Aug, 11:00 AM
            </span>
            <span className="info-divider">|</span>
            <span className="info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Techno Main Salt Lake
            </span>
          </div>

          {/* ── Bottom pill ── */}
          <div className="bottom-pill">
            <span>✨ Exciting Figma surprises for participants ✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
