import { useEffect, useRef, useState } from "react";
import { isOverflown } from "./utilityy";
import {
  IAppInstanceForToolbarDataStructure,
  IFileItem,
  IObjectWithProperties
} from "./globalTypes";

export const usePrevious = <T>(value: T | undefined) => {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useIsOverflow = <T extends HTMLElement>(element: T | null) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [isScrollLeftMax, setIsScrollLeftMax] = useState(false);
  const [isScrollRightMax, setIsScrollRightMax] = useState(false);
  const refChanged = useRef(false);
  const refMaximumLeftSizeReached = useRef(false);
  const refMaximumRightSizeReached = useRef(false);

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
      element.addEventListener("scroll", () => {
        const isLeftMax = element.scrollLeft === 0;
        const isRightMax =
          element.scrollLeft >= element.scrollWidth - element.offsetWidth - 2;
        console.log(element.scrollLeft);
        console.log(element.scrollWidth - element.offsetWidth);

        if (isLeftMax !== refMaximumLeftSizeReached.current) {
          refMaximumLeftSizeReached.current = isLeftMax;
          setIsScrollLeftMax(isLeftMax);
        }
        if (isRightMax !== refMaximumRightSizeReached.current) {
          refMaximumRightSizeReached.current = isRightMax;
          setIsScrollRightMax(isRightMax);
        }
      });
    }
  }, [element]);

  return [isOverflow, isScrollLeftMax, isScrollRightMax];
};

export const useAfterNavItemAdded: <T extends
  | IAppInstanceForToolbarDataStructure
  | IFileItem>(
  items: T[],
  refs: IObjectWithProperties<React.RefObject<HTMLLIElement>>,
  refToScroll?: HTMLDivElement | null
) => void = (items, refs, refToScroll) => {
  const previousCountOfItems = usePrevious(items.length);

  useEffect(() => {
    const element = document.getElementById("previewHeader");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "end"
      });
    }
    if (
      previousCountOfItems !== undefined &&
      previousCountOfItems < items.length
    ) {
      const navRef = refs[items[items.length - 1].id].current;
      if (navRef) {
        navRef.scrollIntoView({
          behavior: "smooth",
          inline: "end"
        });
      }
    }
  }, [items, refs, previousCountOfItems, refToScroll]);
};
