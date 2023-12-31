const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	try {
		const products = await stripe.products.list({
			limit: 100,
		});

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}