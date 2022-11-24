import Head from 'next/head';
import { useState } from 'react';
import { trpc } from '~/server/utils/trpc';

export default function IndexPage() {
  return (
    <>
      <Head><title>Nice!</title></Head>
      <Hello/>
      <Numbers/>
    </>
  );
}

function Hello() {
  const hello = trpc.hello.useQuery({ text: 'client 1213' });
  
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return <p>{hello.data.greeting}</p>
}

function Numbers() {
  const [number, setNumber] = useState(0)

  trpc.numbers.useSubscription({start: 2}, {
    onData(n) {
      setNumber(n)
    },
    onStarted() {
        console.log("start")
    },
    onError() {
      console.log("error")
    }
  });

  return <div>random numbers {number}</div>
}