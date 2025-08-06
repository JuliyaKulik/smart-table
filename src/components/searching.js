import { rules, createComparison } from '../lib/compare.js';

export function initSearching(searchField) {
  // Настройка компаратора
  const compare = createComparison(
    [rules.skipEmptyTargetValues],
    [
      rules.searchMultipleFields(
        searchField,
        ['date', 'customer', 'seller'],
        false
      ),
    ]
  );

  return (data, state, action) => {
    // Применение компаратора к данным
    const filteredData = data.filter((item) => compare(item));
    return filteredData;
  };
}
