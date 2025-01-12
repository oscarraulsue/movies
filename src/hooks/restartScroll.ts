import { Dispatch, SetStateAction } from 'react';

export function restartScroll() {
  const main = document?.getElementById('main');
  main?.scrollTo({ top: 0, behavior: 'smooth' });
}
export function scrollX({
  element,
  isToLeft,
  setScroll,
}: {
  element: string;
  isToLeft?: boolean;
  setScroll: Dispatch<SetStateAction<string>>;
}) {
  const getElement = document?.getElementById(element);
  const position = getElement?.scrollLeft;
  if (position !== 0 && !position) return;
  const move = isToLeft ? position + 700 : position - 700;

  setScroll(move <= 0 ? 'init' : move >= (getElement?.clientWidth || 0) ? 'end' : '');
  document?.getElementById(element)?.scrollTo({ left: move >= 0 ? move : 0, behavior: 'smooth' });
}
