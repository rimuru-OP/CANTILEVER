const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default API;

// Post images now come back as full Cloudinary URLs (e.g. https://res.cloudinary.com/...),
// but older posts created before Cloudinary support may still have a local
// "/uploads/..." path. This helper handles both so display code doesn't have to care.
export function getImageUrl(image) {
    if (!image) return "";
    return /^https?:\/\//i.test(image) ? image : `${API}${image}`;
}