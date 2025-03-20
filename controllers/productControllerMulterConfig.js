

// //Business Logic

// //Importing packages
// import express from "express";

// import multer from "multer";

// //Interacts with local file path system (using node.js)
// import path from "path";
// import { fileURLToPath } from "url";  // Import fileURLToPath to handle ES modules

// //Importing models
// import { Product } from "../models/products.model.js";


// //multer configuration to stor files on dist(local disk)

// // Get the current directory
// const __dirname = path.dirname(fileURLToPath(import.meta.url));


// //Multer configuration to store file in local file path public/temp;
// const storage = multer.diskStorage(
//     {
//         destination: (req, file, cb) => {
//             //set desination to /public/temp folder
//             cb(null,  'public/temp');
//         },
//         filename: (req, file, cb) => {
//             // Create a unique filename by appending a timestamp to the original name
//              const uniqueFileName =  `${Date.now()}-${file.originalname}`;
            
//              cb(null, uniqueFileName);
//         }
//     }
// );



// //Creating mulster instance for disk Storage for single image only

// // const upload = multer({storage}).single("image");

// //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// // Using upload.fields() to handle multiple image fields.
// const upload = multer({ storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     //fileFilter: fileFilter

//  }).fields([
//     { name: "productImage", maxCount: 1 },
//     { name: "productSubImage", maxCount: 1 },
//     { name: "productCategoryImage", maxCount: 1 }
//   ]);

// //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// //____________________________________________________________________________________________________


// //From Below we have POST, GET, PUT, PATCH, DELTE APIs.

// //API for Adding or creating product data from req.body to DB.

// export const createProduct = async (req, res) => {
//     console.log('i entered in create product function from')
//     upload(req, res, async(err) => {
//         if (err) return res.status(500).json({message: "File upload error"});

//         //destructuring the data from req.body to post it into db.
//         const {productId, productName, productImage, productSubName, productSubImage, productCategory, productCategoryImage, price, tax, 
//             shippingCharges, deliveryCharges, salePrice, productNameDescription, productSubNameDescription,
//             productCategoryDescription, inStock, stockCount, productCreationDate, author, publisher, ISBN, 
//             publicationDate, edition, format, ratings, discountPercentage, status, metaTitle, 
//             metaDescription, slug
//         } = req.body;

//         //Checks if all fields are filled or not

//         /*
//         Un-comment if you want to check if all fields are...
//         required or not
//         if (
//             !productId ||
//             !productName ||
//             !productImage ||
//             !productSubName ||
//             !productSubImage ||
//             !productCategory ||
//             !productCategoryImage ||
//             price === undefined ||
//             tax === undefined ||
//             shippingCharges === undefined ||
//             deliveryCharges === undefined ||
//             salePrice === undefined ||
//             !productNameDescription ||
//             !productSubNameDescription ||
//             !productCategoryDescription ||
//             inStock === undefined ||
//             stockCount === undefined ||
//             !productCreationDate ||
//             !author ||
//             !publisher ||
//             !ISBN ||
//             !publicationDate ||
//             !edition ||
//             !format ||
//             !ratings ||
//             !discountPercentage ||
//             !status ||
//             !metaTitle ||
//             !metaDescription ||
//             !slug
//           ) {
//             return res.status(400).json({ error: "Missing required fields", message: "All fields are required" });
//           }
//         */

//           //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//         try {

//             console.log("I am from frontend")
//             console.log(req.files)

//            // Get file paths from req.files
//            const productImage = req.files && req.files.productImage ? req.files.productImage[0].filename : "";
//            const productSubImage = req.files && req.files.productSubImage ? req.files.productSubImage[0].filename : "";
//            const productCategoryImage = req.files && req.files.productCategoryImage ? req.files.productCategoryImage[0].filename : "";
           
//             const product = await Product.create({

//                 productId, productName, productImage, productSubName, productSubImage, productCategory, productCategoryImage, price, tax, 
//             shippingCharges, deliveryCharges, salePrice, productNameDescription, productSubNameDescription,
//             productCategoryDescription, inStock, stockCount, productCreationDate, author, publisher, ISBN, 
//             publicationDate, edition, format, ratings, discountPercentage, status, metaTitle, 
//             metaDescription, slug

//             });

//             res.status(201).json({status:"success", data: product});

            
//         } catch (error) {

//             res.status(500).json({status: "Server error occured", message: error.message})
            
//         }
//     });
// };

// // API for GET All the data.

// export const getProduct =  async (req, res) => {
//     try {

