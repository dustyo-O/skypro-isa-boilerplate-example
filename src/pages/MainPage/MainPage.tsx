import './MainPage.sass';

export class MainPage {
  container: HTMLElement;

  element: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this.render();
  }

  render(): void {
    this.container.textContent = '';

    const element = document.createElement('div');
    element.classList.add('MainPage');

    this.container.appendChild(element);
    this.element = element;
  }
}
