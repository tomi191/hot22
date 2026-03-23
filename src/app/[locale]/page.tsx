import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-black">
        <span className="text-hot-red">HOT</span>
        <span className="text-frost-dark">22</span>
      </h1>
    </div>
  );
}
