export interface Certificate {
  id: number;
  name: string;
  link: string;
  image: string;
  isCustom?: boolean;
}

export const INITIAL_CERTIFICATES: Certificate[] = [
  { id: 1, name: "Artificial Intelligence", link: "https://drive.google.com/file/d/17CkK5qMYc3iF-GHnlcM1KTSKqSL5JTko/view", image: "https://lh3.googleusercontent.com/d/17CkK5qMYc3iF-GHnlcM1KTSKqSL5JTko=w800" },
  { id: 2, name: "Certificate", link: "https://drive.google.com/file/d/1VaxO8u9qO0r41tr_1AVFheSCCDNjBepV/view", image: "https://lh3.googleusercontent.com/d/1VaxO8u9qO0r41tr_1AVFheSCCDNjBepV=w800" },
  { id: 3, name: "Cyber Security", link: "https://drive.google.com/file/d/1Zt4vzfGp92-N1EjLLrIXD3xZUDbv46vm/view", image: "https://lh3.googleusercontent.com/d/1Zt4vzfGp92-N1EjLLrIXD3xZUDbv46vm=w800" },
  { id: 4, name: "Developing Soft Skills", link: "https://drive.google.com/file/d/1gTjxgkHxRwWt477gwlYEzB5Xh9Abw2tn/view", image: "https://lh3.googleusercontent.com/d/1gTjxgkHxRwWt477gwlYEzB5Xh9Abw2tn=w800" },
  { id: 5, name: "Emotional Intelligence", link: "https://drive.google.com/file/d/1tkD1ftjUP8yunCggVnEuJvNbyRFH_ir4/view", image: "https://lh3.googleusercontent.com/d/1tkD1ftjUP8yunCggVnEuJvNbyRFH_ir4=w800" },
  { id: 6, name: "Enhancing Soft Skills", link: "https://drive.google.com/file/d/11hsose5nuSBml4ihGIa3Y_j4Re2mPLT4/view", image: "https://lh3.googleusercontent.com/d/11hsose5nuSBml4ihGIa3Y_j4Re2mPLT4=w800" },
  { id: 7, name: "Excel Udemy Certificate", link: "https://drive.google.com/file/d/1TRO_u4321vk44FkkdC0hymvZcLayLgiF/view", image: "https://lh3.googleusercontent.com/d/1TRO_u4321vk44FkkdC0hymvZcLayLgiF=w800" },
  { id: 8, name: "Forage Software Engineering 1", link: "https://drive.google.com/file/d/1SuEBIcurYZt913rEIfgHW_iKabTqW-RW/view", image: "https://lh3.googleusercontent.com/d/1SuEBIcurYZt913rEIfgHW_iKabTqW-RW=w800" },
  { id: 9, name: "Forage Software Engineering", link: "https://drive.google.com/file/d/17Z_YYw5-60M_ruD9B7nprKGMMEH0sv6i/view", image: "https://lh3.googleusercontent.com/d/17Z_YYw5-60M_ruD9B7nprKGMMEH0sv6i=w800" },
  { id: 10, name: "Full Stack Python Dev", link: "https://drive.google.com/file/d/1HyR94llutAsDQFmzDi8QpjgG_Ef9WcLd/view", image: "https://lh3.googleusercontent.com/d/1HyR94llutAsDQFmzDi8QpjgG_Ef9WcLd=w800" },
  { id: 11, name: "HTML Beginners Udemy", link: "https://drive.google.com/file/d/1smSm1zPqDu81Yyppui82EHIQffteJlD-/view", image: "https://lh3.googleusercontent.com/d/1smSm1zPqDu81Yyppui82EHIQffteJlD-=w800" },
  { id: 12, name: "Intro to Internet of Things", link: "https://drive.google.com/file/d/1KOdrOj4YMxivkYm-D2aQGxWuhY2BXw3f/view", image: "https://lh3.googleusercontent.com/d/1KOdrOj4YMxivkYm-D2aQGxWuhY2BXw3f=w800" },
  { id: 31, name: "Introduction to Industry 4.0 and Industrial Internet of Things", link: "https://drive.google.com/file/d/1EXdhDHEZkSEbhsmnKTV4YxvyWDGLij0_/view", image: "https://lh3.googleusercontent.com/d/1EXdhDHEZkSEbhsmnKTV4YxvyWDGLij0_=w800" },
  { id: 13, name: "Java Coding Ninja", link: "https://drive.google.com/file/d/1ZQLrG6MonU1BvqcetHUOCpWiN4gMMzCe/view", image: "https://lh3.googleusercontent.com/d/1ZQLrG6MonU1BvqcetHUOCpWiN4gMMzCe=w800" },
  { id: 14, name: "Java Coding Ninja PDF", link: "https://drive.google.com/file/d/14kIkpMcF74QT4mqK9hEq0Js8bvkhH2aJ/view", image: "https://lh3.googleusercontent.com/d/14kIkpMcF74QT4mqK9hEq0Js8bvkhH2aJ=w800" },
  { id: 15, name: "Java Real-World Dev", link: "https://drive.google.com/file/d/1Ip1vzSLuH4NKc4VR7Py90wm7oU_QWVgn/view", image: "https://lh3.googleusercontent.com/d/1Ip1vzSLuH4NKc4VR7Py90wm7oU_QWVgn=w800" },
  { id: 32, name: "Manufacturing Process Technology I & II", link: "https://drive.google.com/file/d/1MXvzEZr-LOy4sE9hEx0LjicuxsuPTmB7/view", image: "https://lh3.googleusercontent.com/d/1MXvzEZr-LOy4sE9hEx0LjicuxsuPTmB7=w800" },
  { id: 16, name: "Oracle AI Foundations", link: "https://drive.google.com/file/d/11N14dXxIxtsJg7yD2pwvhI7JnAmWJVrR/view", image: "https://lh3.googleusercontent.com/d/11N14dXxIxtsJg7yD2pwvhI7JnAmWJVrR=w800" },
  { id: 17, name: "Oracle Cloud Foundations", link: "https://drive.google.com/file/d/1Y4FkKrWKjnG7SDKAsU4dvdLkKr20RLu6/view", image: "https://lh3.googleusercontent.com/d/1Y4FkKrWKjnG7SDKAsU4dvdLkKr20RLu6=w800" },
  { id: 18, name: "Oracle Cloud Infrastructure", link: "https://drive.google.com/file/d/1U18qrhfzlp62aNpTAzQ3K5-QZPV_8CqQ/view", image: "https://lh3.googleusercontent.com/d/1U18qrhfzlp62aNpTAzQ3K5-QZPV_8CqQ=w800" },
  { id: 19, name: "Oracle Generative AI", link: "https://drive.google.com/file/d/1nPayAFz1a94egCg1NC4bE1RNDB0APDnz/view", image: "https://lh3.googleusercontent.com/d/1nPayAFz1a94egCg1NC4bE1RNDB0APDnz=w800" },
  { id: 20, name: "Oracle Multicloud Architect", link: "https://drive.google.com/file/d/1t4_mP6n5m4NkjnL-jAdz8JQBpOi32csf/view", image: "https://lh3.googleusercontent.com/d/1t4_mP6n5m4NkjnL-jAdz8JQBpOi32csf=w800" },
  { id: 21, name: "Oracle AI Foundations Assoc.", link: "https://drive.google.com/file/d/1Iwk6bRgcNCI4DY7tj25b2vGyx6Uyt56Q/view", image: "https://lh3.googleusercontent.com/d/1Iwk6bRgcNCI4DY7tj25b2vGyx6Uyt56Q=w800" },
  { id: 22, name: "Oracle Foundations Assoc.", link: "https://drive.google.com/file/d/1qsLhZmmxhHumbK6lYQdoZn8rdtngam49/view", image: "https://lh3.googleusercontent.com/d/1qsLhZmmxhHumbK6lYQdoZn8rdtngam49=w800" },
  { id: 23, name: "Oracle Generative AI Prof.", link: "https://drive.google.com/file/d/1mrAeK_SzfXEnoxyEjazMob4sBZrOedWN/view", image: "https://lh3.googleusercontent.com/d/1mrAeK_SzfXEnoxyEjazMob4sBZrOedWN=w800" },
  { id: 24, name: "Oracle Multicloud Prof.", link: "https://drive.google.com/file/d/1Ceg-tDVv2xYxT0fq4ubSHfAAY6zlRteh/view", image: "https://lh3.googleusercontent.com/d/1Ceg-tDVv2xYxT0fq4ubSHfAAY6zlRteh=w800" },
  { id: 25, name: "Oracle Data Platform", link: "https://drive.google.com/file/d/1PKgwpN6GjV9EHkHQ134k6RVaEVxMci0d/view", image: "https://lh3.googleusercontent.com/d/1PKgwpN6GjV9EHkHQ134k6RVaEVxMci0d=w800" },
  { id: 26, name: "Patent Law for Engineers", link: "https://drive.google.com/file/d/1hOwtndLMOrNK77kNISVTpkl-mE_yGqI3/view", image: "https://lh3.googleusercontent.com/d/1hOwtndLMOrNK77kNISVTpkl-mE_yGqI3=w800" },
  { id: 27, name: "Python Beginner Udemy", link: "https://drive.google.com/file/d/19bOHwDWZryA6hG2MSmVgwT04H8ltfed5/view", image: "https://lh3.googleusercontent.com/d/19bOHwDWZryA6hG2MSmVgwT04H8ltfed5=w800" },
  { id: 28, name: "Reliance Foundation DIY", link: "https://drive.google.com/file/d/1wahx9jTDOSJAfxxisEHh6girXaKU39jG/view", image: "https://lh3.googleusercontent.com/d/1wahx9jTDOSJAfxxisEHh6girXaKU39jG=w800" },
  { id: 29, name: "Speaking Effectively", link: "https://drive.google.com/file/d/1CXloPEA0uw4SoCkY67BZGVsUhvz1F93e/view", image: "https://lh3.googleusercontent.com/d/1CXloPEA0uw4SoCkY67BZGVsUhvz1F93e=w800" },
  { id: 30, name: "Tata Certificate", link: "https://drive.google.com/file/d/1j5sfc2iAnCt49uKbwSBco9w51bC4HqQA/view", image: "https://lh3.googleusercontent.com/d/1j5sfc2iAnCt49uKbwSBco9w51bC4HqQA=w800" },
];

