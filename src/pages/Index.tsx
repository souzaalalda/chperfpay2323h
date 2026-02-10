import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const CHECKOUT_BASE_URL = "https://checkout.centerpag.com/pay/PPU38CQ7B8I";

// Ajuste esses valores conforme necessário para esconder áreas acima/abaixo
const TOP_CROP = 0;    // px para esconder no topo (ex: 100 para esconder header)
const BOTTOM_CROP = 0; // px para esconder no final

const Index = () => {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // Repassa todos os query params para o checkout
  const checkoutUrl = (() => {
    const params = searchParams.toString();
    return params ? `${CHECKOUT_BASE_URL}?${params}` : CHECKOUT_BASE_URL;
  })();

  useEffect(() => {
    // Bloqueia scroll da página principal
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
  );
};

export default Index;
