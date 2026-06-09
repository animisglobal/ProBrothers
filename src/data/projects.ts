/**
 * ProBrothers — project detail data for the /projects modal system.
 * Source: each project's original detail page on https://probrothers.com/projects/<slug>/
 * Content (title, description paragraphs, image alt text) is 100% VERBATIM from the live site.
 * Only structure/layout is new (migration rule: content is sacred).
 * 5 projects (Black Window, Doors, Gold Beams, Large Bathroom Window, Window Casing) have
 * NO descriptive paragraph on the original site — they are image-only there, preserved as-is.
 * Grey-Mantle.webp was downloaded from the live site (missing from local assets) to keep the gallery complete.
 */
export interface ProjectImage { src: string; alt: string; }
export interface Project {
  name: string;
  slug: string;
  title: string;
  thumb: string;
  sourceUrl: string;
  description: string[];
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    name: "Bathroom Restoration",
    slug: "bathroom-restoration",
    title: "Bathroom Restoration",
    thumb: "/assets/img/projects/Wht-Btr-Grey-Tile-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/bathroom-restoration/",
    description: [
      `This project was part of a house restoration. The bathroom was part of what the client wanted to change. The first step of any renovation process is the demolition, so we got rid of the old tile, toilet, sinks, and vanity. After the client chose what style she wanted, we got to work. We got a custom vanity with the paint the client chose. We did the tiling, installed a new toilet and sink, and repainted all of the walls. After some work we went from an old and uninteresting room, to a stylish bathroom that came from the ideas of the client.`,
    ],
    images: [
      { src: "/assets/img/projects/Wht-Btr-Grey-Tile-1-768x1024.webp", alt: "vanity cabinets" },
      { src: "/assets/img/projects/Wht-Btr-Grey-Tile-2-768x1024.webp", alt: "premium cabinets" },
      { src: "/assets/img/projects/Wht-Btr-Grey-Tile-768x1024.webp", alt: "premium cabinets" },
    ],
  },
  {
    name: "Black Beams",
    slug: "black-beams",
    title: "Black Beams",
    thumb: "/assets/img/projects/Black-Beams-1-1024x766.webp",
    sourceUrl: "https://probrothers.com/projects/black-beams/",
    description: [
      `This was an incredible project in both size and style. Due to the size of the home and technicalities, this was a commercial project, even though it was for a private client. Our task was to make and install massive black beams with a very complex shape. We started with building the beams in parts that we would be able to transfer to the site, and install. After the completion of the shop work, we transferred the beams to the site. They were installed using a scissor lift due to the high ceilings. After beams were installed, we went over with touch up to ensure the highest quality.`,
    ],
    images: [
      { src: "/assets/img/projects/Black-Beams-1-1024x766.webp", alt: "ceiling trim work and trim carpentry" },
      { src: "/assets/img/projects/Black-Beams-1024x768.webp", alt: "black beams roof trim work" },
    ],
  },
  {
    name: "Black Window",
    slug: "black-window",
    title: "Black Window",
    thumb: "/assets/img/projects/Black-Windows-3-576x1024.webp",
    sourceUrl: "https://probrothers.com/projects/black-window/",
    description: [],
    images: [
      { src: "/assets/img/projects/Black-Windows-1-1024x768.webp", alt: "expert window and door installation service" },
      { src: "/assets/img/projects/Black-Windows-2-1024x768.webp", alt: "windows installed by our experts for a new client" },
      { src: "/assets/img/projects/Black-Windows-1024x768.webp", alt: "Expert remodeling and windows installation service for beautiful transformations" },
      { src: "/assets/img/projects/Black-Windows-3-576x1024.webp", alt: "window installation service" },
    ],
  },
  {
    name: "BlackHorse House",
    slug: "blackhorse-house",
    title: "BlackHorse House",
    thumb: "/assets/img/projects/Remodeling-BlackHorse-House-1024x768.webp",
    sourceUrl: "https://probrothers.com/projects/blackhorse-house/",
    description: [
      `This was a remodeling project that we had in Media Pa. The house had a garage, a sunroom that was used as a salon, living area, and an unfinished basement. Starting with the interior, everything was demolished, from old flooring, to drywall. Two walls were removed to create a more open plan, with the kitchen doubling in size, and connecting with the living room. The basement went from being an unlivable concrete room, to an amazing relax area with a bedroom and full bathroom. Everything was then repainted, retiled, and new flooring was installed. The Exterior got massive upgrades too. The side entrance door was moved to the center with new windows on the sides. A new concrete walkway was poured, with floating shelves and lights. We then reroofed the roof, installed board and batten on the gables, and a porch was built in the backyard. We started with a beat up house that no one would want to go near, to an incredible finished product, with a simple, modern, and very attractive look.`,
    ],
    images: [
      { src: "/assets/img/projects/Remodeling-BlackHorse-House-1024x768.webp", alt: "Expert remodeling services for beautiful home transformations" },
    ],
  },
  {
    name: "Blue Library",
    slug: "blue-library",
    title: "Blue Library",
    thumb: "/assets/img/projects/Blue-Library-4-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/blue-library/",
    description: [
      `For this project, we had a book-loving client come to use wanting to transform a spare room into a home library. The idea was to have a large floor to ceiling bookshelf that spanned from wall to wall. The other side of the room was to have a closet for storing personal items, and to finish it off, beams on the ceiling to really make the room pop. The cabinets were custom made and finished, then installed at the site. To make it easier for the client to reach the higher levels of the bookcase, we built a sliding ladder that would help reach those hard to reach books. One of the customers’ ideas was for the whole room to match and look continuous. For this we decided that a paneled wall would really make this room feel finished, so we panel the wall and put trim that made everything come together. To finish off the project we installed beams on the ceiling that were really the cherry on top.`,
    ],
    images: [
      { src: "/assets/img/projects/Blue-Library-1-768x1024.webp", alt: "library cabinet design and remodeling" },
      { src: "/assets/img/projects/Blue-Library-2-768x1024.webp", alt: "office library cabinet" },
      { src: "/assets/img/projects/Blue-Library-3-768x1024.webp", alt: "luxury wooden cabinets" },
      { src: "/assets/img/projects/Blue-Library-4-768x1024.webp", alt: "Complete room remodeling done including ceilng, cabinets, walls, and doors by the best construction company" },
      { src: "/assets/img/projects/Blue-Library-819x1024.webp", alt: "wooden cabinets" },
    ],
  },
  {
    name: "Brown Beams",
    slug: "brown-beams",
    title: "Brown Beams",
    thumb: "/assets/img/projects/Brown-Beams-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/brown-beams/",
    description: [
      `This was a commercial project for a luxury retirement home. This was a new construction building that already had drawings for what they wanted. We built the beams to spec and size, and finished them with the stain the designer chose. After transporting them to the location, we installed them with a team of three. After installation they were checked by our team that the highest quality was attained.`,
    ],
    images: [
      { src: "/assets/img/projects/Brown-Beams-768x1024.webp", alt: "trim work" },
    ],
  },
  {
    name: "Curved Stair Wall Trim",
    slug: "curved-stair-wall-trim",
    title: "Curved Stair Wall Trim",
    thumb: "/assets/img/projects/Stair-Trim-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/curved-stair-wall-trim/",
    description: [
      `This was a complex trim job that we did for a client building a new home in Delaware. We were contacted about a client wanting trim paneling in a curving staircase leading to the basement. Since this was not your usual straight walls, special trim was needed so that it would be able to mold to the shape. After ordering the right amount of materials, we got to work. Using lasers and levels we installed the trim as straight as possible, also maintaining precision at all of the connections. After installation, trim was inspected, any holes filled, and then painted.`,
    ],
    images: [
      { src: "/assets/img/projects/Stair-Trim-768x1024.webp", alt: "Elegant trim details for refined interior spaces" },
      { src: "/assets/img/projects/Stair-Trim-1-735x1024.webp", alt: "high-quality staircase trim work" },
      { src: "/assets/img/projects/Stair-Trim-2-768x1024.webp", alt: "staircase trimwork" },
    ],
  },
  {
    name: "Dark Blue Office",
    slug: "dark-blue-office",
    title: "Dark Blue Office",
    thumb: "/assets/img/projects/Blue-Cabinets-1-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/dark-blue-office/",
    description: [
      `This is an incredible custom home office for a high-end customer. The customer wanted to transform his home office into a place to be proud of, a room that makes you want to go to work. After some ideas we got the cabinet layout that the client agreed upon. With a corner desk for a computer monitor and space to write, large cabinets for storing lots of files and small drawers for the small things like pens and notebooks, this was exactly what the customer needed to improve his workspace. We then finished the cabinets with a premium finish going with a luxury blue that really suited the atmosphere. The gold handles finished the project off, complimenting the finished room.`,
    ],
    images: [
      { src: "/assets/img/projects/Blue-Cabinets-1-768x1024.webp", alt: "closeup shot of office cabinet designed by Probrothers" },
      { src: "/assets/img/projects/Blue-Cabinets-2-768x1024.webp", alt: "sleek and modern office cabinets" },
      { src: "/assets/img/projects/Blue-Cabinets-3-768x1024.webp", alt: "sleek and modern office cabinets" },
      { src: "/assets/img/projects/Blue-Cabinets-4-768x1024.webp", alt: "premium office cabinets" },
      { src: "/assets/img/projects/Blue-Cabinets-5-768x1024.webp", alt: "Elegant office cabinets for organized workspace" },
      { src: "/assets/img/projects/Blue-Cabinets-6-768x1024.webp", alt: "functional office cabinetry" },
    ],
  },
  {
    name: "Doors",
    slug: "doors",
    title: "Doors",
    thumb: "/assets/img/projects/New-Door-and-Trim-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/doors/",
    description: [],
    images: [
      { src: "/assets/img/projects/New-Door-and-Trim-768x1024.webp", alt: "classy wooden door" },
      { src: "/assets/img/projects/New-Sliding-Door-768x1024.webp", alt: "glass sliding door providing apmle sunlight inside house" },
      { src: "/assets/img/projects/New-Window-Blue-Shutter-768x1024.webp", alt: "window installated with a fresh new look" },
      { src: "/assets/img/projects/New-Windows-and-Slide-door-768x1024.webp", alt: "new window and sliding door installation done by our team of experts" },
      { src: "/assets/img/projects/White-Door-and-Trim-768x1024.webp", alt: "window and door installation along with trim work" },
    ],
  },
  {
    name: "Fireplace",
    slug: "fireplace",
    title: "Fireplace",
    thumb: "/assets/img/projects/Fireplace-1-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/fireplace/",
    description: [
      `This Fireplace was part of a large commercial project. This one was located in a lounge area in a luxury retirement home. We were given drawings by the designer from which we started. Our job was to build the shelves that were part of the fireplace. We used solid wood with a beautiful stained finish. Although a simple project, this was a beautiful addition to the area.`,
    ],
    images: [
      { src: "/assets/img/projects/Fireplace-1-768x1024.webp", alt: "Elegant fireplace design" },
      { src: "/assets/img/projects/Fireplace-768x1024.webp", alt: "Custom fireplace cabinets design" },
    ],
  },
  {
    name: "Gold Beams",
    slug: "gold-beams",
    title: "Gold Beams",
    thumb: "/assets/img/projects/Gold-Beams-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/gold-beams/",
    description: [],
    images: [
      { src: "/assets/img/projects/Brown-Beams-768x1024.webp", alt: "trim work" },
      { src: "/assets/img/projects/Gold-Beams-768x1024.webp", alt: "Beautifully crafted trim for enhanced interior design" },
    ],
  },
  {
    name: "Gray Mantle, Beams",
    slug: "gray-mantle-beams",
    title: "Gray Mantle, Beams",
    thumb: "/assets/img/projects/Grey-Mantle-1.webp",
    sourceUrl: "https://probrothers.com/projects/gray-mantle-beams/",
    description: [
      `A customer with a middle class house reached out to us wanting to transform their empty living room into an awesome space. They asked us to make ceiling beams, and a matching mantel for their fireplace. First step was to get dimensions after which they were sent to the shop for everything to get built. We worked with the clients on the colors they wanted, after which we finished them to what they chose.`,
    ],
    images: [
      { src: "/assets/img/projects/Grey-Mantle-1.webp", alt: "mantel for fireplace cabinets" },
      { src: "/assets/img/projects/Grey-Mantle.webp", alt: "mantel for fireplace" },
    ],
  },
  {
    name: "Large Bathroom Window",
    slug: "large-bathroom-window",
    title: "Large Bathroom Window",
    thumb: "/assets/img/projects/Large-Bathroom-Window-1024x768.webp",
    sourceUrl: "https://probrothers.com/projects/large-bathroom-window/",
    description: [],
    images: [
      { src: "/assets/img/projects/Large-Bathroom-Window-1024x768.webp", alt: "house window installation" },
    ],
  },
  {
    name: "Light Blue Cabinets",
    slug: "light-blue-cabinets",
    title: "Light Blue Cabinets",
    thumb: "/assets/img/projects/Light-Blue-Leather-Handle-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/light-blue-cabinets/",
    description: [
      `Even though simple, this project is a great example of how some simple cabinets can transform an empty room into something more. The client wanted some cabinets that surrounded a window so that one of the spare rooms didn’t look as empty. After going over the design he wanted, and getting the correct measurements, the shop built the cabinets. They were then finished with the color the client chose. After transporting them to the location, they were installed. Necessary components were cut and scribed to get a precise fit. After cabinets were put in, the doors and handles were installed resulting in a great look.`,
    ],
    images: [
      { src: "/assets/img/projects/Leather-Handle-768x1024.webp", alt: "wooden cabinets with leather strap handles" },
      { src: "/assets/img/projects/Leather-Handler-1-768x1024.webp", alt: "Practical mudroom cabinets for a tidy entryway" },
      { src: "/assets/img/projects/Light-Blue-Cabinets-Leather-Handle-768x1024.webp", alt: "wooden cabinets with leather strap handles" },
      { src: "/assets/img/projects/Light-Blue-Leather-Handle-768x1024.webp", alt: "Stylish and modern looking mudroom cabinets for efficient storage" },
    ],
  },
  {
    name: "Two-Tone Kitchen Restoration",
    slug: "two-tone-kitchen-restoration",
    title: "Two-Tone Kitchen Restoration",
    thumb: "/assets/img/projects/Two-Tone-Grey-Kitchen-1024x769.webp",
    sourceUrl: "https://probrothers.com/projects/two-tone-kitchen-restoration/",
    description: [
      `A client contacted our company wanting to transform her old kitchen into a place where you want to be. After discussing what she is looking for, we came in, took all of the measurements, and started the demolition process. We took out the old kitchen, Flooring, and appliances. After repainting the whole room with a quality finish, we were ready for installation. The client wanted the kitchen to be simple, but did go for an interesting finish option, a two-tone kitchen. After choosing the colors and building the cabinets, we had a beautiful kitchen that was a massive upgrade from the one before it.`,
    ],
    images: [
      { src: "/assets/img/projects/Two-Tone-Grey-Kitchen-1-1024x769.webp", alt: "Custom kitchen cabinets for enhanced storage" },
      { src: "/assets/img/projects/Two-Tone-Grey-Kitchen-2-768x1024.webp", alt: "Stylish and functional kitchen cabinets design" },
      { src: "/assets/img/projects/Two-Tone-Grey-Kitchen-1024x769.webp", alt: "Custom kitchen cabinets for optimal storage" },
    ],
  },
  {
    name: "Wallpaper",
    slug: "wallpaper",
    title: "Wallpaper",
    thumb: "/assets/img/projects/BathroomFlower-Wallpaper-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/wallpaper/",
    description: [
      `For this project, we built two custom vanities for a residential customer. The client desiring elegant bathrooms turned to our company for making her ideas come to life. Working with a designer we got the ideas on paper, built the cabinets, and finished them with premium quality paint. We finished it off with some under cabinet lighting making for an incredible finished product.`,
    ],
    images: [
      { src: "/assets/img/projects/Blue-Library-1-768x1024.webp", alt: "library cabinet design and remodeling" },
      { src: "/assets/img/projects/Blue-Library-2-768x1024.webp", alt: "office library cabinet" },
      { src: "/assets/img/projects/Blue-Library-3-768x1024.webp", alt: "luxury wooden cabinets" },
      { src: "/assets/img/projects/Blue-Library-4-768x1024.webp", alt: "Complete room remodeling done including ceilng, cabinets, walls, and doors by the best construction company" },
      { src: "/assets/img/projects/Blue-Library-819x1024.webp", alt: "wooden cabinets" },
    ],
  },
  {
    name: "White Bathroom Vanities and Closets",
    slug: "white-bathroom-vanities-closets",
    title: "White Bathroom Vanities and Closets",
    thumb: "/assets/img/projects/White-Bathroom-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/white-bathroom-vanities-closets/",
    description: [
      `For this project, a client wanted to transform their bathroom into an elegant space, with specialized spots for makeup. After working with a designer, we were able to get drawings of the vanities and closets the client wanted. After getting the cabinets built by the shop, we transported them to the location and began installation. Quality was ensured through the whole building process ensuring in an amazing finished product`,
    ],
    images: [
      { src: "/assets/img/projects/White-Bathroom-1-768x1024.webp", alt: "bathroom cabinets" },
      { src: "/assets/img/projects/White-Bathroom-2-768x1024.webp", alt: "vanity cabinets" },
      { src: "/assets/img/projects/White-Bathroom-3-768x1024.webp", alt: "white bathroom cabinets" },
      { src: "/assets/img/projects/White-Bathroom-4-768x1024.webp", alt: "white bathroom cabinets" },
      { src: "/assets/img/projects/White-Bathroom-5-768x1024.webp", alt: "white bathroom cabinets" },
      { src: "/assets/img/projects/White-Bathroom-6-768x1024.webp", alt: "white bathroom cabinets" },
    ],
  },
  {
    name: "White Ceiling",
    slug: "white-ceiling",
    title: "White Ceiling",
    thumb: "/assets/img/projects/White-Sqr-1-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/white-ceiling/",
    description: [
      `A client wanted to transform their room into something elegant, so we were contacted to install ceiling trim. This was a simple project, yet the quality and craftsmanship made something simple look stunning. The trim was installed in squares with precise joints. Then it was later finished with paint. Even though simple, this trim made the room more elegant.`,
    ],
    images: [
      { src: "/assets/img/projects/White-Sqr-1-768x1024.webp", alt: "premium trim carpentry" },
      { src: "/assets/img/projects/White-Sqr-768x1024.webp", alt: "professional trim work service" },
    ],
  },
  {
    name: "White Coffered Ceiling",
    slug: "white-coffered-ceiling",
    title: "White Coffered Ceiling",
    thumb: "/assets/img/projects/White-Coffered-4-472x1024.webp",
    sourceUrl: "https://probrothers.com/projects/white-coffered-ceiling/",
    description: [
      `This project was done for a client building a new house in Delaware. The client worked with a designer that chose the style, design, and color. The drawings were taken to the shop that built the beams. After transportation, the installation process began. Using scaffolding, we installed attachment points on the ceiling. The beams were also cut to exact size on site, ensuring a precise fit and installation. After the installation process ended, a quality inspection followed to make sure the client got exactly what she wanted.`,
    ],
    images: [
      { src: "/assets/img/projects/White-Coffered-1-768x1024.webp", alt: "Detailed chair rail molding and crown molding installation in a residential hallway." },
      { src: "/assets/img/projects/White-Coffered-2-768x1024.webp", alt: "professional trim work service" },
      { src: "/assets/img/projects/White-Coffered-3-768x1024.webp", alt: "professional trim work" },
      { src: "/assets/img/projects/White-Coffered-4-472x1024.webp", alt: "Ceiling trim work" },
      { src: "/assets/img/projects/White-Coffered-768x1024.webp", alt: "Ceiling trim work done by our professionals" },
    ],
  },
  {
    name: "White Trim on Stair Wall",
    slug: "white-trim-on-stair-wall",
    title: "White Trim on Stair Wall",
    thumb: "/assets/img/projects/Stair-Wall-Trim-1-768x1024.webp",
    sourceUrl: "https://probrothers.com/projects/white-trim-on-stair-wall/",
    description: [
      `A client came to use wanting to add some detail for his basement space. Our job was to install trim on a wall following a staircase. After discussing design and style ideas, we took measurements of what was needed and then ordered the needed trim. The trim was later installed with quality and precision as our main goals. After installation the trim was painted for an amazing result.`,
    ],
    images: [
      { src: "/assets/img/projects/Stair-Wall-Trim-1-768x1024.webp", alt: "stair wall trim work" },
      { src: "/assets/img/projects/Stair-Wall-Trim-2-768x1024.webp", alt: "stair trimwork" },
      { src: "/assets/img/projects/Stair-Wall-Trim-768x1024.webp", alt: "staircase and stairwall trimwork" },
    ],
  },
  {
    name: "Window Casing",
    slug: "window-casing",
    title: "Window Casing",
    thumb: "/assets/img/projects/Window-Casing-866x1024.webp",
    sourceUrl: "https://probrothers.com/projects/window-casing/",
    description: [],
    images: [
      { src: "/assets/img/projects/Window-Casing-866x1024.webp", alt: "glass window" },
      { src: "/assets/img/projects/Window-Casing-1-641x1024.webp", alt: "window casing" },
    ],
  },
];
