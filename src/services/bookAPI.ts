export interface BookFromAPI {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number | string;
  cover: string | null;
}

export type SearchType = "title" | "author";

export async function searchBooks(
  query: string,
  type: "title" | "author" = "title",
  limit = 20
): Promise<Book[]> {
  if (!query || !query.trim()) return [];

  const baseURL = "https://openlibrary.org/search.json";
  let url = "";

  if (type === "author") {
    url = `${baseURL}?author=${encodeURIComponent(query)}&limit=${limit}`;
  } else {
    url = `${baseURL}?title=${encodeURIComponent(query)}&limit=${limit}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка при загрузке данных с Open Library");

    const data = await res.json();

    let docs: BookFromAPI[] = data.docs ?? [];

    if (type === "author") {
      const q = query.toLowerCase();

      docs = docs.filter((book) => {
        if (!book.author_name) return false;

        return book.author_name.some((a) => {
          const words = a.toLowerCase().split(/\s+/);
          return words.includes(q);
        });
      });
    }

    return docs.slice(0, limit).map((book) => ({
      id: (book.key ?? Math.random().toString(36).slice(2)) as string,
      title: book.title ?? "Без названия",
      author: book.author_name
        ? book.author_name.join(", ")
        : "Автор не указан",
      year: book.first_publish_year ?? "—",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));
  } catch (err) {
    console.error("Books API error:", err);
    return [];
  }
}
