import type { Item } from '../pages/Home/home.type';

export const downloadCSV = (items: Item[]) => {
  const header = ['name', 'description', 'URL'];

  const rows = items.map((item) => [
    item.name,
    item.description,
    `https://pokeapi.co/api/v2/pokemon/${item.name}`,
  ]);

  const fullCSV = [header, ...rows]
    .map((row) =>
      row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')
    )
    .join('\n');
  console.log(fullCSV);
  const blob = new Blob([fullCSV], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${items.length}_items.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
