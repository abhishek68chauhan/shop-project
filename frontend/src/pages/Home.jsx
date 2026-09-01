
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");

                const data = await res.json();

                console.log("PRODUCT DATA:", data);

                setProducts(data.slice(0, 10));
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="home-container">

            <div className="hero-banner">
                <h1>Welcome to Shop</h1>
                <p>Discover the best products at unbeatable prices.</p>
            </div>

            <h2>Featured Products</h2>

            {loading ? (
                <div>Loading...</div>
            ) : products.length === 0 ? (
                <div>No products found.</div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default Home;

