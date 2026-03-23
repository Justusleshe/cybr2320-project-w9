const { app } = require("@azure/functions");
const Stripe = require("stripe");

app.http("create-checkout-session", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      const siteUrl = process.env.SITE_URL || "http://localhost:4280";

      if (!stripeSecretKey) {
        return {
          status: 500,
          jsonBody: { error: "Missing STRIPE_SECRET_KEY." }
        };
      }

      const stripe = new Stripe(stripeSecretKey);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Test Item"
              },
              unit_amount: 100
            },
            quantity: 1
          }
        ],
        success_url: `${siteUrl}/success.html`,
        cancel_url: `${siteUrl}/cancel.html`
      });

      return {
        status: 200,
        jsonBody: { url: session.url }
      };
    } catch (error) {
      context.log("Stripe error:", error);
      return {
        status: 500,
        jsonBody: { error: error.message }
      };
    }
  }
});