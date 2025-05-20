export default function Loading() {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md" />
      {[...Array(10)].map((_, index) => (
        <div
          key={`loading_${index}`}
          className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-4"
        />
      ))}
    </>
  );
}
