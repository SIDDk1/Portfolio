import React, { useState, useEffect } from "react";
import {
  getCertificates,
  addCertificate,
  deleteCertificate,
  resetCertificates,
  subscribeCertificates,
  isPdfUrl,
  Certificate,
} from "../utils/certificateStore";
import { MdArrowBack, MdCloudUpload, MdDelete, MdOpenInNew, MdRefresh, MdAddCircleOutline, MdPictureAsPdf } from "react-icons/md";
import "./styles/AdminPortal.css";

const AdminPortal: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(getCertificates());
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [imageType, setImageType] = useState<"file" | "url">("file");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFileData, setImageFileData] = useState("");
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    return subscribeCertificates(() => {
      setCertificates(getCertificates());
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert("File size is too large. Please select a file under 8MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageFileData(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a certificate title.");
      return;
    }

    const finalImage = imageType === "file" ? imageFileData : imageUrl.trim();
    if (!finalImage) {
      alert("Please upload an image/PDF file or provide an image/PDF URL.");
      return;
    }

    addCertificate(name, link, finalImage);
    setSuccessMsg(`Certificate "${name.trim()}" successfully uploaded and added!`);
    setName("");
    setLink("");
    setImageUrl("");
    setImageFileData("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDelete = (id: number, certName: string) => {
    if (window.confirm(`Are you sure you want to delete "${certName}"?`)) {
      deleteCertificate(id);
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all certificates back to system default? This will clear custom uploads.")) {
      resetCertificates();
    }
  };

  const filteredCerts = certificates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const previewImage = imageType === "file" ? imageFileData : imageUrl;

  return (
    <div className="admin-portal-container">
      <div className="admin-portal-wrapper">
        <div className="admin-header">
          <div className="admin-header-title">
            <h1>Certificate Admin Portal</h1>
            <p>Directly upload & manage certificates (Images & PDFs) visible on your live portfolio</p>
          </div>
          <a href="/" className="admin-back-btn">
            <MdArrowBack /> Back to Main Portfolio
          </a>
        </div>

        {successMsg && <div className="alert-success">{successMsg}</div>}

        <div className="admin-grid">
          {/* Upload Form */}
          <div className="admin-card">
            <h2 className="admin-card-title">
              <MdAddCircleOutline /> Upload New Certificate
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Certificate Title *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>Original Record / Verification Link (Optional)</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="e.g. https://drive.google.com/... or https://coursera.org/verify/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Certificate Document / Image Source *</label>
                <div className="image-tab-buttons">
                  <button
                    type="button"
                    className={`image-tab-btn ${imageType === "file" ? "active" : ""}`}
                    onClick={() => setImageType("file")}
                  >
                    Upload Image or PDF File
                  </button>
                  <button
                    type="button"
                    className={`image-tab-btn ${imageType === "url" ? "active" : ""}`}
                    onClick={() => setImageType("url")}
                  >
                    Image/PDF URL or Drive Link
                  </button>
                </div>

                {imageType === "file" ? (
                  <label className="file-dropzone">
                    <MdCloudUpload className="file-dropzone-icon" />
                    <div>
                      {imageFileData ? (
                        <span style={{ color: "#c2a4ff" }}>
                          ✓ {isPdfUrl(imageFileData) ? "PDF Document Selected" : "Image File Selected"}
                        </span>
                      ) : (
                        <span>Click or Drag & Drop certificate file (JPG, PNG, WebP, or PDF)</span>
                      )}
                    </div>
                    <input type="file" accept="image/*,.pdf,application/pdf" onChange={handleFileChange} />
                  </label>
                ) : (
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Paste image/PDF URL or Google Drive link"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                )}
              </div>

              <button type="submit" className="submit-btn">
                Add & Publish Certificate
              </button>
            </form>
          </div>

          {/* Live Card Preview */}
          <div className="admin-card">
            <h2 className="admin-card-title">Live Portfolio Card Preview</h2>
            <div className="preview-card-container">
              <div className="cert-preview-card">
                {previewImage ? (
                  isPdfUrl(previewImage) ? (
                    <div className="cert-pdf-thumbnail" style={{ height: "220px" }}>
                      <MdPictureAsPdf />
                      <span>PDF Document Certificate</span>
                    </div>
                  ) : (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="cert-preview-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                      }}
                    />
                  )
                ) : (
                  <div
                    style={{
                      height: "220px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      background: "#000",
                    }}
                  >
                    Image/PDF Preview Area
                  </div>
                )}
                <div className="cert-preview-info">
                  <h4>{name.trim() || "Certificate Title Preview"}</h4>
                  <p>Click to view fullscreen →</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Certificates Management List */}
        <div className="admin-card">
          <div className="admin-list-header">
            <h2 className="admin-card-title" style={{ margin: 0 }}>
              Active Certificates ({certificates.length})
            </h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="text"
                className="admin-input admin-search-input"
                placeholder="Search certificates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="button" className="reset-all-btn" onClick={handleReset} title="Reset to initial default list">
                <MdRefresh /> Reset
              </button>
            </div>
          </div>

          <div className="admin-cert-grid">
            {filteredCerts.map((cert) => (
              <div key={cert.id} className="admin-cert-item">
                {cert.isCustom && <div className="badge-custom">Custom Upload</div>}
                {isPdfUrl(cert.image) ? (
                  <div className="cert-pdf-thumbnail" style={{ height: "160px" }}>
                    <MdPictureAsPdf />
                    <span>PDF Document</span>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="admin-cert-thumb"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                    }}
                  />
                )}
                <div className="admin-cert-details">
                  <h4>{cert.name}</h4>
                  <div className="admin-cert-actions">
                    {cert.link && cert.link !== "#" && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn action-view"
                      >
                        <MdOpenInNew /> View Link
                      </a>
                    )}
                    <button
                      type="button"
                      className="action-btn action-delete"
                      onClick={() => handleDelete(cert.id, cert.name)}
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
