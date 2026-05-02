export const books = [
  {
    slug: "my-hye-book",
    title: "My Hye Book Series: Animals",
    tagline: "An Armenian alphabet & first-words book for little hearts.",
    ageRange: "Ages 1–12",
    price: "$22.99",
    cover: "/images/book-cover.jpg",
    images: [
      { src: "/images/book-cover.jpg", alt: "Front cover of My Hye Book Series: Animals" },
      { src: "/images/example-page.jpg", alt: "Sample interior spread" },
      { src: "/images/book-back.jpg", alt: "Back cover" },
      { src: "/images/book-size.jpg", alt: "Book size reference" },
    ],
    amazonUrl: "https://www.amazon.com/My-Hye-Book-Amaras-Group/dp/B0D5MQ974V/ref=sr_1_1?crid=1XAP4OOPRRXJM&dib=eyJ2IjoiMSJ9.kf2JbWb18eLG5nCq3YxqAdkyrWUmSWr9MwaRven1jyeZjXcwdnPa-3Y6FW7T_H6Q4ck3jPptozIFX2lq287HPeAAWTJyW9idmKxIIFSxmJU.GFFbIc35vwFR1A2mnB5QLM7n4OzwaD1z3ACdD3oiwkY&dib_tag=se&keywords=my+hye+book+series&qid=1729818516&sprefix=my+hye+book+sries%2Caps%2C98&sr=8-1",
    description: "'My Hye Book: Animals' is a warm, colorful introduction to everyday Armenian words. Each page features each word in three ways: Armenian script, English transliteration, and English — so parents of any fluency level can teach their child with confidence. With 84 unique words across 14 pages, every spread is designed to make Armenian feel natural and fun.",
    highlights: [
      "Teaches specific, everyday Armenian words — not just common substitutes",
      "Written in Armenian script, English transliteration, and English",
      "Bright, kid-friendly photographs",
      "Large, sturdy board book designed for tiny hands",
    ],
    details: [
      { label: "Format", value: "Board Book" },
      { label: "Pages", value: "14" },
      { label: "Language", value: "Armenian • English" },
      { label: "Reading age", value: "1 – 12 years" },
    ],
  },
  {
    slug: "plants-and-garden",
    title: "My Hye Book Series: Plants & Garden",
    tagline: "An Armenian first-words book for little nature lovers.",
    ageRange: "Ages 1–12",
    price: "$22.99",
    cover: "/images/plants_front_cover.jpg",
    images: [
      { src: "/images/plants_front_cover.jpg", alt: "Front cover of My Hye Book Series: Plants & Garden" },
      { src: "/images/plants_spread_herbs.jpg", alt: "Sample interior spread" },
      { src: "/images/plants_back_cover.jpg", alt: "Back cover" },
      { src: "/images/plants_front_cover_hands.png", alt: "Book size reference" },
    ],
    amazonUrl: null,
    description: "'My Hye Book: Plants & Garden' is a warm, colorful introduction to everyday Armenian words. Each page features each word in three ways: Armenian script, English transliteration, and English — so parents of any fluency level can teach their child with confidence. With 84 unique words across 14 pages, every spread is designed to make Armenian feel natural and fun.",
    highlights: [
      "Teaches specific, everyday Armenian words — not just common substitutes",
      "Written in Armenian script, English transliteration, and English",
      "Bright, kid-friendly photographs",
      "Large, sturdy board book designed for tiny hands",
    ],
    details: [
      { label: "Format", value: "Board Book" },
      { label: "Pages", value: "14" },
      { label: "Language", value: "Armenian • English" },
      { label: "Reading age", value: "1 – 12 years" },
    ],
  },
  {
    slug: "in-the-home",
    title: "My Hye Book Series: In the Home",
    tagline: "An Armenian first-words book for curious little minds.",
    ageRange: "Ages 1–12",
    price: "$22.99",
    cover: "/images/home_front_cover.jpg",
    images: [
      { src: "/images/home_front_cover.jpg", alt: "Front cover of My Hye Book Series: In the Home" },
      { src: "/images/home_spread_16_17.jpg", alt: "Sample interior spread" },
      { src: "/images/home_back_cover.jpg", alt: "Back cover" },
      { src: "/images/front_cover_hands.png", alt: "Book size reference" },
    ],
    amazonUrl: null,
    description: "'My Hye Book: In the Home' is a warm, colorful introduction to everyday Armenian words. Each page features each word in three ways: Armenian script, English transliteration, and English — so parents of any fluency level can teach their child with confidence. With 84 unique words across 14 pages, every spread is designed to make Armenian feel natural and fun.",
    highlights: [
      "Teaches specific, everyday Armenian words — not just common substitutes",
      "Written in Armenian script, English transliteration, and English",
      "Bright, kid-friendly photographs",
      "Large, sturdy board book designed for tiny hands",
    ],
    details: [
      { label: "Format", value: "Board Book" },
      { label: "Pages", value: "14" },
      { label: "Language", value: "Armenian • English" },
      { label: "Reading age", value: "1 – 12 years" },
    ],
  },
];

export function findBook(slug) {
  return books.find((b) => b.slug === slug);
}
