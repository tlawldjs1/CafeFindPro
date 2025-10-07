import SearchForm from '../SearchForm';

export default function SearchFormExample() {
  return <SearchForm onSearch={(district) => console.log('Search:', district)} />;
}
