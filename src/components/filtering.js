import { createComparison, defaultRules } from '../lib/compare.js';

// @todo: #4.3 — настроить компаратор

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями

  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      // Перебираем по именам
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            // используйте name как значение и текстовое содержимое
            // @todo: создать и вернуть тег опции

            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            return option;
          })
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля

    // @todo: #4.2 проверьте наличие действия. Если это кнопка с именем clear...
    if (action?.name === 'clear') {
      // Получаем родительский label кнопки (filter-wrapper)
      const filterWrapper = action.element.closest('.filter-wrapper');

      if (filterWrapper) {
        // Ищем input внутри этого label
        const inputElement = filterWrapper.querySelector('input');

        // Сбрасываем значение в поле ввода
        if (inputElement) {
          inputElement.value = '';

          // Получаем имя поля из data-атрибута кнопки
          const fieldName = action.element.dataset.field;

          // Сбрасываем соответствующее поле в state
          if (fieldName && state.filters) {
            state.filters[fieldName] = '';
          }
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter(row => compare(row, state));
  };
}
