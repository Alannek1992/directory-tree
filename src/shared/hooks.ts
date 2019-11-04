import { useEffect, useRef, useState } from "react";
import { isOverflown } from "./utilityy";

export const usePrevious = <T>(value: T | undefined) => {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useIsOverflow = <T extends HTMLElement>(element: T | null) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const refChanged = useRef(false);

  useEffect(() => {
    const isOverflowed = isOverflown(element);
    if (isOverflowed !== refChanged.current) {
      refChanged.current = isOverflowed;
      setIsOverflow(isOverflowed);
    }
  });

  useEffect(() => {
    if (element) {
      window.addEventListener("resize", () => {
        const isOverflowed = isOverflown(element);
        if (isOverflowed !== refChanged.current) {
          refChanged.current = isOverflowed;
          setIsOverflow(isOverflowed);
        }
      });
    }
  }, [element]);

  return isOverflow;
};
