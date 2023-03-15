import { Inter } from "next/font/google";
import { NextRouter } from "next/router";
import type { ReactElement } from "react";
import { unstable_serialize } from "swr";

import { Home } from "../components";
import { Layout } from "../components/layout";
import { fallbackUseRepos } from "../lib/useRepos";

const inter = Inter({ subsets: ["latin"] });

export default function PageHome() {
  return (
    <div className={inter.className}>
      <Home />
    </div>
  );
}

PageHome.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(query: NextRouter["query"]) {
  const response = await fallbackUseRepos(query);

  return {
    props: {
      fallback: {
        [unstable_serialize("repos")]: response,
      },
    },
  };
}
