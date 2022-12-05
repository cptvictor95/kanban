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
        <meta name="description" content="Created by Victor Torres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  );
};

export default Main;
