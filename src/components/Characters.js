import React, { useState } from "react";
import { useQuery } from "react-query";
import Character from "./Character";

export default function Characters() {
  const [page, setPage] = useState(1);
  // const [characters, setChaaracters] = useState([]);
  const fetchCharacters = async ({ queryKey }) => {
    console.log("Kobe is ", queryKey);
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
    // const data = await response.json();
    // console.log(data);
    // setChaaracters(data.results);
  };

  const { data, status, isPreviousData } = useQuery(
    ["chacterscall", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );
  console.log("Data is ", data);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error!</div>;
  }

  // useEffect(() => {
  //   fetchCharacters();
  // }, []);
  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
          Previous
        </button>
        <button
          disabled={isPreviousData && !data.info.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
