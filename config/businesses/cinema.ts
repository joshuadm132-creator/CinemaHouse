// config/businesses/cinema.ts

import type { Theme } from "../themes";
import { cinemaTheme } from "../themes";

export type CastMember = {
  name: string;
  role: string;
};

export type Movie = {
  id: string;
  title: string;
  rating: string;
  duration: string;
  genres: string[];
  synopsis: string; // short — used on cards
  poster: string;
  backdrop: string;
  showtimes: Showtime[];
  showtimeDates?: string[];

  longSynopsis?: string; // full paragraph for detail page
  trailerId?: string; // YouTube ID, e.g. "dQw4w9WgXcQ"
  releaseDate?: string; // "11 Oct 2025"
  language?: string; // "English"
  director?: string; // "Zach Cregger"
  cast?: CastMember[]; // top 4-6 cast members
};
export type CinemaDate = {
  id: string;
  label: string;
  date: string;
  active?: boolean;
};


export type PromoCard = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge?: string;
};
export type ComingSoonMovie = {
  id: string;
  title: string;
  rating?: string;
  duration?: string;
  genres: string[];
  synopsis: string;
  poster: string;
  backdrop: string;
  releaseDate: string; // "5 Dec 2025"
  trailerId?: string;
};
// config/businesses/cinema.ts — additions

export type Screen = {
  id: string;
  name: string;
  format: "2D" | "3D" | "LUX" | "IMAX" | "VIP";
  rows: number;
  seatsPerRow: number;
  aisleAfterCol?: number[];
  premiumRows?: string[];
  unavailableSeats?: string[];
};

export type Showtime = {
  time: string;
  type: "2D" | "3D" | "LUX" | "IMAX" | "VIP";
  price?: string;
  soldOut?: boolean;
  screenId?: string;
};
// --- Config ---

