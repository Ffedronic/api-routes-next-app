import { buildFeedBackPath, extractFileData } from "../api/feedback";
function handler(req, res) {
  const feedBackId = req.query.feedbackId;
  const filePath = buildFeedBackPath();
  const data = extractFileData(filePath);
  const selectedFeedBack = data.find((item) => item.id === feedBackId);
  res.status(200).json({ feedback: selectedFeedBack });
}

export default handler;
