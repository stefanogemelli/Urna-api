import { VotingRepository as Voting } from "../repositories";
import { response } from "../utils";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/envs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const getAll = async (req, res) => {
  const { verified = "true" } = req.query;
  const method = {
    true: "verifiedList",
    false: "listToVerify",
  };
  const votingList = await Voting[method[verified]]();
  response(res, 200, votingList);
};

export const create = async (req, res) => {
  const images = req.files;
  const { user_id, title, description, opening_date, closing_date, ...optionTitles } = req.body;

  const newVotingData = {
    user_id,
    title,
    description,
    opening_date,
    closing_date,
    options: [],
  };
  for (const title in optionTitles) {
    const newOption = { title: optionTitles[title], images: [] };
    newVotingData.options.push(newOption);
  }

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
    const index = Number(image.fieldname.slice(6).slice(0, -5)) - 1;
    newVotingData.options[index].images.push(result.secure_url);
  }

  const newVoting = await Voting.create(newVotingData);

  response(res, 201, newVoting);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const votation = await Voting.getById(id);
  response(res, 200, votation);
};
export const getTitles = async (req, res) => {
  const titles = await Voting.getTitles();
  response(res, 200, titles);
};
