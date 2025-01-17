export function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void;
export function setStyles(
  elements: HTMLElement[],
  styles: Partial<CSSStyleDeclaration>
): void;
export function setStyles(
  elements: NodeListOf<HTMLElement>,
  styles: Partial<CSSStyleDeclaration>
): void;
export function setStyles(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  styles: Partial<CSSStyleDeclaration>
): void {
  elements = elements instanceof HTMLElement ? [elements] : [...elements];
  for (const element of elements) {
    for (const prop in styles) {
      element.style[prop] = styles[prop]!;
    }
  }
}
