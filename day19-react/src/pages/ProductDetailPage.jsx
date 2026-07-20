import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="container">
      <div className="card product-details">
        <h1>{product.name}</h1>

        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}
        </p>

        <Link to="/products" className="details-btn">
          ← Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetailPage;
