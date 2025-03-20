import cloudinary from 'cloudinary';


export async function uploadToCloudinary(file) {
    // Configuration
    cloudinary.config({ 
        cloud_name: 'dhxdfwwbk', 
        api_key: '597833577524298', 
        api_secret: 'XegWOH5p7xyeuD4XUBq0_XFVJgc' // Click 'View API Keys' above to copy your API secret
    });
    
    try {
        // Upload an image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            public_id: `product_image/${file.filename}`,
            resource_type: 'auto',  // This auto-detects whether the file is an image, video, etc.
        });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);

        // Return the secure URL of the uploaded image
        return uploadResult.secure_url;  // This is the URL you need to store in the product
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Error uploading to Cloudinary");
    }
}
