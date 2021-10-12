/* eslint-disable class-methods-use-this */
import autocomplete from 'autocompleter';
import cities from 'cities.json';
import './TownSuggest.sass';
import 'autocompleter/autocomplete.css';
import { TemplateBlock, templateEngine } from '../../lib/templateEngine';

type CityItem = {
  country: string,
  name: string,
}

const cityItems = cities as CityItem[];

export class TownSuggest {
  container: HTMLElement;

  element: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this.render();
  }

  template(): TemplateBlock {
    return {
      block: 'div',
      cls: 'TownSuggest',
      content: {
        block: 'input',
        cls: 'TownSuggest-Input'
      }
    };
  }

  render(): void {
    this.container.textContent = '';

    const element = templateEngine(this.template()) as HTMLElement;
    const input = element.querySelector<HTMLInputElement>('.TownSuggest-Input');

    autocomplete({
      input: input,
      fetch(text, update) {
        const lowerText = text.toLowerCase();
        // you can also use AJAX requests instead of preloaded data
        const suggestions = cityItems
          .filter(city => city.name.toLowerCase().startsWith(lowerText))
          .map(city => ({ label: city.name }));

        console.log(suggestions);

        update(suggestions);
      },
      onSelect(item) {
        input.value = item.label;
      }
    });

    this.container.appendChild(element);
    this.element = element;
  }
}
