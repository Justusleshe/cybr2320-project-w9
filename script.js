document.getElementById("checkout-button").addEventListener("click", async () => {
  const status = document.getElementById("status-message");

  try {
    status.innerText = "Loading...";

    const response = await fetch("/api/create-checkout-session", {
      method: "POST"
    });

    const text = await response.text();
    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error("Server returned invalid JSON: " + text);
    }

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    if (!data.url) {
      throw new Error("No checkout URL returned");
    }

    window.location.href = data.url;
  } catch (error) {
    status.innerText = "Error: " + error.message;
  }
});