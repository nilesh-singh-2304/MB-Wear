import type { NextApiRequest, NextApiResponse } from "next";
import pincodes from "../../pincodes.json"

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  res.status(200).json(pincodes);
}
