import "./styles/Certifications.css";
const CERTIFICATES = [
  {
    id: 1,
    name: "Advanced Web Development",
    image: "/images/cert-placeholder.png",
    link: "https://drive.google.com/drive/folders/1Pl_UT1Ob3zl6G3Ujf5XEUY8sSta6_UyP?usp=sharing",
  },
  {
    id: 2,
    name: "React.js Certification",
    image: "/images/cert-placeholder.png",
    link: "https://drive.google.com/drive/folders/1Pl_UT1Ob3zl6G3Ujf5XEUY8sSta6_UyP?usp=sharing",
  },
  {
    id: 3,
    name: "Full Stack Software Engineering",
    image: "/images/cert-placeholder.png",
    link: "https://drive.google.com/drive/folders/1Pl_UT1Ob3zl6G3Ujf5XEUY8sSta6_UyP?usp=sharing",
  },
  {
    id: 4,
    name: "Python Automation",
    image: "/images/cert-placeholder.png",
    link: "https://drive.google.com/drive/folders/1Pl_UT1Ob3zl6G3Ujf5XEUY8sSta6_UyP?usp=sharing",
  },
];

const Certifications = () => {
  // Duplicating the array to allow for a seamless infinite scroll loop
  const duplicatedCertificates = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <div className="certifications-section section-container" id="certifications">
      <h2>
        My <span>Certifications</span>
      </h2>
      
      <div className="certifications-slider-container">
        <div className="certifications-track">
          {duplicatedCertificates.map((cert, index) => (
            <div 
              className="cert-card" 
              key={`${cert.id}-${index}`}
              onClick={() => window.open(cert.link, "_blank", "noopener,noreferrer")}
              title={`View ${cert.name}`}
            >
              <div className="cert-image-container">
                <img src={cert.image} alt={cert.name} draggable="false" />
              </div>
              <div className="cert-info">
                <h4>{cert.name}</h4>
                <p>Click to view record &rarr;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
