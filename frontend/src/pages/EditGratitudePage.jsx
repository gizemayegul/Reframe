import "./EditGratitudePage.css";
import { useEffect, useState } from "react";
import PageSub from "../components/PageSub";
import TextArea from "../components/TextAreaTimelineEdit";
import axios from "axios";
import { useParams } from "react-router-dom";
const BACKEND = import.meta.env.VITE_SERVER_URL;


import { Button } from "react-bootstrap";
import ButtonSave from "../components/ButtonSave";
import BlurColorHighlight from "../components/BlurColorHighlight";

export default function EditGratitudePage() {
  const { entryID } = useParams();

  const [gratitudeText, setGratitudeText] = useState({});
  const [dateGratitudeText, setDateGratitudeText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${BACKEND}/api/gratitude/entries/${entryID}`, {
        headers: { authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.createdAt);
        setDateGratitudeText(response.data.createdAt);
        setGratitudeText(response.data.gratitudeText);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [entryID]);

  if (error) {
    // return <ErrorPage/>
    return <> Error...</>;
  }

  if (loading) {
    // return <LoadingSpinner/>
    return <> Loading...</>;
  }

  async function handleSubmit(e) {
    // e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updateGratitude = await axios.patch(
        `${BACKEND}/api/gratitude/entries/${entryID}`,
        { gratitudeText: gratitudeText },
        {
          headers: { authorization: `${token}` },
        }
      );
      console.log(updateGratitude.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Helper functions
  const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString("de-DE");
    return formattedDate;
  };

  return (
    <>
      <PageSub />
      <div>
        <BlurColorHighlight
          position={{ top: "2%", left: "1%" }}
          size="200px"
          filter="blur(50px)"
          zIndex="-1"
        />
      </div>
      
      <div className="editPage-wrapper">
        <div
          style={{
            position: "fixed",
            top: "7em",
            left: "50%",
              transform: "translateX(-50%)",
            // left: "3.3em",
            // transform: "translate(-50%,-50%)",
          }}
        >
          {/* <p>{formatDate()}</p> */}
          {/* <h5>I feel lucky, loved or joyful because...</h5> */}
          <TextArea
            name="editGratitude"
            label={"I feel lucky, loved or joyful because..."}
            date={formatDate(dateGratitudeText)}
            defaultValue={gratitudeText}
            placeholder={"some placeholder text"}
            onChange={(e) => {
              setGratitudeText(e.target.value);
            }}
            // onSubmit={handleSubmit}
          >
            <div>
              <ButtonSave
                onClick={handleSubmit}
                className="btn-editPage-save"
                style={{ display: "none" }}
              />
            </div>
          </TextArea>
        </div>
      </div>
    </>
  );
}
