import type { NextApiRequest, NextApiResponse } from "next";

import { sendMail } from "../../services/mailServices";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { method, body } = req;
    switch (method) {
      case "POST":
        const { email, subject, data } = JSON.parse(body);

        const content = {
          to: process.env.PERSONAL_EMAIL || "",
          data: `${subject} - ${email} - ${data}`,
        };

        const { rejected } = await sendMail(content);

        if (rejected.length > 0) {
          res.status(500).json({ status: "email_error" });

          return;
        }
        res.status(200).json({ status: "Success" });

        return;
      default:
        res.setHeader("Allow", ["POST"]);

        res.status(405).json({ status: `Method ${method} Not Allowed` });
        return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error sending email" });
  }
};

export default handler;
