// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { user, password } = req.body;

  const response = await fetch(`${process.env.apiUrl}/api/public/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      password,
    }),
  });

  try {
    const data = await response.json();
    const { user, name } = data;
    if (data.user) {
      setCookie({ res }, "user", name, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      res.status(200);
      res.json(data);
    } else {
      res.status(401);
      res.json(data);
    }
  } catch (error) {
    res.json(error);
  }
}
