import { type NextApiRequest, type NextApiResponse } from "next";

const cards = async (req: NextApiRequest, res: NextApiResponse) => {
  const cards = await prisma?.card.findMany();

  res.status(200).json(cards);
};

export default cards;
