import { useMemo } from 'react';
import { List, type RowComponentProps } from 'react-window';

import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

type CountryRowProps = {
  countries: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const CountryRow = ({
  index,
  style,
  countries,
  selectedYear,
  selectedColumns,
}: RowComponentProps<CountryRowProps>) => {
  const country = countries[index];

  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();

    return countries
      .filter((country) => {
        const matchesSearch = country.id.toLowerCase().includes(normalizedSearchQuery);

        const matchesRegion =
          !selectedRegion || country.data.some((item) => item.region === selectedRegion);

        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }

        const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;

        const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;

        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  return (
    <List
      rowCount={filteredCountries.length}
      rowHeight={320}
      rowComponent={CountryRow}
      rowProps={{
        countries: filteredCountries,
        selectedYear,
        selectedColumns,
      }}
      style={{
        height: 800,
        width: '100%',
      }}
    />
  );
};
