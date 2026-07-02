import { supabase } from "../lib/supabaseClient";

// convert TMDB movie object into DB format (movies table row)
function movieToRow(movie) {
  return {
    id: movie.id,
    title: movie.title ?? null,
    poster_path: movie.poster_path ?? null,
    overview: movie.overview ?? null,
    release_date: movie.release_date || null,
    genre_ids: movie.genre_ids ?? null,
  };
}

// combine movie row + user-specific data into app-ready object
function rowToMovie(movieRow, userRow) {
  const base = {
    id: movieRow.id,
    title: movieRow.title,
    poster_path: movieRow.poster_path,
    overview: movieRow.overview,
    release_date: movieRow.release_date ?? "",
    genre_ids: movieRow.genre_ids ?? [],
  };

  if (userRow.status === "watched") {
    return {
      ...base,
      dateWatched: userRow.date_watched,
      notes: userRow.notes ?? "",
      userRating: userRow.user_rating,
    };
  }

  return base;
}

// ensure movie exists in shared movies table before linking it to a user
async function upsertMovie(movie) {
  const { error } = await supabase
    .from("movies")
    .upsert(movieToRow(movie), { onConflict: "id" });

  if (error) throw error;
}

// load user watchlist, watched movies, and categories
export async function loadState(userId) {
  const [moviesRes, catsRes] = await Promise.all([
    supabase
      .from("user_movies")
      .select("status, date_watched, notes, user_rating, movies(*), categories(name)")
      .eq("user_id", userId)
      .order("added_at", { ascending: false }),

    supabase
      .from("categories")
      .select("name")
      .eq("user_id", userId)
      .order("name"),
  ]);

  if (moviesRes.error) throw moviesRes.error;
  if (catsRes.error) throw catsRes.error;

  const watchlist = [];
  const watched = [];
  const movieCategories = {};

  for (const row of moviesRes.data) {
    const movie = rowToMovie(row.movies, row);

    if (row.status === "watched") watched.push(movie);
    else watchlist.push(movie);

    movieCategories[row.movies.id] = row.categories?.name ?? "Uncategorized";
  }

  return {
    watchlist,
    watched,
    categories: ["Uncategorized", ...catsRes.data.map((c) => c.name)],
    movieCategories,
  };
}

// add movie to watchlist
export async function addToWatchlist(userId, movie) {
  await upsertMovie(movie);

  const { error } = await supabase.from("user_movies").upsert(
    { user_id: userId, movie_id: movie.id, status: "watchlist" },
    { onConflict: "user_id,movie_id" }
  );

  if (error) throw error;
}

// add movie to watched list
export async function addToWatched(userId, movie) {
  await upsertMovie(movie);

  const { error } = await supabase.from("user_movies").upsert(
    {
      user_id: userId,
      movie_id: movie.id,
      status: "watched",
      date_watched: movie.dateWatched ?? new Date().toISOString(),
    },
    { onConflict: "user_id,movie_id" }
  );

  if (error) throw error;
}

// move movie back to watchlist
export async function moveToWatchlist(userId, movieId) {
  const { error } = await supabase
    .from("user_movies")
    .update({ status: "watchlist" })
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

// remove movie from user's list
export async function removeMovie(userId, movieId) {
  const { error } = await supabase
    .from("user_movies")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

// update notes for a watched movie
export async function setNotes(userId, movieId, notes) {
  const { error } = await supabase
    .from("user_movies")
    .update({ notes })
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

// update rating for a watched movie
export async function setRating(userId, movieId, rating) {
  const { error } = await supabase
    .from("user_movies")
    .update({ user_rating: rating })
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

// update watched date for a movie
export async function setDateWatched(userId, movieId, date) {
  const { error } = await supabase
    .from("user_movies")
    .update({ date_watched: date })
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

// create a new category for a user
export async function addCategory(userId, name) {
  const { error } = await supabase
    .from("categories")
    .insert({ user_id: userId, name });

  if (error) throw error;
}

// delete a category (movies automatically default to Uncategorized)
export async function deleteCategory(userId, name) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("user_id", userId)
    .eq("name", name);

  if (error) throw error;
}

// assign a category to a movie (or clear if Uncategorized)
export async function setMovieCategory(userId, movieId, categoryName) {
  let categoryId = null;

  if (categoryName && categoryName !== "Uncategorized") {
    const { data, error } = await supabase
      .from("categories")
      .select("id")
      .eq("user_id", userId)
      .eq("name", categoryName)
      .single();

    if (error) throw error;
    categoryId = data.id;
  }

  const { error } = await supabase
    .from("user_movies")
    .update({ category_id: categoryId })
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}