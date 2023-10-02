import React from "react";
import Image from "next/image";
import styles from "../styles/products.module.css";

export const Products = ({ products }) => {
	return (
		<>
			{/* Check that we have products */}
			{products.length ? (
				<ul className={styles.products}>
					{/* Iterate over the products */}
					{products.map((product) => (
						<li key={product.id}>
							{/* Note that we are using a form to post to the API we just created */}
							<form action="/api/checkout_sessions" method="POST">
								{/* Display the product image using the Next Image component */}
								<Image
									src={product.images[0]}
									alt={`Image of ${product.name}`}
									layout={"responsive"}
									width={0}
									height={0}
									priority={true}
								/>
								<h2>{product.name}</h2>
								<p>{product.description}</p>
								<button type="submit" role="link" className={styles.link}>
									Buy Now
								</button>
								{/* The ID of the product so the user can purchase */}
								<input
									type="hidden"
									name="priceId"
									value={product.default_price}
								/>
							</form>
						</li>
					))}
				</ul>
			) : (
				<div>No products</div>
			)}
		</>
	);
};