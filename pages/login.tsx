import { useSession, signIn, signOut } from "next-auth/react";
import { trpc } from "~/server/utils/trpc";

export default function Component() {
  const session = useSession();

  if (session?.data?.user) {
    return (
      <>
        Signed in as {session.data.user.email} <br />
        <LogedIn />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

function LogedIn() {
  const result = trpc.users.useQuery();

  if (result.isLoading) {
    return <div>Loading</div>;
  }

  if (result.isError) {
    return <div>error</div>;
  }

  return <div>{JSON.stringify(result.data)}</div>;
}