//         const products = await Product.find({})
//         res.status(200).json({status: "success", data: products})
        
//     } catch (error) {
//         res.status(500).json({status: "Servoer Error! Failed to fetch data", message: error.message})
//     }
// }

// //Api for updating data based on Product ID.

// export const getProductById = async (req, res) => {

//     //We recieve Product _id from req.params.
//     const {_id} = req.params;

//     try {
//         const products = await Product.findById(_id);
//         if(!_id) return res.status(500).json({message:"Product cold not be found"});
//         res.status(200).json({status: "success", data: products});
//     } catch (error) {
//         res.status(500).json({status:"Failed", message: error.message});
        
//     }
// }

// //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// //API for updating whole document.
// //Api to show all the Product Data on frontend.

// export const putProduct = async (req, res) => {

//     upload(req, res, async(err) => {
//         if (err) return res.status(500).json({message: "File upload error"});

//         //destructuring the data from req.body to post it into db.
//         const {productId, productName, productImage, productSubName, productSubImage, productCategory, productCategoryImage, price, tax, 
//             shippingCharges, deliveryCharges, salePrice, productNameDescription, productSubNameDescription,
//             productCategoryDescription, inStock, stockCount, productCreationDate, author, publisher, ISBN, 
//             publicationDate, edition, format, ratings, discountPercentage, status, metaTitle, 
//             metaDescription, slug
//         } = req.body;

//         const {_id} = req.params;

//         try {
//             const product = await Product.findById(_id);
//             if (!_id) return res.status(404).json({message:"Product data not found"});
            
//             // Get file paths from req.files
//            const productImage = req.files && req.files.productImage ? req.files.productImage[0].filename : "";
//            const productSubImage = req.files && req.files.productSubImage ? req.files.productSubImage[0].filename : "";
//            const productCategoryImage = req.files && req.files.productCategoryImage ? req.files.productCategoryImage[0].filename : "";

//            if (req.file) {
//             console.log("Image file updated")
//            }

//            product.productId                = productId                || product.productId;
//            product.productName              = productName              || product.productName;
//            product.productImage             = productImage             || product.productImage;
//            product.productSubName           = productSubName           || product.productSubName;
//            product.productSubImage          = productSubImage          || product.productSubImage;
//            product.productCategory          = productCategory          || product.productCategory;
//            product.productCategoryImage     = productCategoryImage     || product.productCategoryImage;
//            product.price                    = price                    || product.price;
//            product.tax                      = tax                      || product.tax;
//            product.shippingCharges          = shippingCharges          || product.shippingCharges;
//            product.deliveryCharges          = deliveryCharges          || product.deliveryCharges;
//            product.salePrice                = salePrice                || product.salePrice;
//            product.productNameDescription   = productNameDescription   || product.productNameDescription;
//            product.productSubNameDescription= productSubNameDescription|| product.productSubNameDescription;
//            product.productCategoryDescription = productCategoryDescription || product.productCategoryDescription;
//            product.inStock                  = inStock                  || product.inStock;
//            product.stockCount               = stockCount               || product.stockCount;
//            product.productCreationDate      = productCreationDate      || product.productCreationDate;
//            product.author                   = author                   || product.author;
//            product.publisher                = publisher                || product.publisher;
//            product.ISBN                     = ISBN                     || product.ISBN;
//            product.publicationDate          = publicationDate          || product.publicationDate;
//            product.edition                  = edition                  || product.edition;
//            product.format                   = format                   || product.format;
//            product.ratings                  = ratings                  || product.ratings;
//            product.discountPercentage       = discountPercentage       || product.discountPercentage;
//            product.status                   = status                   || product.status;
//            product.metaTitle                = metaTitle                || product.metaTitle;
//            product.metaDescription          = metaDescription          || product.metaDescription;
//            product.slug                     = slug                     || product.slug;

//            const updatedProduct = await product.save();
//            res.status(200).json({status: "success", message: "Data updated successfully", data: product})
           

//         } catch (error) {
//             res.status(500).json({status:"failed", message: error.message});
            
//         }

// });
// }

// //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// //Api for delteing prodcut.

// export const deleteProduct = async (req, res) => {
//     const {_id} = req.params;

//     try {
//         const product = await Product.findById(_id);

//         if(!product) return res.status(500).json({status:"Failed", message: "Product data not found"});

//         await Product.deleteOne({_id:_id});
//         res.status(200).json({staus:"success", message:"Product data deleted successfully"});
        
//     } catch (error) {

//         res.status(500).json({message:error.message});
        
//     };
// };

// //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



