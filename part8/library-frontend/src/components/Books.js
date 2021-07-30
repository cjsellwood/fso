import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
      const newGenres = [];
      result.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!newGenres.includes(genre)) {
            newGenres.push(genre);
          }
        });
      });
      console.log(newGenres);
      setGenres(newGenres);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              if (genreFilter) {
                return book.genres.includes(genreFilter);
              }
              return book;
            })
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => {
          return (
            <button key={genre} onClick={() => setGenreFilter(genre)}>
              {genre}
            </button>
          );
        })}
        <button onClick={() => setGenreFilter(null)}>
              All Genres
            </button>
      </div>
    </div>
  );
};

export default Books;
