document.getElementById("checkout-button").addEventListener("click", async () => {
  const status = document.getElementById("status-message");

  try {
    status.innerText = "Loading...";

    const response = await fetch("/api/create-checkout-session", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    if (!data.url) {
      throw new Error("No checkout URL returned");
    }

    window.location.href = data.url;

  } catch (error) {
    status.innerText = "Error: " + error.message;
  }
});