import React, { useState } from "react";

const formSchema = [
  {
    label: "Name",
    type: "text",
    name: "name",
    required: true,
    minLength: 3,
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
  },
  {
    label: "Age",
    type: "number",
    name: "age",
    required: false,
    min: 18,
    max: 100,
  },
  {
    label: "Gender",
    type: "select",
    name: "gender",
    required: true,
    options: ["Male", "Female", "Other"],
  },
  {
    label: "Subscribe to newsletter",
    type: "checkbox",
    name: "subscribe",
    required: false,
  },
];

const App = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can send formData to backend here
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            required={field.required}
            min={field.min}
            max={field.max}
            minLength={field.minLength}
            onChange={handleChange}
          />
        );
      case "select":
        return (
          <select
            name={field.name}
            required={field.required}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            name={field.name}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formSchema.map((field) => (
        <div key={field.name} style={{ marginBottom: "10px" }}>
          <label>
            {field.label} {field.required && "*"}:
            {renderField(field)}
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
