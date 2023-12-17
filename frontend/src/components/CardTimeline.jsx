

import "./CardTimeline.css";
import Card from "react-bootstrap/Card";
import ButtonIcon from "./ButtonIcon";


export default function CardTimeline({ date, todayGratitude, todayGratitudeId, todayDiary, todayDiaryId, onDeleteGratitude, onDeleteDiary }) {
  return (
    <section className="timelineCard-wrapper">
      <div className="date">
        <h4 className="date h8" style={{marginBottom: "10px"}}>{date}</h4>
      </div>

      {todayGratitude && (
        <Card className="custom-card-timeline">
          <Card.Body className="timelineBody">
            <Card.Title> <h4>My gratitude</h4></Card.Title>

            <div className="custom-card-btns">
              <ButtonIcon imgSrc="../../public/delete-light.svg" onClick={onDeleteGratitude} />
              <ButtonIcon imgSrc="../../public/edit.svg" navigate={`edit-gratitude/${todayGratitudeId}`} />
            </div>
            <Card.Text>
              <p className="p2">{todayGratitude}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {todayDiary && (

        <Card className="custom-card-timeline">
          <Card.Body className="timelineBody">
            <Card.Title> <h4>My Moments</h4></Card.Title>
            <div className="custom-card-btns">
              <div className="custom-card-timeline-btn1">
              <ButtonIcon
                imgSrc="../../public/delete-light.svg"
                onClick={onDeleteDiary}

              />
              </div>
              <div className="custom-card-timeline-btn2">
              <ButtonIcon
              imgSrc="../../public/edit.svg"
               navigate={`edit-diary/${todayDiaryId}`} />

              </div>
            </div>
            <Card.Text>
              <p className="p2">{todayDiary}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </section>
  );
}
