export type SeedUser = {
  username: string;
  password: string;
  role: "admin" | "store";
  storeNumber?: string;
  displayName?: string;
};

export const SEED_USERS: SeedUser[] = [
  { username: "JaretF", password: "OraclePOS2026!", role: "admin", displayName: "Jaret Foth" },
  { username: "KhalilK", password: "OraclePOS2026!", role: "admin", displayName: "Khalil K." },
  { username: "KayleighG", password: "OraclePOS2026!", role: "admin", displayName: "Kayleigh G." },
  { username: "2256", password: "Burger.2256", role: "store", storeNumber: "2256", displayName: "Store 2256" },
  { username: "2639", password: "Burger.2639", role: "store", storeNumber: "2639", displayName: "Store 2639" },
  { username: "2983", password: "Burger.2983", role: "store", storeNumber: "2983", displayName: "Store 2983" },
  { username: "2721", password: "Burger.2721", role: "store", storeNumber: "2721", displayName: "Store 2721" },
  { username: "2806", password: "Burger.2806", role: "store", storeNumber: "2806", displayName: "Store 2806" },
  { username: "2596", password: "Burger.2596", role: "store", storeNumber: "2596", displayName: "Store 2596" },
];
