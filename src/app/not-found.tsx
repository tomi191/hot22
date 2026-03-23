export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-frost-dark text-frost-white">
      <h1 className="text-6xl font-black">
        <span className="text-hot-red">404</span>
      </h1>
      <p className="mt-4 text-xl text-frost-steel">
        Страницата не е намерена / Page not found
      </p>
      <a
        href="/bg"
        className="mt-8 rounded-radius-btn bg-hot-red px-8 py-3 font-semibold text-white transition-all hover:bg-hot-red-dark"
      >
        &larr; Начало / Home
      </a>
    </div>
  );
}
