import PageMain from "../components/PageMain";
import { Link } from "react-router-dom";
import BlurColorHighlight from "../components/BlurColorHighlight";
import "./InnerSupportPage.css";

export default function InnerSupportPage() {
  return (
    <>
      <div className="inner-support">
        <PageMain />
        <BlurColorHighlight
          position={{ top: "5%", left: "0%" }}
          size="150px"
          filter="blur(40px)"
          zIndex="-1"
        />
        <img src="../../public/insights-star.svg" className="insights-star" />
        <div className="div-wrapper">
          <h1>How to reframe your inner voices</h1>
          <p>
            Life is full of challenges. Yet, the way you think influences how
            good or bad you perceive them. With this app, you hold the key to
            reframe your thoughts to experience more calmness and optimism – By
            practicing gratitude.
          </p>
          <p>
            In your{" "}
            <Link to="/today" className="text-link">
              My gratitude
            </Link>{" "}
            section, we encourage you to actively think of anything that brings
            joy, love or a sense of light into your daily life, and write it
            down. Think about the people, events and things that make you feel
            fortunate. It’s ok to repeat yourself – Every time you choose to
            feel grateful, you continue to reframe your mindset.
          </p>
          <p>
            We recommend you practice gratitude right after you wake up, to set
            a positive foundation for your day. If your phone is not the first
            thing you reach for in the morning, feel free to do it later. At the
            end of the day, use your{" "}
            <Link to="/today" className="text-link">
              My moments
            </Link>{" "}
            section as your personal diary and space for reflection.
          </p>
        </div>
      </div>
    </>
  );
}
