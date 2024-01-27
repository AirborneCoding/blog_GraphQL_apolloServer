const fs = require('fs');
const path = require('path');
const { CustomError } = require('<your-custom-error-module>'); // Replace with your actual module
const { StatusCodes } = require('http-status-codes');
const { uploadImageCloudinary, cloudinaryRemoveImage } = require('<your-image-upload-module>'); // Replace with your actual module

const uploadProfilePhoto = async (parent, { file }, { user }) => {
  try {
    // Check if file is provided
    if (!file) {
      throw new CustomError.BadRequestError('No File Uploaded');
    }

    // Check if it's an image file
    if (!file.mimetype.startsWith('image')) {
      throw new CustomError.BadRequestError('Please upload an image file');
    }

    // Access file properties
    const { createReadStream, filename } = await file;

    // Create a unique filename or use the existing one
    const uniqueFilename = `${Date.now()}-${filename}`;

    // Define the path to save the file
    const filePath = path.join(__dirname, `/public/images/${uniqueFilename}`);

    // Create a write stream to save the file
    const writeStream = fs.createWriteStream(filePath);

    // Pipe the file stream to the write stream
    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(writeStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    // Upload the image to Cloudinary (or your preferred image hosting service)
    const result = await uploadImageCloudinary(filePath);

    // Retrieve the Cloudinary URL and public ID
    const url = result.secure_url;
    const publicId = result.public_id;

    // Update the user's profile with the new avatar information
    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      {
        $set: {
          'profile.avatar.url': url,
          'profile.avatar.publicId': publicId,
        },
      },
      { new: true }
    );

    // If the user had a previous avatar, remove it from Cloudinary
    if (user.profile.avatar.publicId) {
      await cloudinaryRemoveImage(user.profile.avatar.publicId);
    }

    // Return a success message or the updated user object
    return 'success';
  } catch (error) {
    // Handle errors and return appropriate responses
    // You may want to log errors or customize the response further
    console.error(error);
    throw new CustomError.InternalServerError('Something went wrong');
  }
};
