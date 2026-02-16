import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CHECKOUT_BASE_URL = "https://checkout.cooud.com/01KH52NHC02W9XP6SGHQ1DAMXK";

const TOP_CROP = 280;
const BOTTOM_CROP = 300;

const Index = () => {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const checkoutUrl = (() => {
    const params = searchParams.toString();
    return params ? `${CHECKOUT_BASE_URL}?${params}` : CHECKOUT_BASE_URL;
  })();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        overflow: "auto",
        width: "100vw",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      {/* Seção de taxa */}
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "32px 20px 24px",
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: "24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1a1a1a",
              margin: "0 0 4px",
            }}
          >
            Resumo do pedido
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#888",
              margin: "0 0 20px",
            }}
          >
            Revise os detalhes antes de prosseguir
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderTop: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: 14, color: "#444" }}>
              Taxa de processamento
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>
              R$ 5,90
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0 0",
              borderTop: "1px solid #eee",
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
              Total
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#111" }}>
              R$ 5,90
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 16,
            fontSize: 12,
            color: "#aaa",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Pagamento seguro e criptografado
        </div>
      </div>

      {/* Iframe do checkout */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: `calc(100vh + ${BOTTOM_CROP}px)`,
        }}
      >
        <iframe
          src={checkoutUrl}
          title="Checkout"
          style={{
            position: "absolute",
            top: `-${TOP_CROP}px`,
            left: 0,
            width: "100%",
            height: `calc(100vh + ${TOP_CROP + BOTTOM_CROP}px)`,
            border: "none",
          }}
          allow="payment *; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

export default Index;
