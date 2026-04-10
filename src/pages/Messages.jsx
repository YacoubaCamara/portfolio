import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Messages() {
  const hasMessagesAccess =
    import.meta.env.VITE_HAS_MESSAGES_ACCESS === "true";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasMessagesAccess) return;

    const loadMessages = async () => {
      try {
        const response = await fetch("/.netlify/functions/messages", {
          headers: {
            Authorization: `Bearer ${prompt("Enter admin key") || ""}`,
          },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`Failed to load messages: ${response.status} | ${text}`);
        }

        const data = text ? JSON.parse(text) : [];
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [hasMessagesAccess]);

  if (!hasMessagesAccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="messages-page">
      <div className="layout-container">
        <h1 className="messages-title">Messages</h1>

        {loading && <p className="messages-status">Loading...</p>}
        {error && <p className="messages-error">{error}</p>}

        {!loading && !error && messages.length === 0 && (
          <p className="messages-empty">No submitted messages yet.</p>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="messages-list">
            {messages.map((msg) => (
              <div className="message-card" key={msg.id}>
                <h4 className="message-subject">{msg.subject}</h4>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <div className="message-divider" />
                <p className="message-body">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Messages;