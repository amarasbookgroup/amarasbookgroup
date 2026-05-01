import { Link } from "react-router";
import LionMascot from "../components/LionMascot.jsx";
import BookCard from "../components/BookCard.jsx";
import { books } from "../data/books.js";
import { alphabet } from "../data/alphabet.js";

const TEASER_INDICES = [0, 14, 19];

export default function Home() {
  const featured = books[0];
  const teaser = TEASER_INDICES.map((i) => alphabet[i]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page section grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="pill">Armenian children's books</
