import React, { useState } from "react";
import { backend_url_media } from "../config/conf";

const UploadMediaPage = () => {
    const [pageTitle, setPageTitle] = useState("");
    const [collectionTitle, setCollectionTitle] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    // Handle image selection + previews
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form data created");
        
        const formData = new FormData();
        formData.append("pageTitle", pageTitle);
        formData.append("title", collectionTitle);
        for (let i = 0; i < images.length; i++) {
            formData.append("files", images[i]);
            console.log("images parsed");
        }
        // ${backend_url_media}/api/upload/v1/image-multiple
        try {
            console.log("api is about to hit");
            const res = await fetch(`http://localhost:4000/api/upload/v1/image-multiple`, {
                method: "POST",
                body: formData,
            });
            console.log("api hitted");
            if (!res.ok) {
                const text = await res.text(); // read plain text or HTML error
                throw new Error(`Server error: ${res.status}\n${text}`);
            }
            const result = await res.json();
            console.log("result fetched to json");
            console.log("Upload success:", result);
            alert("Upload successful!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "500px",
                margin: "50px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Upload Media Page
            </h2>

            <input
                type="text"
                placeholder="Page Title"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
            />

            <input
                type="text"
                placeholder="Collection Title"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
            />

            <label
                style={{
                    border: "2px dashed #aaa",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#f9f9f9",
                }}
            >
                Click to select images
                <input
                    type="file"
                    name="files"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                        const files = Array.from(e.target.files);  // ✅ use e.target.files
                        setImages(files);

                        // Optional: set previews
                        const previews = files.map((file) => URL.createObjectURL(file));
                        setImagePreviews(previews);
                    }}
                    style={{ display: "none" }}
                />
            </label>

            {imagePreviews.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginTop: "10px",
                    }}
                >
                    {imagePreviews.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`preview-${index}`}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                            }}
                        />
                    ))}
                </div>
            )}

            <button
                type="submit"
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Upload
            </button>
        </form>
    );
};

export default UploadMediaPage;
