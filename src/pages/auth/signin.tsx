import { getProviders, signIn } from "next-auth/react";
import { type AppProviders } from "next-auth/providers";
import { type GetServerSideProps } from "next";

const SignIn: React.FC<{ providers: AppProviders }> = ({ providers }) => {
  console.log("PROVIDERS", providers);
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <form className="flex w-72 flex-col gap-4">
          <h1 className="text-center text-4xl font-bold">Login</h1>
          <div className="grid gap-2">
            <label htmlFor="">Email</label>
            <input type="email" className="rounded-md bg-fuchsia-50 p-2" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="">Password</label>
            <input type="password" className="rounded-md bg-fuchsia-50 p-2" />
          </div>

          <button className="rounded-md bg-fuchsia-600 px-4 py-2 text-fuchsia-50 hover:bg-fuchsia-700">
            Sign in
          </button>
        </form>

        <span className="mx-4 h-px w-72 bg-slate-100"></span>
        <div className="flex w-72 flex-col gap-4">
          {Object.values(providers).map((provider) => {
            return (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="rounded-md bg-fuchsia-200 px-4 py-2 hover:bg-fuchsia-300"
              >
                Sign in with {provider.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
