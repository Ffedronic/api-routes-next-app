import { Fragment } from "react";
import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackTextareaRef = useRef();
  const [loadedFeedBackItems, setLoadedFeedBackItems] = useState([]);

  function loadFeedBackHandler(event) {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setLoadedFeedBackItems(data.feedback));
  }
  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedBack = feedbackTextareaRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedBack };
    console.log(reqBody);
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
  return (
    <Fragment>
      <h1>Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackTextareaRef}></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedBackHandler}>Load feedback</button>
      <ul>
        {loadedFeedBackItems.map((item) => <li key={item.id}>{item.email}: {item.text}</li>)}
      </ul>
    </Fragment>
  );
}

export default HomePage;
