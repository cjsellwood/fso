import { useLazyQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { GENRE_BOOKS } from "../queries";

const Recommend = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [getBooks, result] = useLazyQuery(GENRE_BOOKS);

  useEffect(() => {
    if (props.token) {
      setFavoriteGenre(jwtDecode(props.token).favoriteGenre);
    }
  }, [props.token]);

  useEffect(() => {
    getBooks({ variables: { genre: favoriteGenre } });
  }, [getBooks, favoriteGenre]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre patterns</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
