import Head from "next/head";
import React from "react";

const Main: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#3b0129] to-[#2c011f]">
      <Head>
        <title>{title ?? "Kanban"}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="description" content="Created by Victor Torres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  );
};

export default Main;
