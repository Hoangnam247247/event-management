export default function SeatMap({ bookedSeats, selectedSeat, onSelect }) {
  const rows = ["A", "B", "C", "D"];
  const seatsPerRow = 5;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 50px)", gap: 10 }}>
      {rows.map(r =>
        Array.from({ length: seatsPerRow }, (_, i) => {
          const code = r + (i + 1);
          const booked = bookedSeats.includes(code);
          const selected = selectedSeat === code;

          return (
            <div
              key={code}
              onClick={() => !booked && onSelect(code)}
              style={{
                width: 50,
                height: 50,
                lineHeight: "50px",
                textAlign: "center",
                borderRadius: 6,
                cursor: booked ? "not-allowed" : "pointer",
                background: booked ? "#9ca3af" : selected ? "#f59e0b" : "#4caf50",
                color: "white",
                userSelect: "none"
              }}
            >
              {code}
            </div>
          );
        })
      )}
    </div>
  );
}
