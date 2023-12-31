import Head from "next/head";
// Import the layout components
import { Layout } from "../components/layout";
import { Products } from "../components/products";

// import stripe js
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
	`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

// Pass the products object to the Home page
export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      {/* Add the Layout component to the Home page. */}
      <Layout>
        {/* Need to pass products.data to the Products component */}
				<Products products={products.data} />
      </Layout>
    </>
  );
}

// Add getServerSideProps so we can return the data from server-side
export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${process.env.HOST}/api/products`);
	const products = await res.json();

	// Pass data to the page via props
	return { props: { products } };
}
