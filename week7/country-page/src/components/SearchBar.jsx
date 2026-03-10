import { useEffect, useRef } from "react";

function SearchBar({ onSearch }) {
  const inputRef = useRef();
  const timerRef = useRef();

  // ✅ Auto focus
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, 500);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search country..."
      onChange={handleChange}
    />
  );
}

export default SearchBar;