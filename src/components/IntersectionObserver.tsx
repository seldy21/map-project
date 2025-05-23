import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

export default function IntersectionObserver({
  intersectionAction,
  isLoading,
}: {
  intersectionAction: () => void;
  isLoading: boolean;
}) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: "10px",
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      intersectionAction();
    }
  }, [entry?.isIntersecting]);
  return (
    <section>
      <div ref={ref} className="pb-20 flex justify-center gap-2">
        {isLoading && (
          <>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </>
        )}
      </div>
    </section>
  );
}
