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

  useEffect(() => {
    const overflow = isOverflown(element);
    if (overflow !== isOverflow) {
      setIsOverflow(overflow);
    }
  });
  return isOverflow;
};
