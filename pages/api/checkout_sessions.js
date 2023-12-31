const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			// Check priceId has been provided
			if (!req.body?.priceId) {
				throw new Error("Price ID not provided");
			}
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
						price: req.body.priceId,
						quantity: 1,
					},
				],
				mode: "payment",
				success_url: `${process.env.HOST}/success`,
				cancel_url: `${process.env.HOST}/canceled`,
			});
			res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}