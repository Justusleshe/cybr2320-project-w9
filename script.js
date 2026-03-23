document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button");
  const statusMessage = document.getElementById("status-message");

  checkoutButton.addEventListener("click", async () => {
    try {
      checkoutButton.disabled = true;
      statusMessage.textContent = "Redirecting to secure checkout...";

      const response = await fetch("/api/create-checkout-session", {
        method: "POST"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session.");
      }

      window.location.href = data.url;
    } catch (error) {
      statusMessage.textContent = "Error: " + error.message;
      checkoutButton.disabled = false;
    }
  });
});