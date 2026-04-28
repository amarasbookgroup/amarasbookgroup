export const books = [
  {
    slug: "my-hye-book",
    title: "My Hye Book Series: Animals",
    tagline: "An Armenian alphabet & first-words book for little hearts.",
    ageRange: "Ages 1\u20137",
    price: "$22.99",
    cover: "/images/book-cover.jpg",
    images: [
      { src: "/images/book-cover.jpg", alt: "Front cover of My Hye Book Series: Animals" },
      { src: "/images/example-page.jpg", alt: "Sample interior spread" },
      { src: "/images/book-back.jpg", alt: "Back cover" },
      { src: "/images/book-size.jpg", alt: "Book size reference" },
    ],
    amazonUrl:
      "https://www.amazon.com/My-Hye-Book-Amaras-Group/dp/B0D5MQ974V/ref=sr_1_1?crid=1XAP4OOPRRXJM&dib=eyJ2IjoiMSJ9.kf2JbWb18eLG5nCq3YxqAdkyrWUmSWr9MwaRven1jyeZjXcwdnPa-3Y6FW7T_H6Q4ck3jPptozIFX2lq287HPeAAWTJyW9idmKxIIFSxmJU.GFFbIc35vwFR1A2mnB5QLM7n4OzwaD1z3ACdD3oiwkY&dib_tag=se&keywords=my+hye+book+series&qid=1729818516&sprefix=my+hye+book+sries%2Caps%2C98&sr=8-1",
    description:
      "My Hye Book is a warm, colorful introduction to the Armenian alphabet and the everyday words that fill a child's world. Each page pairs a letter with bright illustrations and bilingual labels, so little readers can recognize, hear, and say their first Armenian words with confidence.",
    highlights: [
      "All 39 letters of the Eastern Armenian alphabet",
      "Bilingual labels in Armenian and English",
      "Bright, kid-friendly illustrations",
      "Sturdy pages designed for tiny hands",
    ],
    details: [
      { label: "Format", value: "Hardcover" },
      { label: "Pages", value: "48" },
      { label: "Language", value: "Armenian \u2022 English" },
      { label: "Reading age", value: "1 \u2013 7 years" },
    ],
  },
];

export function findBook(slug) {
  return books.find((b) => b.slug === slug);
}
