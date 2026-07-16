"use client";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main
          role="alert"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, sans-serif",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h1>BuildPixies could not start</h1>
          <p>Reload the application. Your saved project data has not been changed.</p>
          <button
            type="button"
            onClick={unstable_retry}
            style={{ marginTop: "16px", padding: "10px 16px" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
