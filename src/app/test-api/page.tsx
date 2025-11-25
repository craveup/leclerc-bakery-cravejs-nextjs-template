"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getLocation, createCart } from "@/lib/api/cart";
import { STORE_FRONT_API_BASE_URL } from "@/constants";

export default function TestAPIPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locationId =
    process.env.NEXT_PUBLIC_LOCATION_ID || "687336d833c0e05514856061";

  const testLocationAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLocation(locationId);
      setResult(data);
      console.log("Location data:", data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch location");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const testCreateCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await createCart(locationId);
      setResult(data);
      console.log("Cart data:", data);
    } catch (err: any) {
      setError(err.message || "Failed to create cart");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connectivity Test</h1>

        <div className="space-y-4 mb-8">
          <div>
            <strong>Location ID:</strong> {locationId}
          </div>
          <div>
            <strong>API Base URL:</strong> {STORE_FRONT_API_BASE_URL}
          </div>
          <div>
            <strong>API Key:</strong>{" "}
            {process.env.NEXT_PUBLIC_CRAVEUP_API_KEY
              ? "Configured"
              : "Missing"}
          </div>
        </div>

        <div className="space-x-4 mb-8">
          <Button
            onClick={testLocationAPI}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Testing..." : "Test Location API"}
          </Button>

          <Button
            onClick={testCreateCart}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600"
          >
            {loading ? "Testing..." : "Test Create Cart"}
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong>
            <pre className="mt-2 bg-white p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
