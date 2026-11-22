
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import FormInput from "../../components/FormInput";

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);
      navigate("/welcome");
    } catch (err) {
      const data = err.response?.data;

      setError(
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.detail ||
        "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">≈ Breath Connection</div>

        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>

        <h1>Create your account</h1>

        <p className="muted">
          Take the first step towards better breathing
          and everyday wellbeing.
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <FormInput
              label="First name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Alex"
            />

            <FormInput
              label="Last name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Morgan"
            />
          </div>

          <FormInput
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
          />

          <button
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}
