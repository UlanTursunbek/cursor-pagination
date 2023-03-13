import { Inter } from "next/font/google";
import type { ReactElement } from "react";

import { Home } from "../components/Home";

const inter = Inter({ subsets: ["latin"] });

export default function PageHome() {
  return (
    <div className={inter.className}>
      <Home />
    </div>
  );
}
