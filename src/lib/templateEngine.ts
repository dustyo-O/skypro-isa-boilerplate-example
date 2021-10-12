type TemplateElement = {
  block: string;
  cls?: string | string[];
  attrs?: {[key: string]: string};
  content?:
    | undefined
    | null
    | boolean
    | string
    | number
    | TemplateElement
    | TemplateElement[];
};

export type TemplateBlock =
  | undefined
  | null
  | boolean
  | string
  | number
  | TemplateElement
  | TemplateElement[];

export function templateEngine(block: TemplateBlock): HTMLElement | Text | DocumentFragment {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }

  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(String(block));
  }

  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();

    block.forEach(contentItem => {
      const el = templateEngine(contentItem);

      fragment.appendChild(el);
    });

    return fragment;
  }

  const element = document.createElement(block.block);

  [].concat(block.cls).filter(Boolean).forEach(
    className => element.classList.add(className)
  );

  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  element.appendChild(templateEngine(block.content));

  return element;
}