export const Cinema = {
  name: "Road House Cinema",
  logo: "Road House",
  logoSubtitle: "C I N E M A",
  tagline: "Big screen. Big sound. Big night.",
  description:
    "Zimbabwe's home of blockbuster cinema. Experience the latest releases in 2D, 3D, LUX, and IMAX.",
  location: "Sam Levy's Village, Borrowdale, Harare",

  theme: cinemaTheme as Theme,

  contact: {
    phone: "+263 242 885 000",
    mobile: "+263 772 000 000",
    email: "info@roadhousecinema.co.zw",
    address: "Sam Levy's Village, Shop 18, Sam Levy's Road, Borrowdale, Harare",
    whatsapp: "263772000000",
    socials: [],
    form: {
      title: "Get in touch",
      subtitle:
        "Questions about a booking or a private event? Send us a message.",
      fields: {
        name: "Your name",
        email: "Email",
        phone: "Phone (optional)",
        message: "Message",
      },
      submitLabel: "Send message",
      successMessage:
        "Thanks — we've received your message. We'll get back to you shortly.",
    },
  },

  navigation: [
    { label: "Now Showing", href: "/" },
    { label: "Coming Soon", href: "/coming-soon" },
    // { label: "Newsletter", href: "/newsletter" },
    { label: "contact", href: "/contact" },
    // { label: "Locations", href: "/locations" },
  ],

  // --- HERO ---
  hero: {
    featuredMovieId: "chronos-drift",
    badge: "Now Showing",
    ctaLabel: "Book Tickets",
  },

  // --- NOW SHOWING ---
  nowShowing: {
    title: "Times & Tickets",
    dates: [
      { id: "2025-10-11", label: "SAT", date: "11 OCT" },
      { id: "2025-10-12", label: "SUN", date: "12 OCT" },
      { id: "2025-10-13", label: "MON", date: "13 OCT" },
      { id: "2025-10-14", label: "TUE", date: "14 OCT", active: true },
      { id: "2025-10-15", label: "WED", date: "15 OCT" },
      { id: "2025-10-16", label: "THU", date: "16 OCT" },
      { id: "2025-10-17", label: "FRI", date: "17 OCT" },
      { id: "2025-10-19", label: "SUN", date: "19 OCT" },
      { id: "2025-10-20", label: "MON", date: "20 OCT" },
      { id: "2025-10-21", label: "TUE", date: "21 OCT" },
    ] as CinemaDate[],
    movies: [
  {
    id: "verity",
    title: "Verity",
    rating: "TBC",
    duration: "129 minutes",
    genres: ["Psychological Thriller"],
    synopsis: "Adapted from Colleen Hoover's best-selling novel...",
    longSynopsis:
      "Lowen Ashleigh is a struggling writer on the brink of financial ruin when she accepts the job offer of a lifetime. Jeremy Crawford, husband of bestselling author Verity Crawford, has hired Lowen to complete the remaining books in a successful series his injured wife is unable to finish. Upon arriving at the Crawford home, Lowen discovers an unfinished manuscript — an autobiographical tell-all that reveals dark secrets the family has kept hidden.",
    poster: "https://placehold.co/300x450/171717/d4af37?text=Verity",
    backdrop: "https://placehold.co/1920x1080/0a0a0a/f5f5f5?text=Verity",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "11 Oct 2025",
    language: "English",
    director: "Michael Showalter",
    cast: [
      { name: "Anne Hathaway", role: "Verity Crawford" },
      { name: "Dakota Johnson", role: "Lowen Ashleigh" },
      { name: "Josh Hartnett", role: "Jeremy Crawford" },
    ],
    showtimeDates: [
        "2025-10-14",
        "2025-10-15",
        "2025-10-16",
        "2025-10-17",
      ],
    showtimes: [
      { time: "5:00 PM", type: "2D", screenId: "screen-1", price: "$12" },
      { time: "7:30 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "chronos-drift",
    title: "Chronos Drift",
    rating: "PG-13",
    duration: "134 minutes",
    genres: ["Sci-Fi", "Action", "Adventure"],
    synopsis:
      "A rogue time-navigator must breach an illegal temporal rift to save his stranded daughter before history rewrites itself.",
    longSynopsis:
      "In the late 22nd century, time navigation is strictly regulated by the Temporal Oversight Agency. Captain Kaelen Cross, a former agency navigator turned deep-space scavenger, discovers that his daughter didn't perish in a deep-space accident—she was stranded in a decaying temporal pocket created by a rogue reactor test. Risking a lifetime in stasis, Kaelen hijacks an experimental vessel to navigate the dangerous, unstable timeline before it collapses permanently.",
    poster: "https://placehold.co/300x450/0b132b/64dfdf?text=Chronos+Drift",
    backdrop: "https://placehold.co/1920x1080/050814/72efdd?text=Chronos+Drift",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "14 Nov 2026",
    language: "English",
    director: "Denis Villeneuve",
    cast: [
      { name: "John David Washington", role: "Captain Kaelen Cross" },
      { name: "Gemma Chan", role: "Commander Sarah Vance" },
      { name: "Storm Reid", role: "Maya Cross" },
    ],
    showtimeDates: [
        "2025-10-12",
        "2025-10-15",
        "2025-10-17",
        "2025-10-19",
      ],
    showtimes: [
      { time: "2:15 PM", type: "IMAX", screenId: "screen-imax", price: "$20" },
      { time: "6:00 PM", type: "3D", screenId: "screen-3d", price: "$15" },
      { time: "9:15 PM", type: "IMAX 3D", screenId: "screen-imax", price: "$22" },
    ],
  },
  {
    id: "whispers-of-stone",
    title: "Whispers of Stone",
    rating: "R",
    duration: "118 minutes",
    genres: ["Supernatural Horror", "Mystery"],
    synopsis:
      "An restoration architect unravels a centuries-old curse inside a remote Scottish monastery.",
    longSynopsis:
      "Renowned architectural restorer Clara Finch travels to the misty Scottish Highlands to evaluate the crumbling St. Jude Monastery before its conversion into a heritage resort. As she peels back centuries of lime mortar and hidden chambers, she begins hearing faint whispers resonating from the stone walls itself. Uncovering a series of grisly 17th-century secrets, Clara must distinguish between environmental paranoia and a vengeful spirit trapped within the masonry.",
    poster:
      "https://placehold.co/300x450/1c1917/78716c?text=Whispers+of+Stone",
    backdrop:
      "https://placehold.co/1920x1080/0c0a09/e7e5e4?text=Whispers+of+Stone",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "23 Oct 2026",
    language: "English",
    director: "Robert Eggers",
    cast: [
      { name: "Florence Pugh", role: "Clara Finch" },
      { name: "Iwan Rheon", role: "Father Thomas" },
      { name: "David Thewlis", role: "Alastair MacIntyre" },
    ],
    showtimeDates: [
        "2025-10-11",
        "2025-10-19",
        "2025-10-21",
        "2025-10-23",
      ],
    showtimes: [
      { time: "7:00 PM", type: "2D", screenId: "screen-2", price: "$12" },
      { time: "9:45 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "the-neon-symphony",
    title: "The Neon Symphony",
    rating: "PG-13",
    duration: "112 minutes",
    genres: ["Cyberpunk", "Musical Drama"],
    synopsis:
      "In a rain-drenched megacity, an underground synth-composer leads an sonic rebellion against corporate music monopolies.",
    longSynopsis:
      "Set in Neo-Chicago during the year 2089, synthetic music algorithms dominate every radio frequency and neural feed. Jax, a streetwise audio engineer using discarded analog equipment, accidentally crafts a chord progression capable of bypassing corporate mood-control implants. Overnight, his underground illegal radio broadcasts turn into the anthem of a citywide counter-culture movement, forcing Jax to choose between artistic integrity and survival.",
    poster: "https://placehold.co/300x450/240046/ff007f?text=Neon+Symphony",
    backdrop:
      "https://placehold.co/1920x1080/10002b/3a0ca3?text=Neon+Symphony",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "05 Dec 2026",
    language: "English",
    director: "Damien Chazelle",
    cast: [
      { name: "Timothée Chalamet", role: "Jax Thorne" },
      { name: "Zendaya", role: "Roxie" },
      { name: "Rami Malek", role: "Director Vane" },
    ],
    showtimeDates: [
        "2025-10-14",
        "2025-10-15",
        "2025-10-16",
        "2025-10-17",
      ],
    showtimes: [
      { time: "4:30 PM", type: "2D", screenId: "screen-1", price: "$12" },
      { time: "8:00 PM", type: "4DX", screenId: "screen-4dx", price: "$21" },
      { time: "10:30 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "starlight-bakery",
    title: "The Starlight Bakery",
    rating: "PG",
    duration: "105 minutes",
    genres: ["Romantic Comedy", "Feel-Good"],
    synopsis:
      "Two rival pastry chefs in a small coastal town are forced to team up for an international baking championship.",
    longSynopsis:
      "When energetic artisan baker Chloe opens her traditional French pastry shop directly across the street from Julian’s ultra-modern molecular gastronomy lab, sparks fly in all the wrong ways. However, when a massive real estate developer threatens to buy out their entire seaside wharf, the fiercely competitive duo must combine traditional techniques and futuristic flavor science to win the $500,000 Global Pastry Cup.",
    poster:
      "https://placehold.co/300x450/ffe5ec/ffb703?text=Starlight+Bakery",
    backdrop:
      "https://placehold.co/1920x1080/fff0f3/fb8500?text=Starlight+Bakery",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "14 Feb 2027",
    language: "English",
    director: "Nancy Meyers",
    cast: [
      { name: "Lily Collins", role: "Chloe Bennett" },
      { name: "Nicholas Hoult", role: "Julian Vance" },
      { name: "Stanley Tucci", role: "Chef Chef Pierre" },
    ],
    showtimeDates: [
        "2025-10-15",
        "2025-10-16",
        "2025-10-17",
        "2025-10-19",
      ],
    showtimes: [
      { time: "1:00 PM", type: "2D", screenId: "screen-1", price: "$10" },
      { time: "3:45 PM", type: "2D", screenId: "screen-2", price: "$10" },
      { time: "6:15 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "silent-horizon",
    title: "Silent Horizon",
    rating: "PG-13",
    duration: "142 minutes",
    genres: ["Historical Drama", "War"],
    synopsis:
      "A solitary radio operator on a sub-Antarctic outpost must maintain critical alliance communications during WWII.",
    longSynopsis:
      "In the winter of 1942, British meteorologist Edward Miller is stationed on a windswept island in the South South Indian Ocean. His sole job is to relay secret weather reports vital for Allied shipping convoys. Isolation, harsh polar conditions, and broken communications drive Edward to the brink of madness—until he intercepts an unidentified distress signal from a damaged enemy submarine trapped in the pack ice.",
    poster:
      "https://placehold.co/300x450/1e293b/94a3b8?text=Silent+Horizon",
    backdrop:
      "https://placehold.co/1920x1080/0f172a/cbd5e1?text=Silent+Horizon",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "20 Nov 2026",
    language: "English",
    director: "Sam Mendes",
    cast: [
      { name: "George MacKay", role: "Edward Miller" },
      { name: "Daniel Brühl", role: "Commander Erich Lang" },
      { name: "Mark Rylance", role: "Captain Harris" },
    ],
    showtimeDates: [
        "2025-11-02",
        "2025-11-04",
        "2025-11-07",
        "2025-11-08",
      ],
    showtimes: [
      { time: "3:00 PM", type: "2D", screenId: "screen-2", price: "$12" },
      { time: "6:45 PM", type: "IMAX", screenId: "screen-imax", price: "$20" },
    ],
  },
  {
    id: "the-quantum-gambit",
    title: "The Quantum Gambit",
    rating: "PG-13",
    duration: "126 minutes",
    genres: ["Heist", "Action Comedy"],
    synopsis:
      "A team of retired card sharps and quantum physicists team up to rob a casino operating in multiple dimensions.",
    longSynopsis:
      "The Monte Carlo Infinity is the world’s first inter-dimensional resort, where high rollers gamble across parallel realities. When master illusionist Marcus Kane is framed for a multiversal fraud scheme, he recruits a eccentric team of retired card cheats and theoretical physicists to execute the ultimate payback: pulling off a simultaneous chip heist across three shifting dimensions at once.",
    poster:
      "https://placehold.co/300x450/065f46/34d399?text=Quantum+Gambit",
    backdrop:
      "https://placehold.co/1920x1080/022c22/10b981?text=Quantum+Gambit",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "18 Jun 2027",
    language: "English",
    director: "Edgar Wright",
    cast: [
      { name: "Pedro Pascal", role: "Marcus Kane" },
      { name: "Awkwafina", role: "Dr. Penny Chen" },
      { name: "Jeff Goldblum", role: "The Casino Proprietor" },
    ],
    showtimeDates: [
        "2025-11-09",
        "2025-10-13",
        "2025-11-26",
        "2025-11-27",
      ],
    showtimes: [
      { time: "2:00 PM", type: "2D", screenId: "screen-1", price: "$12" },
      { time: "5:30 PM", type: "4DX", screenId: "screen-4dx", price: "$21" },
      { time: "8:45 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "shadows-over-savannah",
    title: "Shadows Over Savannah",
    rating: "R",
    duration: "131 minutes",
    genres: ["Crime", "Neo-Noir"],
    synopsis:
      "A disgraced southern detective uncovers corrupt municipal secrets while searching for a missing heiress.",
    longSynopsis:
      "Drenched in humidity and moss-draped oak trees, Savannah becomes the backdrop for private investigator Ray Vance’s return to active duty. Hired by a prominent southern dynasty to find missing socialite Beatrice Sterling, Vance delves into the city’s underground shipping docks and historic mansions, uncovering a web of political bribery, maritime smuggling, and betrayal that reaches the highest offices in the state.",
    poster:
      "https://placehold.co/300x450/292524/d97706?text=Shadows+Savannah",
    backdrop:
      "https://placehold.co/1920x1080/1c1917/f59e0b?text=Shadows+Savannah",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "15 Jan 2027",
    language: "English",
    director: "David Fincher",
    cast: [
      { name: "Oscar Isaac", role: "Ray Vance" },
      { name: "Margaret Qualley", role: "Beatrice Sterling" },
      { name: "Woody Harrelson", role: "Mayor Arthur Sterling" },
    ],
    showtimeDates: [
        "2025-11-11",
        "2025-11-13",
        "2025-11-16",
        "2025-11-17",
      ],
    showtimes: [
      { time: "4:15 PM", type: "2D", screenId: "screen-1", price: "$12" },
      { time: "7:00 PM", type: "2D", screenId: "screen-2", price: "$12" },
      { time: "9:30 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "bloom-and-decay",
    title: "Bloom & Decay",
    rating: "PG",
    duration: "98 minutes",
    genres: ["Animated", "Fantasy", "Family"],
    synopsis:
      "A young forest guardian and a mechanical golem embark on an journey to restore color to a fading world.",
    longSynopsis:
      "In the enchanted realm of Aethelgard, spring hasn't arrived for fifty years. Pip, a tiny acorn-elf with a knack for mischief, stumbles upon an ancient brass golem buried beneath frozen earth. Together, the unlikely duo sets off across treacherous glaciers and enchanted deserts to find the Sun Crystal, learning that even the smallest lifeform can initiate monumental growth.",
    poster:
      "https://placehold.co/300x450/064e3b/a7f3d0?text=Bloom+and+Decay",
    backdrop:
      "https://placehold.co/1920x1080/022c22/6ee7b7?text=Bloom+and+Decay",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "02 Apr 2027",
    language: "English",
    director: "Hayao Miyazaki",
    cast: [
      { name: "Jacob Tremblay", role: "Pip (voice)" },
      { name: "Ian McKellen", role: "Grom the Golem (voice)" },
      { name: "Cate Blanchett", role: "The Frost Queen (voice)" },
    ],
    showtimeDates: [
        "2025-11-13",
        "2025-11-15",
        "2025-11-17",
        "2025-11-19",
      ],
    showtimes: [
      { time: "11:00 AM", type: "3D", screenId: "screen-3d", price: "$15" },
      { time: "1:30 PM", type: "2D", screenId: "screen-1", price: "$10" },
      { time: "4:00 PM", type: "3D", screenId: "screen-3d", price: "$15" },
    ],
  },
  {
    id: "the-last-sovereign",
    title: "The Last Sovereign",
    rating: "R",
    duration: "155 minutes",
    genres: ["Epic Fantasy", "Action"],
    synopsis:
      "An exiled princess must unite fractured mountain tribes to reclaim her usurped throne.",
    longSynopsis:
      "When King Alden is assassinated by his ambitious general, Princess Lyra flees into the brutal northern mountains. Believed dead, she earns the trust of the wild clans who have resisted royal rule for centuries. As political chaos consumes the kingdom, Lyra leads a coalition of hill tribes and rogue knights back toward the capital in a desperate bid to end tyranny once and for all.",
    poster:
      "https://placehold.co/300x450/450a0a/fca5a5?text=Last+Sovereign",
    backdrop:
      "https://placehold.co/1920x1080/180808/ef4444?text=Last+Sovereign",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "22 Dec 2026",
    language: "English",
    director: "Ridley Scott",
    cast: [
      { name: "Saoirse Ronan", role: "Princess Lyra" },
      { name: "Mads Mikkelsen", role: "General Vane" },
      { name: "Djimon Hounsou", role: "Chief Torak" },
    ],
     showtimeDates: [
        "2025-10-14",
        "2025-10-15",
        "2025-10-13",
        "2025-11-27",
      ],
    showtimes: [
      { time: "1:45 PM", type: "IMAX", screenId: "screen-imax", price: "$20" },
      { time: "5:15 PM", type: "IMAX", screenId: "screen-imax", price: "$20" },
      { time: "8:30 PM", type: "LUX", screenId: "screen-lux", price: "$18" },
    ],
  },
  {
    id: "circuit-breaker",
    title: "Circuit Breaker",
    rating: "PG-13",
    duration: "110 minutes",
    genres: ["Sports", "Action"],
    synopsis:
      "An underdog hover-car mechanic gets an unexpected shot at competing in the dangerous Solar Grand Prix.",
    longSynopsis:
      "Rhea Vance spends her days repairing high-speed anti-gravity vehicles in a dusty scrapyard on the edge of the desert basin. When a star racer crashes during a private test run near her shop, Rhea modifies his wrecked craft using improvised tech parts. Impressed by her raw speed during test runs, the team owner offers her a once-in-a-lifetime spot on the grid for the deadliest race in the solar system.",
    poster:
      "https://placehold.co/300x450/1e1b4b/818cf8?text=Circuit+Breaker",
    backdrop:
      "https://placehold.co/1920x1080/0f172a/6366f1?text=Circuit+Breaker",
    trailerId: "dQw4w9WgXcQ",
    releaseDate: "30 Jul 2027",
    language: "English",
    director: "Joseph Kosinski",
    cast: [
      { name: "Hailee Steinfeld", role: "Rhea Vance" },
      { name: "Michael B. Jordan", role: "Coach Marcus Vance" },
      { name: "Karl Urban", role: "Victor Vance" },
    ],
    showtimeDates: [
        "2025-11-21",
        "2025-11-23",
        "2025-11-26",
        "2025-11-27",
      ],
    showtimes: [
      { time: "3:15 PM", type: "2D", screenId: "screen-2", price: "$12" },
      { time: "6:30 PM", type: "4DX", screenId: "screen-4dx", price: "$21" },
      { time: "9:15 PM", type: "IMAX", screenId: "screen-imax", price: "$20" },
    ],
  },
] as Movie[],
  },

  // --- PROMO GRID (the "More" section) ---
  promotions: {
    title: "More",
    cards: [
      {
        title: "Join our WhatsApp Channel",
        subtitle: "Get showtimes first",
        image: "https://placehold.co/400x300/c8102e/ffffff?text=WhatsApp",
        href: "/whatsapp",
      },
      {
        title: "Our Menu and Ticket Prices",
        subtitle: "Popcorn, drinks, and more",
        image: "https://placehold.co/400x300/d4af37/0a0a0a?text=Menu",
        href: "/menu",
      },
      {
        title: "Special Events",
        subtitle: "Premieres and screenings",
        image: "https://placehold.co/400x300/c8102e/ffffff?text=Events",
        href: "/events",
      },
      {
        title: "Parties & Group Bookings",
        subtitle: "Coming Soon",
        image: "https://placehold.co/400x300/171717/d4af37?text=Parties",
        href: "/parties",
        badge: "Coming Soon",
      },
      {
        title: "Private Hire",
        subtitle: "Coming Soon",
        image: "https://placehold.co/400x300/171717/f5f5f5?text=Private+Hire",
        href: "/private-hire",
        badge: "Coming Soon",
      },
      {
        title: "Loyalty and Memberships",
        subtitle: "Coming Soon",
        image: "https://placehold.co/400x300/d4af37/0a0a0a?text=Loyalty",
        href: "/loyalty",
        badge: "Coming Soon",
      },
    ] as PromoCard[],
  },

  screens: [
  {
    id: "screen-1",
    name: "Screen 1",
    format: "2D",
    rows: 8,
    seatsPerRow: 12,
    aisleAfterCol: [3, 9],
    premiumRows: ["E", "F", "G"],
    unavailableSeats: ["A3", "B5", "F8", "H1"],
  },
  {
    id: "screen-2",
    name: "Screen 2",
    format: "2D",
    rows: 10,
    seatsPerRow: 14,
    aisleAfterCol: [4, 10],
    premiumRows: ["H", "I", "J"],
    unavailableSeats: ["D2", "E3", "G12"],
  },
  {
    id: "screen-3d",
    name: "Screen 3 (RealD 3D)",
    format: "3D",
    rows: 9,
    seatsPerRow: 12,
    aisleAfterCol: [3, 9],
    premiumRows: ["E", "F", "G"],
    unavailableSeats: ["B4", "C6", "H10"],
  },
  {
    id: "screen-lux",
    name: "LUX Cinema",
    format: "LUX",
    rows: 6,
    seatsPerRow: 8,
    aisleAfterCol: [4],
    premiumRows: ["C", "D", "E"],
    unavailableSeats: ["C2"],
  },
  {
    id: "screen-imax",
    name: "IMAX Grand Theater",
    format: "IMAX",
    rows: 12,
    seatsPerRow: 16,
    aisleAfterCol: [4, 12],
    premiumRows: ["W", "X", "Y"],
    unavailableSeats: ["A1", "A16", "F7", "F8", "K12"],
  },
  {
    id: "screen-4dx",
    name: "4DX Motion Screen",
    format: "VIP", // mapping format to VIP/4DX setup
    rows: 7,
    seatsPerRow: 10,
    aisleAfterCol: [5],
    premiumRows: ["T", "G"],
    unavailableSeats: ["A2", "D5"],
  },
] as Screen[],

  footerData: {
    companyName: "Road House Cinema",
    description: "Sam Levy's Village, Shop 18. Borrowdale, Harare. Zimbabwe.",
    sections: [
      {
        title: "Cinema",
        links: [
          { label: "Now Playing", href: "/" },
          { label: "Coming Soon", href: "/coming-soon" },
        ],
      },
      {
        title: "Info",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy" },
        ],
      },
    ],
  },

  comingSoon: {
    title: "Coming Soon",
    subtitle: "Book your seats early for these upcoming releases.",
    movies: [
      {
        id: "spiderman-brand-new-day",
        title: "Spider-Man: Brand New Day",
        rating: "PG 13",
        duration: "150 minutes",
        genres: ["Action", "Adventure"],
        synopsis:
          "It's a BRAND NEW DAY for Peter Parker. Fighting crime full-time as Spider-Man in a world that doesn't remember him — and the pressure of being a hero.",
        poster: "https://placehold.co/300x450/171717/c8102e?text=Spider-Man",
        backdrop:
          "https://placehold.co/1920x1080/0a0a0a/f5f5f5?text=Spider-Man",
        releaseDate: "5 Dec 2025",
        trailerId: "dQw4w9WgXcQ",
      },
      {
        id: "moana-3d",
        title: "Moana (3D)",
        rating: "PG",
        duration: "115 minutes",
        genres: ["Animation", "Adventure"],
        synopsis:
          "In Moana's live-action retelling of the beloved Oscar-nominated animated adventure, Moana answers the Ocean's call and, for the first time, voyages beyond the reef.",
        poster: "https://placehold.co/300x450/171717/d4af37?text=Moana",
        backdrop: "https://placehold.co/1920x1080/0a0a0a/f5f5f5?text=Moana",
        releaseDate: "12 Dec 2025",
      },
      {
        id: "toy-story-5",
        title: "Toy Story 5",
        rating: "TBC",
        duration: "102 minutes",
        genres: ["Animation", "Family"],
        synopsis:
          "The toys are back in Disney and Pixar's 'Toy Story 5' — and this time around it's Toy meets Tech. Buzz, Woody, Jessie and the rest.",
        poster: "https://placehold.co/300x450/171717/c8102e?text=Toy+Story+5",
        backdrop:
          "https://placehold.co/1920x1080/0a0a0a/f5f5f5?text=Toy+Story+5",
        releaseDate: "19 Dec 2025",
      },
    ] as ComingSoonMovie[],
  },
};

export type CinemaBusiness = typeof Cinema;
