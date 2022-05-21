import { buildFeedBackPath, extractFileData } from "../api/feedback";
import { useState } from "react";
import { Fragment } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedBackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }
  return (
    <Fragment>
        {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedBackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedBackHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedBackPath();
  const data = extractFileData(filePath);
  return {
    props: {
      feedBackItems: data,
    },
  };
}
export default FeedbackPage;
