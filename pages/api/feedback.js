// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

function buildFeedBackPath() {
  return path.join(process.cwd(), "data", "feedBack.json");
}

function extractFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
function handler(req, res) {
  if (req.method === "POST") {
    const { email, text } = req.body;
    const newFeedBack = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };
    const filePath = buildFeedBackPath();
    const data = extractFileData(filePath);
    data.push(newFeedBack);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedBack: newFeedBack });
  } else {
    const filePath = buildFeedBackPath();
    const data = extractFileData(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
