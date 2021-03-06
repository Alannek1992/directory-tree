import {
  IFileItem,
  IObjectWithProperties,
  IAppInstanceForToolbarDataStructure
} from "./globalTypes";
import { createRef } from "react";

export const scrollLeft = (element: any, change: any, duration: any) => {
  var start = element.scrollLeft,
    currentTime = 0,
    increment = 20;


  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  const easeInOutQuad = function(t: any, b: any, c: any, d: any) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  var animateScroll = function() {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

export const isOverflown: <T extends HTMLElement>(
  element: T | null
) => boolean = element =>
  element ? element.scrollWidth > element.clientWidth : false;

export const getRefsForNav: <
  T extends IAppInstanceForToolbarDataStructure | IFileItem
>(
  listOfItems: T[]
) => IObjectWithProperties<React.RefObject<HTMLLIElement>> = items => {
  return items.reduce<IObjectWithProperties<React.RefObject<HTMLLIElement>>>(
    (acc, value) => {
      acc[value.id] = createRef<HTMLLIElement>();
      return acc;
    },
    {}
  );
};
