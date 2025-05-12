import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>ISR</h1>
      <h2>{number}</h2>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ number: number }> = async () => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=5&base=10&format=plain"
  );
  const number: number = await num.json();

  return {
    props: {
      number,
    },
    revalidate: 1, // In seconds
  };
};
