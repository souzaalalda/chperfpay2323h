import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRegion, isRestricted } from "@/lib/region";

const CHECKOUT_BASE_URL = "https://checkout.centerpag.com/pay/PPU38CQ7B8I";

const TOP_CROP = 302;
const BOTTOM_CROP = 9500;

const Index = () => {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState<boolean | null>(null);

  const checkoutUrl = (() => {
    const params = searchParams.toString();
    return params ? `${CHECKOUT_BASE_URL}?${params}` : CHECKOUT_BASE_URL;
  })();

  useEffect(() => {
    fetchRegion().then((code) => setLocked(isRestricted(code)));
  }, []);

  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [locked]);

  if (locked === null) {
    return <div style={{ background: "#000", position: "fixed", inset: 0 }} />;
  }

  if (!locked) {
    return (
      <div style={{ width: "100vw", minHeight: "100vh" }}>
        <iframe
          src={checkoutUrl}
          title="Checkout"
          style={{ width: "100%", height: "100vh", border: "none" }}
          allow="payment *; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
        />
      </div>
    );
  }

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
