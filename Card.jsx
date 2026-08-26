import React, { useRef, useState, useCallback } from "react";
import { Calendar, MapPin, ImagePlus, Download, RotateCcw, Upload } from "lucide-react";

const COLORS = {
  maroon: "#5C1B1B",
  pink: "#F3A7C8",
  lime: "#E4EE86",
  cream: "#FBF8F2",
  gray: "#E7E5E1",
  pillYellow: "#F0ED9F",
  pillPink: "#F3AFC9",
};

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,600;0,700;1,600;1,700&display=swap');";

function Sparkle({ size = 90, style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ position: "absolute", ...style }}
    >
      <path
        d="M50 6 C58 32 68 42 94 50 C68 58 58 68 50 94 C42 68 32 58 6 50 C32 42 42 32 50 6 Z"
        fill={COLORS.lime}
        stroke={COLORS.maroon}
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoSlot({ image, onPick, label }) {
  const inputRef = useRef(null);
  return (
    <>
      <div
        onClick={() => inputRef.current && inputRef.current.click()}
        title={`Upload ${label}`}
        style={{
          width: 96,
          height: 40,
          borderRadius: 8,
          border: image ? "none" : `1.5px dashed ${COLORS.maroon}`,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={label}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: 10, color: "#9a9a9a", fontFamily: "Nunito, sans-serif" }}>
            {label}
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) onPick(file);
          e.target.value = "";
        }}
      />
    </>
  );
}

function EditableText({ value, onChange, style, as = "span" }) {
  const Tag = as;
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent)}
      style={{ outline: "none", cursor: "text", ...style }}
    >
      {value}
    </Tag>
  );
}

