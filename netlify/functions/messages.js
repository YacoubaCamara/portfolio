import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
  const headers = { "Content-Type": "application/json" };
  const store = getStore("contact-submissions");

  try {
    if (event.httpMethod === "GET") {
      const { blobs } = await store.list({ prefix: "messages/" });

      const messages = await Promise.all(
        blobs.map((b) => store.get(b.key, { type: "json" }))
      );

      const clean = messages.filter(Boolean);
      clean.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return { statusCode: 200, headers, body: JSON.stringify(clean) };
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");

      const name = body.name?.trim() || "";
      const email = body.email?.trim() || "";
      const subject = body.subject?.trim() || "";
      const message = body.message?.trim() || "";
      const consent = body.consent === true;

      if (!name || !email || !subject || !message || !consent) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: "Missing fields" }),
        };
      }

      const submission = {
        id: crypto.randomUUID(),
        name,
        email,
        subject,
        message,
        consent,
        createdAt: new Date().toISOString(),
      };

      await store.set(
        `messages/${submission.id}`,
        JSON.stringify(submission)
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Success" }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Server error", detail: error?.message ?? String(error) }),
    };
  }
};