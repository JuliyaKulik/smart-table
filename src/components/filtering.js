

// @todo: #4.3 — настроить компаратор

// const compare = createComparison(defaultRules);

export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
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
    } // код с обработкой очистки поля
         

        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}