export default function MakeAThonCard() {
  const [logos, setLogos] = useState([null, null, null, null]);
  const [photo, setPhoto] = useState(null);
  const [dateText, setDateText] = useState("29 Aug, 11:00 AM");
  const [locationText, setLocationText] = useState("Techno Main Salt Lake");
  const [subtitle, setSubtitle] = useState("Go Beyond, Make It Real…");
  const [bottomPill, setBottomPill] = useState("Exciting Figma surprises for participants");
  const [busy, setBusy] = useState(false);

  const cardRef = useRef(null);
  const photoInputRef = useRef(null);

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const handleLogoPick = useCallback(async (index, file) => {
    const dataUrl = await readAsDataURL(file);
    setLogos((prev) => {
      const next = [...prev];
      next[index] = dataUrl;
      return next;
    });
  }, []);

  const handlePhotoPick = useCallback(async (file) => {
    const dataUrl = await readAsDataURL(file);
    setPhoto(dataUrl);
  }, []);

  const handleReset = () => {
    setLogos([null, null, null, null]);
    setPhoto(null);
    setDateText("29 Aug, 11:00 AM");
    setLocationText("Techno Main Salt Lake");
    setSubtitle("Go Beyond, Make It Real…");
    setBottomPill("Exciting Figma surprises for participants");
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const node = cardRef.current;
      const rect = node.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      const clone = node.cloneNode(true);
      clone.querySelectorAll("[data-no-export]").forEach((el) => el.remove());
      clone.querySelectorAll('[contenteditable]').forEach((el) => {
        el.removeAttribute("contenteditable");
      });

      // 👉 USER: DOWNLOAD-ONLY CSS ADJUSTMENTS 👈
      // Because SVG rendering can shift text baselines slightly compared to the browser,
      // you can manually tweak the downloaded image's padding/alignment here.
      // This will NOT affect the live preview!
      const downloadOverrides = document.createElement('style');
      downloadOverrides.innerHTML = `
        /* Adjust Yellow Pill text centering in download */
        .subtitle-pill { padding: 1px 16px 9px 16px !important; }
        
        /* Adjust Pink Pill text centering in download */
        .bottom-pill { padding: 3px 16px 11px 16px !important; }
        
        /* Adjust Calendar and Location icons in download */
        .info-item svg { transform: translateY(2px) !important; }
      `;
      clone.appendChild(downloadOverrides);

      const serializer = new XMLSerializer();
      const cloneHtml = clone.outerHTML;

      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px;height:${height}px;font-family:'Baloo 2','Nunito',sans-serif;">
            <style>${FONT_IMPORT}</style>
            ${cloneHtml}
          </div>
        </foreignObject>
      </svg>`;

      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        const scale = 2;
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.download = "make-a-thon-invite.png";
          link.href = URL.createObjectURL(blob);
          link.click();
          setBusy(false);
        }, "image/png");
      };
      img.onerror = () => {
        setBusy(false);
        alert("Couldn't render the image. Please try again.");
      };
      img.src = url;
    } catch (err) {
      setBusy(false);
      alert("Something went wrong while creating the image.");
    }
  };

  const dashedGuide = {
    position: "absolute",
    borderColor: COLORS.maroon,
    opacity: 0.6,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f2f2f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>

      <div style={{ width: "100%", maxWidth: 520, marginBottom: 20, textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 24, color: "#222", margin: 0 }}>
          Make-a-thon Attendee Card
        </h1>
        <p style={{ color: "#666", fontSize: 14, marginTop: 6 }}>
          Tap any logo slot or the photo area to upload. Tap text to edit it. Then download.
        </p>
      </div>

      {/* Card wrapper with checkerboard border */}
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          aspectRatio: "1 / 1",
          padding: 22,
          boxSizing: "border-box",
          backgroundImage: `repeating-conic-gradient(${COLORS.pink} 0% 25%, ${COLORS.lime} 0% 50%)`,
          backgroundSize: "70px 70px",
          borderRadius: 18,
        }}
      >
        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: COLORS.cream,
            borderRadius: 14,
            boxSizing: "border-box",
            padding: "22px 22px 18px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* decorative dashed guide lines */}
          <div style={{ ...dashedGuide, left: 8, top: "14%", bottom: "8%", borderLeft: "1.5px dashed", }} />
          <div style={{ ...dashedGuide, right: 8, top: "60%", bottom: "8%", borderRight: "1.5px dashed" }} />
          <div style={{ ...dashedGuide, left: "2%", right: "88%", top: "18%", borderTop: "1.5px dashed" }} />

          <Sparkle size={78} style={{ top: 8, right: -6 }} />
          <Sparkle size={110} style={{ bottom: 78, left: -14 }} />

          {/* Header pill with 4 logo frames */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#fff",
              border: `1.5px solid ${COLORS.maroon}`,
              borderRadius: 999,
              padding: "8px 16px",
              boxSizing: "border-box",
              maxWidth: "100%",
              zIndex: 2,
            }}
          >
            <LogoSlot image={logos[0]} onPick={(f) => handleLogoPick(0, f)} label="Logo 1" />
            <span style={{ color: COLORS.maroon, fontWeight: 700 }}>×</span>
            <LogoSlot image={logos[1]} onPick={(f) => handleLogoPick(1, f)} label="Logo 2" />
            <span style={{ color: COLORS.maroon, fontWeight: 700 }}>×</span>
            <LogoSlot image={logos[2]} onPick={(f) => handleLogoPick(2, f)} label="Logo 3" />
            <span style={{ color: COLORS.maroon, fontWeight: 700 }}>×</span>
            <LogoSlot image={logos[3]} onPick={(f) => handleLogoPick(3, f)} label="Logo 4" />
          </div>

          {/* Title block */}
          <div style={{ textAlign: "center", marginTop: 18, zIndex: 2 }}>
            <div
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 17,
                color: COLORS.maroon,
                letterSpacing: 1,
              }}
            >
              I AM ATTENDING
            </div>
            <div
              style={{
                fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 800,
                fontSize: 40,
                color: COLORS.maroon,
                lineHeight: 1.05,
                margin: "2px 0 10px",
              }}
            >
              MAKE-A-THON
            </div>
            <EditableText
              value={subtitle}
              onChange={setSubtitle}
              style={{
                display: "inline-block",
                background: COLORS.pillYellow,
                border: `1.5px solid ${COLORS.maroon}`,
                borderRadius: 999,
                padding: "6px 18px",
                fontFamily: "'Baloo 2', sans-serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: 15,
                color: COLORS.maroon,
              }}
            />
          </div>

          {/* Photo upload area */}
          <div
            onClick={() => photoInputRef.current && photoInputRef.current.click()}
            style={{
              marginTop: 16,
              width: "78%",
              flex: 1,
              minHeight: 0,
              background: COLORS.gray,
              border: `2px dashed ${COLORS.maroon}`,
              borderRadius: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              zIndex: 2,
              position: "relative",
            }}
          >
            {photo ? (
              <img
                src={photo}
                alt="Your upload"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <ImagePlus size={30} color={COLORS.maroon} strokeWidth={1.6} />
                <span
                  style={{
                    marginTop: 8,
                    fontFamily: "'Baloo 2', sans-serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    color: COLORS.maroon,
                    fontSize: 14,
                  }}
                >
                  Your Photo Here
                </span>
              </>
            )}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) handlePhotoPick(file);
              e.target.value = "";
            }}
          />

          {/* Date / location row */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Baloo 2', sans-serif",
              fontStyle: "italic",
              fontWeight: 600,
              color: COLORS.maroon,
              fontSize: 14,
              zIndex: 2,
            }}
          >
            <Calendar size={16} color={COLORS.maroon} />
            <EditableText value={dateText} onChange={setDateText} />
            <span style={{ opacity: 0.6 }}>|</span>
            <MapPin size={16} color={COLORS.maroon} />
            <EditableText value={locationText} onChange={setLocationText} />
          </div>

          {/* Bottom pill */}
          <EditableText
            value={bottomPill}
            onChange={setBottomPill}
            style={{
              marginTop: 12,
              display: "inline-block",
              background: COLORS.pillPink,
              borderRadius: 999,
              padding: "9px 20px",
              fontFamily: "'Baloo 2', sans-serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.maroon,
              zIndex: 2,
              textAlign: "center",
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div
        data-no-export
        style={{
          display: "flex",
          gap: 12,
          marginTop: 22,
        }}
      >
        <button
          onClick={handleDownload}
          disabled={busy}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.maroon,
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "12px 22px",
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: busy ? "default" : "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          <Download size={18} />
          {busy ? "Preparing…" : "Download Image"}
        </button>
        <button
          onClick={handleReset}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
            color: COLORS.maroon,
            border: `1.5px solid ${COLORS.maroon}`,
            borderRadius: 999,
            padding: "12px 22px",
            fontFamily: "'Baloo 2', sans-serif",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div style={{ marginTop: 14, color: "#888", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
        <Upload size={13} />
        Tip: upload square-ish logo images for the cleanest fit in each frame.
      </div>
    </div>
  );
}