import "./CardToday.css";
import Card from "react-bootstrap/Card";
export default function CardToday({ label, todayData, children }) {
  return (
    <section className="card-wrapper">
      <div>
        <Card className="card custom-card">
          <Card.Body>
            <Card.Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginRight: "1.25rem",
                }}
              >
                <h3>{label}</h3>
                <div>{children}</div>
              </div>
            </Card.Title>
            <Card.Text>
              <p className="cardToday-text p1">{todayData}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
