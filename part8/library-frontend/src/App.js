import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useSubscription } from "@apollo/client";
import jwtDecode from "jwt-decode";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const storedToken = localStorage.getItem("library-user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setFavoriteGenre(jwtDecode(token).favoriteGenre);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`book added: ${addedBook.title} - ${addedBook.author.name}`);
      updateCacheWith(addedBook);
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {!token ? null : (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook
        show={page === "add"}
        favoriteGenre={favoriteGenre}
        updateCacheWith={updateCacheWith}
      />
      <Recommend show={page === "recommend"} favoriteGenre={favoriteGenre} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
