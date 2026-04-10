import { getStore } from "@netlify/blobs";

export default async (req) => {
  const headers = { "Content-Type": "application/json" };
  const store = getStore("contact-submissions");

  try {
    if (req.method === "GET") {
      const authHeader = req.headers.get("authorization");

      if (authHeader !== `Bearer ${process.env.ADMIN_KEY}`) {
        return new Response(
          JSON.stringify({ message: "Unauthorized" }),
          { status: 401, headers }
        );
      }

      const { blobs } = await store.list({ prefix: "messages/" });

      const messages = await Promise.all(
        blobs.map((blob) => store.get(blob.key, { type: "json" }))
      );

      const cleanMessages = messages.filter(Boolean);

      cleanMessages.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      return new Response(JSON.stringify(cleanMessages), {
        status: 200,
        headers,
      });
    }

    if (req.method === "POST") {
      const body = await req.json();

      const name = typeof body.name === "string" ? body.name.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim() : "";
      const subject =
        typeof body.subject === "string" ? body.subject.trim() : "";
      const message =
        typeof body.message === "string" ? body.message.trim() : "";

      if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ message: "Missing fields" }), {
          status: 400,
          headers,
        });
      }

      const submission = {
        id: crypto.randomUUID(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      await store.set(
        `messages/${submission.id}.json`,
        JSON.stringify(submission)
      );

      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
        headers,
      });
    }

    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers,
    });
  } catch (error) {
    console.error("Contact function error:", error);

    return new Response(
      JSON.stringify({
        message: "Server error",
        detail: error?.message || String(error),
      }),
      { status: 500, headers }
    );
  }
};