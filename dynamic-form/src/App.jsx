import { useState } from "react";

const schema = {
  fields: [
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
  ],
};

const App = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e, field) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    schema.fields.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {

        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === "email" && value) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {

          newErrors[field.name] = "Enter a valid email";
        }
      } else if (field.type === "number" && value) {
        const num = Number(value);
        if (field.min && num < field.min) {
          newErrors[
            field.name
          ] = `${field.label} must be at least ${field.min}`;
        }
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmittedData(null);
    } else {
      setErrors({});
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Dynamic Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(e, field)}
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e, field)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Submitted Data:</h3>
          <pre className="text-sm text-gray-700 bg-white p-3 rounded overflow-x-auto">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;
