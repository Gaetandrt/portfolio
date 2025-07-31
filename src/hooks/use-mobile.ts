"use client";

import { useEffect, useState } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        typeof window !== "undefined" ? navigator.userAgent : "";
      const isMobileUserAgent =
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
          userAgent
        );
      const isMobileScreen =
        typeof window !== "undefined" ? window.innerWidth < 768 : false;

      setIsMobile(isMobileUserAgent || isMobileScreen);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
