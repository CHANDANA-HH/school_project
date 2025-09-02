import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/schools");
        const data = await res.json();
        setSchools(data.schools || []); 
      } catch (err) {
        console.error("Error fetching schools:", err);
        setSchools([]);
      }
    }
    fetchData();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #2563eb, #1e3a8a)", 
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#fff",
          marginBottom: "30px",
        }}
      >
        All Schools
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {schools.length === 0 ? (
          <p
            style={{
              color: "#bfdbfe",
              textAlign: "center",
              gridColumn: "1/-1",
              fontSize: "1.1rem",
            }}
          >
            No schools added yet.
          </p>
        ) : (
          schools.map((school) => (
            <div
              key={school.id}
              style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={school.image}
                alt={school.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              />
              <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                {school.name}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#dbeafe",
                  marginBottom: "5px",
                }}
              >
                {school.address}, {school.city}, {school.state}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#dbeafe" }}>
                Contact: {school.contact}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#dbeafe" }}>
                Email: {school.email_id}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