const STORAGE_KEY = "portfolio_certificates_v1";
const EVENT_KEY = "portfolio_certificates_changed";

export function formatGoogleDriveImageUrl(url: string): string {
  if (!url) return "";
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=w800`;
  }
  return url;
}

export function getCertificates(): Certificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to load certificates from storage", err);
  }
  return INITIAL_CERTIFICATES;
}

export function saveCertificates(certs: Certificate[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    window.dispatchEvent(new Event(EVENT_KEY));
  } catch (err) {
    console.error("Failed to save certificates to storage", err);
  }
}

export function addCertificate(name: string, link: string, image: string): Certificate {
  const current = getCertificates();
  const formattedImage = formatGoogleDriveImageUrl(image);
  const formattedLink = link.trim() || "#";
  const newCert: Certificate = {
    id: Date.now(),
    name: name.trim(),
    link: formattedLink,
    image: formattedImage,
    isCustom: true,
  };
  const updated = [newCert, ...current];
  saveCertificates(updated);
  return newCert;
}

export function deleteCertificate(id: number): void {
  const current = getCertificates();
  const updated = current.filter((c) => c.id !== id);
  saveCertificates(updated);
}

export function resetCertificates(): void {
  saveCertificates(INITIAL_CERTIFICATES);
}

export function subscribeCertificates(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener(EVENT_KEY, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_KEY, handler);
    window.removeEventListener("storage", handler);
  };
}
