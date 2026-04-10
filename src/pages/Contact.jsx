import { useEffect, useState } from "react";

const STORAGE_KEY = "contactFormDraft";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const nameRegex = /^[A-Za-z\s'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const subjectRegex = /^[A-Za-z\s]+$/;

  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);

    if (savedDraft) {
      try {
        setFormData(JSON.parse(savedDraft));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (!nameRegex.test(value.trim())) {
          return "Name can only contain letters, spaces, apostrophes, and hyphens.";
        }
        return "";

      case "email":
        if (!value.trim()) return "Email is required.";
        if (!emailRegex.test(value.trim())) {
          return "Enter a valid email address.";
        }
        return "";

      case "subject":
        if (!value.trim()) return "Subject is required.";
        if (!subjectRegex.test(value.trim())) {
          return "Subject can only contain letters and spaces.";
        }
        return "";

      case "message":
        if (!value.trim()) return "Message is required.";
        return "";

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, updatedValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerMessage("");

    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setServerMessage(result.message || "Submission failed.");
        return;
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
      });
      setErrors({});
      setTouched({});
      localStorage.removeItem(STORAGE_KEY);
      setServerMessage("Message submitted successfully.");
    } catch (error) {
      setServerMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="layout-container">
        <h1 className="contact-page-title">Contact Me</h1>

        <form onSubmit={handleSubmit} noValidate className="contact-form">
          <div className="contact-field">
            <label htmlFor="name" className="contact-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={`contact-input ${touched.name && errors.name ? "input-error" : ""}`}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="contact-error-text">{errors.name}</p>
            )}
          </div>

          <div className="contact-field">
            <label htmlFor="email" className="contact-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={`contact-input ${touched.email && errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="contact-error-text">{errors.email}</p>
            )}
          </div>

          <div className="contact-field">
            <label htmlFor="subject" className="contact-label">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              className={`contact-input ${touched.subject && errors.subject ? "input-error" : ""}`}
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.subject && errors.subject && (
              <p className="contact-error-text">{errors.subject}</p>
            )}
          </div>

          <div className="contact-field">
            <label htmlFor="message" className="contact-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              className={`contact-input contact-textarea ${touched.message && errors.message ? "input-error" : ""}`}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.message && errors.message && (
              <p className="contact-error-text">{errors.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="contact-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {serverMessage && (
            <p
              className={`contact-server-message ${
                serverMessage.includes("successfully")
                  ? "contact-success"
                  : "contact-failure"
              }`}
            >
              {serverMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;