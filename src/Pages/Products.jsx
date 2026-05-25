import { useEffect, useMemo, useState } from "react";

function Products() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://api-wsd3.onrender.com");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }, [items, searchQuery]);

  return (
    <div className="products-page">
      <section className="section">
        <div className="products-header">
          <div>
            <h1>Products</h1>
            <p className="section-subtitle">
              Browse boxed, easy-to-read product cards and search instantly.
            </p>
          </div>
          <div>
            <input
              type="search"
              className="search-bar"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="section">
        {loading ? (
          <p>Loading products…</p>
        ) : filteredItems.length === 0 ? (
          <p>No products matched your search.</p>
        ) : (
          <div className="product-grid">
            {filteredItems.map((item) => (
              <article className="product-card" key={item._id}>
                <h3>{item.name}</h3>
                <p className="product-description">{item.description}</p>
                <div className="product-meta">
                  <span className="product-price">₹{item.price}</span>
                  <button className="product-button">Buy now</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>Online Service</h2>
        <p className="section-subtitle">
          24/7 customer services available online to help with ordering, product
          information, and support.
        </p>
        <div className="service-grid">
          <article className="service-card">
            <h3 className="service-title">24/7 Customer Support</h3>
            <p className="service-description">
              Chat with our team anytime, day or night, for fast responses and
              personalized help.
            </p>
          </article>
          <article className="service-card">
            <h3 className="service-title">Online Ordering</h3>
            <p className="service-description">
              Place orders easily from anywhere and get instant confirmation.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Products;
