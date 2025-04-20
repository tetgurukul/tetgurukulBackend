import cloudinary from 'cloudinary';

// Cloudinary configuration
export async function uploadToCloudinary(file) {
    cloudinary.config({
        cloud_name: 'dhxdfwwbk',
        api_key: '597833577524298',
        api_secret: 'XegWOH5p7xyeuD4XUBq0_XFVJgc'
    });

    try {
        // Upload the file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            public_id: `category_image/${file.filename}`, // Unique ID for the file
            resource_type: 'auto',  // Auto-detects the file type (image, video, etc.)
        });

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(uploadResult.secure_url); // log the uploaded URL

        // Return the secure URL
        return uploadResult.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Error uploading to Cloudinary");
    }
}
