import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdChevronLeft, MdChevronRight, MdClose, MdArrowOutward, MdFolderOpen, MdPictureAsPdf } from "react-icons/md";
import "./styles/Certifications.css";
import { getCertificates, subscribeCertificates, isPdfUrl, Certificate } from "../utils/certificateStore";

const Certifications = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(getCertificates());
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return subscribeCertificates(() => {
      setCertificates(getCertificates());
    });
  }, []);

  const duplicatedCertificates = [...certificates, ...certificates];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const animate = () => {
      // Pause auto-scroll when hovered, actively manual-scrolling, or when fullscreen modal/directory is active
      if (!isHovered && !isScrolling && selectedCertIndex === null && !isDirectoryOpen) {
        const speed = 0.8; // Butter-smooth continuous scroll speed
        let nextScroll = slider.scrollLeft + speed;
        const halfWidth = slider.scrollWidth / 2;

        if (nextScroll >= halfWidth) {
          nextScroll = nextScroll - halfWidth;
        }
        slider.scrollLeft = nextScroll;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, isScrolling, selectedCertIndex, isDirectoryOpen]);

  const openFullscreen = (certId: number) => {
    const idx = certificates.findIndex((c) => c.id === certId);
    setSelectedCertIndex(idx !== -1 ? idx : 0);
  };

  const closeFullscreen = () => {
    setSelectedCertIndex(null);
  };

  const toggleNativeFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const element = imageRef.current;
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen?.().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (selectedCertIndex === null) return;
    let nextIdx = selectedCertIndex;
    if (direction === "prev") {
      nextIdx = selectedCertIndex === 0 ? certificates.length - 1 : selectedCertIndex - 1;
    } else {
      nextIdx = selectedCertIndex === certificates.length - 1 ? 0 : selectedCertIndex + 1;
    }
    setSelectedCertIndex(nextIdx);
  };

  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullscreen();
      } else if (e.key === "ArrowLeft") {
        navigateModal("prev");
      } else if (e.key === "ArrowRight") {
        navigateModal("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertIndex, certificates.length]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      // Resume auto-scroll after 3 seconds of inactivity
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 3000);

      const slider = sliderRef.current;
      const halfWidth = slider.scrollWidth / 2;

      // Infinite wrapping check to prevent hitting boundary
      if (direction === "left" && slider.scrollLeft <= 5) {
        slider.scrollLeft = halfWidth;
      } else if (direction === "right" && slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5) {
        slider.scrollLeft = slider.scrollLeft - halfWidth;
      }

      const card = slider.querySelector(".cert-card");
      const cardWidth = card ? card.getBoundingClientRect().width + 50 : 450;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="certifications-section" id="certifications">
      <div className="certifications-header section-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="certifications-controls">
          <button 
            className="directory-toggle-btn"
            onClick={() => setIsDirectoryOpen(true)}
            title="Open Certificate Directory"
          >
            <MdFolderOpen style={{ marginRight: '8px', fontSize: '20px' }} /> View All
          </button>
          <button 
            className="control-btn prev" 
            onClick={() => scroll("left")}
            aria-label="Previous Certificates"
          >
            <MdChevronLeft />
          </button>
          <button 
            className="control-btn next" 
            onClick={() => scroll("right")}
            aria-label="Next Certificates"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
      
      <div 
        className="certifications-slider-container" 
        ref={sliderRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="certifications-track">
          {duplicatedCertificates.map((cert, index) => (
            <div 
              className="cert-card" 
              key={`${cert.id}-${index}`}
              onClick={() => openFullscreen(cert.id)}
              title={`View ${cert.name}`}
            >
              <div className="cert-image-container">
                {isPdfUrl(cert.image) ? (
                  <iframe
                    src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                    title={cert.name}
                    style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                  />
                ) : (
                  <img src={cert.image} alt={cert.name} draggable="false" loading="lazy" referrerPolicy="no-referrer" />
                )}
              </div>
              <div className="cert-info">
                <h4>{cert.name}</h4>
                <p>Click to view document &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Fullscreen Certificate Modal inside React Portal */}
      {selectedCertIndex !== null && certificates[selectedCertIndex] && createPortal(
        <div className="cert-modal-overlay" onClick={closeFullscreen}>
          <button className="modal-close-btn" onClick={closeFullscreen} aria-label="Close fullscreen">
            <MdClose />
          </button>
          
          <button 
            className="modal-nav-btn prev" 
            onClick={(e) => { e.stopPropagation(); navigateModal("prev"); }}
            aria-label="Previous certificate"
          >
            <MdChevronLeft />
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {isPdfUrl(certificates[selectedCertIndex].image) ? (
              <div className="modal-pdf-wrapper">
                <object
                  data={certificates[selectedCertIndex].image}
                  type="application/pdf"
                  className="modal-pdf-object"
                >
                  <div style={{ padding: "40px", textAlign: "center", color: "#fff" }}>
                    <MdPictureAsPdf style={{ fontSize: "60px", color: "#c2a4ff" }} />
                    <h3>{certificates[selectedCertIndex].name}</h3>
                    <a
                      href={certificates[selectedCertIndex].image}
                      download={`${certificates[selectedCertIndex].name}.pdf`}
                      className="modal-external-link"
                      style={{ display: "inline-flex", marginTop: "20px" }}
                    >
                      Download PDF Certificate
                    </a>
                  </div>
                </object>
              </div>
            ) : (
              <div className="modal-image-wrapper">
                <img 
                  ref={imageRef}
                  src={certificates[selectedCertIndex].image.replace("=w800", "=w2000")} 
                  alt={certificates[selectedCertIndex].name} 
                  onClick={toggleNativeFullscreen}
                  title="Click to toggle true fullscreen"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="modal-info-panel">
              <h3>{certificates[selectedCertIndex].name}</h3>
              {certificates[selectedCertIndex].link && certificates[selectedCertIndex].link !== "#" && (
                <a 
                  href={certificates[selectedCertIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-external-link"
                >
                  View Original Record <MdArrowOutward />
                </a>
              )}
            </div>
          </div>

          <button 
            className="modal-nav-btn next" 
            onClick={(e) => { e.stopPropagation(); navigateModal("next"); }}
            aria-label="Next certificate"
          >
            <MdChevronRight />
          </button>
        </div>,
        document.body
      )}

      {/* Certificate Folder Directory Overlay Modal inside React Portal */}
      {isDirectoryOpen && createPortal(
        <div className="cert-directory-overlay" onClick={() => setIsDirectoryOpen(false)}>
          <div className="cert-directory-content" onClick={(e) => e.stopPropagation()}>
            <div className="cert-directory-header">
              <h3>Certificate Directory ({certificates.length})</h3>
              <button className="directory-close-btn" onClick={() => setIsDirectoryOpen(false)} aria-label="Close directory">
                <MdClose />
              </button>
            </div>
            <div className="cert-directory-grid">
              {certificates.map((cert) => (
                <div 
                  className="directory-card" 
                  key={cert.id}
                  onClick={() => {
                    const idx = certificates.findIndex((c) => c.id === cert.id);
                    setSelectedCertIndex(idx !== -1 ? idx : 0);
                    setIsDirectoryOpen(false);
                  }}
                >
                  <div className="directory-image-container">
                    {isPdfUrl(cert.image) ? (
                      <iframe
                        src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        title={cert.name}
                        style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
                      />
                    ) : (
                      <img src={cert.image} alt={cert.name} loading="lazy" referrerPolicy="no-referrer" />
                    )}
                  </div>
                  <h4>{cert.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Certifications;
