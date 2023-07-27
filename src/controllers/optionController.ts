import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/envs";
import { OptionRepository as Option } from "../repositories";
import { response } from "../utils";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const create = async (req, res) => {
  const { title } = req.body;
  const images = req.files;

  const uploadedImages = [];

  // Subir cada imagen a Cloudinary y obtener sus URLs públicas
  for (const image of images) {
    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "upload-folder" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(image.buffer);
    });
    uploadedImages.push(result.secure_url);
  }

  const optionData = {
    title,
    images: uploadedImages,
  };

  const newOption = await Option.create(optionData);
  response(res, 201, { newOption });
};
