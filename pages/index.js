import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "15px" }}>
          School Directory
        </h1>
        <p style={{ marginBottom: "30px", fontSize: "1rem", color: "#e0e7ff" }}>
          Manage your schools easily. Add new schools and browse existing ones.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link href="/addSchool">
            <button
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
              onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
            >
              Add School
            </button>
          </Link>
          <Link href="/showSchools">
            <button
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                background: "#10b981",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.background = "#059669")}
              onMouseOut={(e) => (e.target.style.background = "#10b981")}
            >
              Show Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
