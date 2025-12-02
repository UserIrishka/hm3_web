export async function searchBooks(query, type = "title", limit = 20) {
  if (!query || !query.trim()) return [];

  const baseURL = "https://openlibrary.org/search.json";
  let url = "";

  // type: "title" или "author"
  if (type === "author") {
    url = `${baseURL}?author=${encodeURIComponent(query)}&limit=${limit}`;
  } else {
    url = `${baseURL}?title=${encodeURIComponent(query)}&limit=${limit}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка при загрузке данных с Open Library");

    const data = await res.json();

    return data.docs.slice(0, limit).map((book) => ({
      id: book.key,
      title: book.title || "Без названия",
      author: book.author_name
        ? book.author_name.join(", ")
        : "Автор не указан",
      year: book.first_publish_year || "—",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));
  } catch (err) {
    console.error("Books API error:", err);
    return []; // безопасно возвращаем пустой массив
  }
}
