import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "School name is required"),
  email_id: z.string().email("Invalid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z.string().min(7, "Contact is required"),
  image: z
    .any()
    .refine((v) => v?.length === 1, "Please upload one image"),
});

export default function AddSchool() {
  const [status, setStatus] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: zodResolver(schema) });

  const imageWatch = watch("image");
  const file = imageWatch?.[0];
  if (file && !preview) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  const onSubmit = async (data) => {
    setStatus(null);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    formData.append("image", data.image[0]);

    const res = await fetch("/api/schools/create", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    if (!res.ok) {
      setStatus({ ok: false, msg: json.error || "Failed to save" });
    } else {
      setStatus({ ok: true, msg: "School saved successfully!" });
      setPreview(null);
      reset();
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "600px",
          color: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Add School</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label>School Name</label>
            <input
              type="text"
              {...register("name")}
              style={inputStyle}
              placeholder="Enter school name"
            />
            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              {...register("email_id")}
              style={inputStyle}
              placeholder="Enter email"
            />
            {errors.email_id && (
              <p style={errorStyle}>{errors.email_id.message}</p>
            )}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Address</label>
            <input
              type="text"
              {...register("address")}
              style={inputStyle}
              placeholder="Enter address"
            />
            {errors.address && (
              <p style={errorStyle}>{errors.address.message}</p>
            )}
          </div>

          <div>
            <label>City</label>
            <input
              type="text"
              {...register("city")}
              style={inputStyle}
              placeholder="Enter city"
            />
            {errors.city && <p style={errorStyle}>{errors.city.message}</p>}
          </div>

          <div>
            <label>State</label>
            <input
              type="text"
              {...register("state")}
              style={inputStyle}
              placeholder="Enter state"
            />
            {errors.state && <p style={errorStyle}>{errors.state.message}</p>}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Contact</label>
            <input
              type="text"
              {...register("contact")}
              style={inputStyle}
              placeholder="Enter contact number"
            />
            {errors.contact && (
              <p style={errorStyle}>{errors.contact.message}</p>
            )}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Upload Image</label>
            <input type="file" accept="image/*" {...register("image")} />
            {errors.image && <p style={errorStyle}>{errors.image.message}</p>}
          </div>
        </div>

        {preview && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "200px",
                borderRadius: "8px",
                border: "2px solid #3b82f6",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "14px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
        >
          {isSubmitting ? "Saving..." : "Save School"}
        </button>

        {status && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: status.ok ? "#4ade80" : "#f87171",
              fontWeight: "600",
            }}
          >
            {status.msg}
          </p>
        )}
      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #444",
  marginTop: "6px",
  background: "rgba(255, 255, 255, 0.15)",
  color: "#fff",
};

const errorStyle = {
  fontSize: "0.85rem",
  color: "#f87171",
  marginTop: "4px",
};
