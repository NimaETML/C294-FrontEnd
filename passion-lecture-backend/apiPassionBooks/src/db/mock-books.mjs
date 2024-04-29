let books = [
  {
    id: 1,
    title: "Illuminate apparition",
    number_of_pages: 150,
    excerpt:
      "https://lien/relatif/vers/un/ficeeehier/pdf/d_une/page/de/l_ouvrageretretre",
    summary:
      "Ce livre écrit par John Doe, décrit l'histoire d'un jeune homme...",
    writer: "John Doe",
    publisher: "Sushi Productions",
    year_of_publication: "02-02-2024",
    avg_rating: 1,
    comments: "J'ai rien compris",
    book_cover: "https://affweichage/couverturRWhrtue",
    fkWriter: 1,
    fkCategory: 1,
  },
  {
    id: 2,
    title: "Illuminate desapparition",
    number_of_pages: 152,
    excerpt:
      "https://lien/relatif/vers/un/fichier/eepdf/d_une/page/de/l_ouvragertetert",
    summary:
      "Ce livre écrit par John Doe, décrit l'histoire d'une jeune femme...",
    writer: "John Doe",
    publisher: "Sushi Productions",
    year_of_publication: "02-02-2025",
    comments: "Wow",
    book_cover: "https://affichagwerwee/couvertureuearZE",
    fkWriter: 2,
    fkCategory: 2,
    fkAddedBy: 1,
  },
  {
    id: 3,
    title: "Book 3",
    number_of_pages: 153,
    excerpt:
      "https://lien/relatif/vers/un/fichier/eepdf/d_une/page/de/l_ouvrageertret",
    summary: "Summary of book 3...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2026",
    comments: "Comment 0",
    book_cover: "https://affichwerwerage/couvertureXYTUE",
    fkWriter: 2,
    fkCategory: 3,
    fkAddedBy: 2,
  },
  {
    id: 4,
    title: "Book 4",
    number_of_pages: 154,
    excerpt:
      "https://lien/relatif/vers/un/ficeheeier/pdf/d_une/page/de/l_ouvragetertre",
    summary: "Summary of book 4...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2027",
    comments: "Comment 0",
    book_cover: "https:/werwe/affichage/couverturejsrsre",
    fkWriter: 3,
    fkCategory: 2,
    fkAddedBy: 1,
  },
  {
    id: 5,
    title: "Book 5",
    number_of_pages: 155,
    excerpt:
      "https://lien/relatif/vers/un/fichier/peedf/d_une/pagee/de/l_ouvrageertert",
    summary: "Summary of book 5...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2028",
    comments: "Comment 0",
    book_cover: "https://weraffichage/couvertureasdxvch",
    fkWriter: 2,
    fkCategory: 2,
  },
  {
    id: 6,
    title: "Book 6",
    number_of_pages: 156,
    excerpt:
      "https://lien/relaeetif/versee/un/fichier/pdf/d_une/page/de/l_ouvrageeeertreeet",
    summary: "Summary of book 6...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2029",
    comments: "Comment 0",
    book_cover: "https://afficherwerage/couvertureuirg",
    fkWriter: 2,
    fkCategory: 3,
    fkAddedBy: 3,
  },
  {
    id: 7,
    title: "Book 7",
    number_of_pages: 157,
    excerpt:
      "https://lien/relatif/vers/eun/fichier/pdf/d_unee/page/de/l_oeeuvrageretertereeee",
    summary: "Summary of book 7...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2030",
    comments: "Comment 0",
    book_cover: "https://affichagwerwerwere/couvertureJTZt",
    fkWriter: 3,
    fkCategory: 5,
  },
  {
    id: 8,
    title: "Book 8",
    number_of_pages: 158,
    excerpt:
      "https://lien/relaetif/veres/un/fichier/pdf/d_une/eepage/de/l_ouvrage",
    summary: "Summary of book 8...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2031",
    comments: "Comment 0",
    book_cover: "https://afficwerewrhage/couvertureatWERJFSGH",
    fkWriter: 3,
    fkCategory: 4,
    fkAddedBy: 1,
  },
  {
    id: 9,
    title: "Book 9",
    number_of_pages: 159,
    excerpt: "https://lien/relatif/vers/un/fichieeer/pdf/d_une/paeege/de/e",
    summary: "Summary of book 9...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2032",
    comments: "Comment 0",
    book_cover: "httpetstes://affiwerwerceetthage/ctetouverture",
    fkWriter: 4,
    fkCategory: 3,
    fkAddedBy: 4,
  },
  {
    id: 10,
    title: "Book 10",
    number_of_pages: 160,
    excerpt:
      "https://lieen/eeeerelatif/e/un/fichier/pdf/d_une/page/de/l_ouvrage",
    summary: "Summary of book 10...",
    writer: "Author Name",
    publisher: "Publisher Name",
    year_of_publication: "02-02-2033",
    comments: "Comment 0",
    book_cover: "hsttps://afficewrwereheage/eeGeEEe",
    fkWriter: 5,
    fkCategory: 5,
    fkAddedBy: 5,
  },
];

const getComments = (bookId) => {
  const book = books.find((book) => book.id == bookId);
  return book?.Comments;
};

const getNotes = (bookId) => {
  const book = books.find((book) => book.id == bookId);
  return book?.avg_rating;
};

const getBook = (bookId) => {
  return books.find((book) => book.id == bookId);
};

const updateBook = (bookId, updatedBook) => {
  books = books.map((book) => (book.id == bookId ? updatedBook : book));
};

const removeBook = (bookId) => {
  books = books.filter((book) => book.id != bookId);
};

const getUniqueId = (books) => {
  const bookIds = books.map((book) => book.id);
  const maxId = bookIds.reduce((a, b) => Math.max(a, b));
  const uniqueId = maxId + 1;
  return uniqueId;
};

export {
  books,
  getUniqueId,
  getBook,
  updateBook,
  removeBook,
  getComments,
  getNotes,
};
