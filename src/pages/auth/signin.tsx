import { getProviders, signIn } from "next-auth/react";
import { type AppProviders } from "next-auth/providers";
import { type GetServerSideProps } from "next";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import Main from "../../layouts/Main";
import { Header } from "../../components/Header";

export interface LoginDTO {
  email: string;
  password: string;
}
const SignIn: React.FC<{ providers: AppProviders }> = ({ providers }) => {
  return (
    <Main>
      <Header />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="py-4 text-center text-3xl font-bold text-white">
            Login
          </h1>
          {Object.values(providers).map((provider) => {
            return (
              <button
                key={provider.name}
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "http://localhost:3000/" })
                }
                className="flex items-center gap-2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              >
                {provider.name.toLowerCase() === "discord" ? (
                  <FaDiscord />
                ) : (
                  <FaGoogle />
                )}
                Sign in with {provider.name}
              </button>
            );
          })}
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
