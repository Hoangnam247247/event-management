export default function SeatMap({ bookedSeats, selectedSeat, onSelect }) {
  const rows = ["A", "B", "C", "D"];
  const seatsPerRow = 5;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 52px)",
        gap: 12,
        justifyContent: "center"
      }}
    >
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
                width: 52,
                height: 52,
                lineHeight: "52px",
                textAlign: "center",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                cursor: booked ? "not-allowed" : "pointer",
                userSelect: "none",

                /* ===== COLOR STATE ===== */
                background: booked
                  ? "#9ca3af"          // đã đặt
                  : selected
                  ? "#1e40af"          // đang chọn
                  : "#eef2ff",         // trống

                color: booked ? "#fff" : selected ? "#fff" : "#1e40af",

                border: selected
                  ? "2px solid #1e3a8a"
                  : "1px solid #c7d2fe",

                transition: "0.15s"
              }}
              onMouseEnter={e => {
                if (!booked && !selected) {
                  e.currentTarget.style.background = "#e0e7ff";
                }
              }}
              onMouseLeave={e => {
                if (!booked && !selected) {
                  e.currentTarget.style.background = "#eef2ff";
                }
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
