import { ResponseRepository as Response } from "../repositories";
import { response } from "../utils";

export const getByVoteId = async (req, res) => {
    const{id}=req.params
  const responses = await Response.getByVoteId(id);
  response(res, 200, responses);
};

export const create = async (req, res) => {
  const { responseData } = req.body;
  const newResponse = await Response.create(responseData);
  response(res, 201, newResponse);
};

