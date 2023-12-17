import './TimelinePage.css';
import PageMain from '../components/PageMain';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardTimeline from '../components/CardTimeline';
import { Link } from 'react-router-dom';
import BlurColorHighlight from '../components/BlurColorHighlight';

const BACKEND = import.meta.env.VITE_SERVER_URL;


export default function TimelinePage() {

  const [timelineList, setTimelineList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${BACKEND}/api/timeline`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        console.log(response.data);
        const sortedTimeline = response.data.sort((a, b) => {
          console.log(new Date(b.date));
          return new Date(b.date) - new Date(a.date);
        });
        console.log(sortedTimeline);
        setTimelineList(sortedTimeline);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    // return <ErrorPage/>
    return <> Error...</>;
  }

  if (loading) {
    // return <LoadingSpinner/>
    return <> Loading...</>;
  }

  function formatDate(inputDate) {
    const dateObject = new Date(inputDate);
    const formattedDate = dateObject.toLocaleDateString('de-DE');

    return formattedDate;
  }

  const handleDelete = async (entryType, id) => {
    const token = localStorage.getItem('token');

    try {
      if (entryType === 'gratitude') {
        setTimelineList((prevTimeline) =>
          prevTimeline.map((entry) => ({
            ...entry,
            gratitude: entry.gratitude.filter((gratitudeEntry) => gratitudeEntry.id !== id),
          }))
        );
        await axios.delete(`${BACKEND}/api/gratitude/entries/${id}`, {
          headers: { Authorization: `${token}` },
        });

      } else if (entryType === "diary") {

        setTimelineList((prevTimeline) => {
          return prevTimeline.map((entry) => {
            return {
              ...entry,
              diary: entry.diary.filter((diaryEntry) => diaryEntry.id !== id),
            };
          });
        });

        await axios.delete(`${BACKEND}/api/diary/entries/${id}`, {
          headers: { Authorization: `${token}` },
        });
      }

      console.log('Content deleted successfully');
    } catch (error) {
      console.error('Error deleting content', error.message);
    }
  };

  return (
    <>
      <PageMain />
      <div>
        <BlurColorHighlight
          position={{ top: "2%", left: "1%" }}
          size="200px"
          filter="blur(50px)"
          zIndex="-1"
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: "6em",
          left: "calc(3.5em - 20px)",
          // transform: "translate(-50%,-50%)",

        }}
      >
        <h3>My memories</h3>

      </div>
      <div
        style={{
          position: "fixed",
          top: "9em",
          left: "calc(3.5em - 20px)",
          width: "80vw",
          textAlign: "left",
        }}
      >
        {timelineList.length === 0 && (
          <div className="timeline-noData">
            <h4>No entries yet</h4>
            <h4>
              Start feeling gratitude and collect precious moments of <Link to="/today">Today</Link>
            </h4>
          </div>
        )}
        <div className="timeline-withData-wrapper">
          {timelineList.length > 0 &&
            timelineList.map((eachEntry, index) => (
              <div key={index} className="timeline-withData">
                {(eachEntry.gratitude.length > 0 || eachEntry.diary.length > 0) && (
                  <CardTimeline
                    date={formatDate(eachEntry.date)}
                    todayGratitude={eachEntry.gratitude.length > 0 ? eachEntry.gratitude[0].text : ''}
                    todayGratitudeId={eachEntry.gratitude.length > 0 ? eachEntry.gratitude[0].id : ''}
                    onDeleteGratitude={() => {
                      handleDelete('gratitude', eachEntry.gratitude[0].id);
                    }}
                    todayDiary={eachEntry.diary.length > 0 ? eachEntry.diary[0].text : ''}
                    todayDiaryId={eachEntry.diary.length > 0 ? eachEntry.diary[0].id : ''}
                    onDeleteDiary={() => {
                      handleDelete('diary', eachEntry.diary[0].id);
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
