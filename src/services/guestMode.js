const STORAGE_KEYS = {
  token: "token",
  user: "user",
  demoList: "movilist.demoList",
  demoTaste: "movilist.demoTaste",
  demoLoggedOut: "movilist.demoLoggedOut",
};

const GUEST_TOKEN = "guest-token";

const GUEST_USER = {
  userName: "guest",
  email: "guest",
  isGuest: true,
};

const GUEST_LIST = [
  {
    id: "guest-1",
    mediaId: "278",
    type: "movie",
    image: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    title: "The Shawshank Redemption",
    releaseDate: "1994-09-23",
    rating: "9.3",
    userRating: "10",
    status: "completed",
  },
  {
    id: "guest-2",
    mediaId: "155",
    type: "movie",
    image: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    title: "The Dark Knight",
    releaseDate: "2008-07-18",
    rating: "9.0",
    userRating: "9",
    status: "completed",
  },
  {
    id: "guest-3",
    mediaId: "27205",
    type: "movie",
    image: "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    title: "Inception",
    releaseDate: "2010-07-16",
    rating: "8.8",
    userRating: "0",
    status: "watching",
  },
  {
    id: "guest-4",
    mediaId: "157336",
    type: "movie",
    image: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    title: "Interstellar",
    releaseDate: "2014-11-07",
    rating: "8.7",
    userRating: "0",
    status: "planning",
  },
  {
    id: "guest-5",
    mediaId: "680",
    type: "movie",
    image: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    title: "Pulp Fiction",
    releaseDate: "1994-10-14",
    rating: "8.9",
    userRating: "8",
    status: "completed",
  },
  {
    id: "guest-6",
    mediaId: "603",
    type: "movie",
    image: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    title: "The Matrix",
    releaseDate: "1999-03-31",
    rating: "8.7",
    userRating: "0",
    status: "watching",
  },
  {
    id: "guest-7",
    mediaId: "550",
    type: "movie",
    image: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    title: "Fight Club",
    releaseDate: "1999-10-15",
    rating: "8.8",
    userRating: "0",
    status: "planning",
  },
];

const DEFAULT_TASTE = {
  compatibility: 74,
  reviews: 3,
};

const isBrowser = typeof window !== "undefined";

const readJSON = (key, fallback) => {
  if (!isBrowser) return fallback;

  const rawValue = localStorage.getItem(key);
  if (!rawValue) return fallback;

  try {
    return JSON.parse(rawValue);
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const isGuestModeEnabled = () =>
  import.meta.env.VITE_GUEST_MODE === "true" ||
  !import.meta.env.VITE_BACKEND_URL;

export const isGuestCredentials = (data = {}) => {
  const email = String(data.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(data.password ?? "").trim();

  return email === "guest" && password === "guest";
};

export const isGuestToken = (token) => token === GUEST_TOKEN;

export const isGuestUser = (user) => {
  if (!user) return false;

  return user.isGuest || user.userName === "guest" || user.email === "guest";
};

export const getGuestUser = () => GUEST_USER;

export const getGuestToken = () => GUEST_TOKEN;

export const getGuestLoginMessage = () =>
  "Backend login is disabled in this deployment. Use guest / guest to continue.";

export const getGuestSignupMessage = () =>
  "Signup is disabled in this deployment. Please use guest / guest on the login screen.";

export const seedGuestState = () => {
  if (!isBrowser || !isGuestModeEnabled()) return;

  if (!localStorage.getItem(STORAGE_KEYS.demoList)) {
    writeJSON(STORAGE_KEYS.demoList, GUEST_LIST);
  }

  if (!localStorage.getItem(STORAGE_KEYS.demoTaste)) {
    writeJSON(STORAGE_KEYS.demoTaste, DEFAULT_TASTE);
  }
};

export const initializeGuestSession = () => {
  if (!isBrowser || !isGuestModeEnabled()) return;

  seedGuestState();

  const token = localStorage.getItem(STORAGE_KEYS.token);
  const user = localStorage.getItem(STORAGE_KEYS.user);
  const loggedOut = localStorage.getItem(STORAGE_KEYS.demoLoggedOut) === "true";

  if (!token && !user && !loggedOut) {
    activateGuestSession();
  }
};

export const activateGuestSession = () => {
  if (!isBrowser) return;

  seedGuestState();

  localStorage.setItem(STORAGE_KEYS.token, GUEST_TOKEN);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(GUEST_USER));
  localStorage.setItem(STORAGE_KEYS.demoLoggedOut, "false");
};

export const markGuestLoggedOut = () => {
  if (!isBrowser) return;

  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.setItem(STORAGE_KEYS.demoLoggedOut, "true");
};

export const resetGuestLogoutState = () => {
  if (!isBrowser) return;

  localStorage.setItem(STORAGE_KEYS.demoLoggedOut, "false");
};

export const readGuestList = () => readJSON(STORAGE_KEYS.demoList, []);

export const writeGuestList = (list) => {
  writeJSON(STORAGE_KEYS.demoList, list);
};

export const readGuestTaste = () =>
  readJSON(STORAGE_KEYS.demoTaste, DEFAULT_TASTE);

export const writeGuestTaste = (taste) => {
  writeJSON(STORAGE_KEYS.demoTaste, taste);
};

export const resolveGuestListItem = (data, existingItem) => ({
  id: existingItem?.id ?? `guest-${Date.now()}`,
  mediaId: data.mediaId,
  type: data.type,
  image: data.image,
  title: data.title,
  releaseDate: data.releaseDate,
  rating: data.rating,
  userRating: existingItem?.userRating ?? data.userRating ?? "0",
  status: data.status,
});
