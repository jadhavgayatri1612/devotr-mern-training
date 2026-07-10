import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/products"
        );

        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to load. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="container">
      <h1>Our Products</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <h2>{product.name}</h2>

            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>In Stock:</strong>{" "}
              {product.inStock ? "Yes" : "No"}
            </p>

            <Link
              className="details-btn"
              to={`/products/${product._id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;