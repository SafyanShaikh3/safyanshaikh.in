// Central content file for the portfolio.
// Everything the site renders comes from here — edit this file first.
//
// Optional links: leave a value as an empty string ('') and the site will simply
// not render that button or icon. No dead placeholder links anywhere.

export const profile = {
  name: 'Safyan Shaikh',
  headline: 'Android • Full-Stack • AI/ML Developer',
  role: 'MCA student (AI & ML) · D Y Patil University, Navi Mumbai',
  intro:
    'I build complete, shippable products — a native Android expense manager, MERN commerce platforms, and applied machine-learning work — and I care as much about how they feel to use as about how they are built.',
  status: 'Open to internships & opportunities',
  location: 'Navi Mumbai, India',
  email: 'safyanshaikh009@gmail.com',
  phone: '+91 70695 00011',
  github: 'https://github.com/SafyanShaikh3',
  linkedin: 'https://www.linkedin.com/in/safyan-shaikh-54a275262',
  instagram: 'https://www.instagram.com/_safi09_',
  resume: '',
  // From SAFI.jpg, resized and optimised into public/ (225 KB → 54 KB).
  photo: '/safi.webp',
  photoFallback: '/safi.jpg',
  coords: '19.03°N 73.03°E',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { label: '7', detail: 'Projects across Android, web and ML' },
  { label: '3', detail: 'Stacks in production use: Kotlin, MERN, PHP/MySQL' },
  { label: 'MCA', detail: 'AI & Machine Learning specialization' },
  { label: 'BCA', detail: 'Computer Applications — foundation' },
]

export const interests = [
  'Android Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Full-Stack Engineering',
  'Offline-first Apps',
  'Product & UX Design',
]

export const skillGroups = [
  {
    title: 'Languages',
    items: ['Kotlin', 'Python', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Mobile / Android',
    items: [
      'Android SDK',
      'Kotlin',
      'WebView bridges',
      'WorkManager',
      'BiometricPrompt',
      'Notification channels',
      'MediaStore',
      'Gradle (KTS)',
    ],
  },
  {
    title: 'Front-end',
    items: [
      'React',
      'Redux Toolkit',
      'React Router',
      'Tailwind CSS',
      'Framer Motion',
      'Vite',
      'Vanilla JS (ES6+)',
      'Chart.js',
    ],
  },
  {
    title: 'Back-end & data',
    items: [
      'Node.js',
      'Express.js',
      'MongoDB / Mongoose',
      'MySQL',
      'REST APIs',
      'JWT auth',
      'Cloudinary',
      'Helmet / rate limiting',
    ],
  },
  {
    title: 'AI / Machine Learning',
    items: ['scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Feature engineering', 'Model evaluation'],
  },
  {
    title: 'Tools & practices',
    items: ['Git & GitHub', 'Android Studio', 'VS Code', 'Postman', 'MongoDB Compass', 'Figma'],
  },
]

/* ------------------------------------------------------------------ *
 * Projects
 * `category` drives the filter chips. `highlights` are the engineering
 * details a reviewer actually cares about. `caseStudy: true` marks the
 * project rendered as the full featured case study.
 * ------------------------------------------------------------------ */
export const projects = [
  {
    id: 'cardsense',
    title: 'CardSense',
    tagline: 'Smart credit-card expense management for Android',
    category: 'Android',
    year: '2026',
    accent: 'cyan',
    description:
      'A native Android app that tracks credit cards, spending, budgets and payment due dates — and keeps every rupee of it on the device. No account, no server, no network calls.',
    problem:
      'Most expense trackers want a sign-up, a bank connection and a cloud copy of your statements. For someone juggling two or three credit cards, the actual questions are simpler: what is outstanding, when is it due, and am I over budget this month? Paying for that answer with your financial data is a bad trade.',
    solution:
      'CardSense is offline by design. A Kotlin shell hosts a hand-built web UI in a WebView, with a narrow JavaScript bridge for the handful of things only the OS can do — biometric unlock, file export, printing, and notifications that fire even when the app is closed. Chart.js, SheetJS and the fonts are bundled in the APK, so the app works in airplane mode on day one.',
    tech: ['Kotlin', 'Android SDK', 'WebView', 'JavaScript', 'WorkManager', 'Chart.js', 'SheetJS'],
    features: [
      'Multiple cards with limits, billing and due dates',
      'Transactions, payments and category budgets',
      'Billing / due-date reminders via WorkManager',
      'Utilization and budget-breach alerts',
      'PIN + fingerprint / face app lock',
      'CSV & Excel export, statement printing to PDF',
      'In-app notification inbox with deep links',
      'First-run onboarding and local backup / restore',
    ],
    highlights: [
      {
        label: 'Offline-first architecture',
        detail:
          'All state lives in a localStorage-backed store behind an async get/set/list shim, with schema migration between versions. The manifest documents that nothing is ever sent over the network.',
      },
      {
        label: 'Reminders that survive a cold app',
        detail:
          'Every data change pushes a compact snapshot of each card (billing day, due day, outstanding) into SharedPreferences. A daily WorkManager job reads it at ~9 AM and posts reminders without the app ever being opened, using KEEP so re-launching never duplicates the schedule.',
      },
      {
        label: 'A deliberately small native bridge',
        detail:
          '11 @JavascriptInterface methods, each one a thing a WebView genuinely cannot do: saveFile via MediaStore, printPage, postNotification, BiometricPrompt, haptics, FLAG_SECURE, and notification deep-link targets.',
      },
      {
        label: 'Privacy as a feature, not a setting',
        detail:
          'FLAG_SECURE hides the app in the recents screen and blocks screenshots, the lock re-arms after 30 seconds in the background, and four separate notification channels let the user mute categories independently.',
      },
      {
        label: 'Edge-to-edge, modern Android',
        detail:
          'targetSdk 35 with hand-applied window insets so content never draws under the status bar on Android 15, plus a back-handler that lets the web layer close sheets before the system exits.',
      },
    ],
    stats: [
      { value: '0', label: 'Network calls' },
      { value: '24', label: 'API level floor' },
      { value: '4', label: 'Notification channels' },
      { value: '~290KB', label: 'Hand-written app code' },
    ],
    screenshot: '/cardsense.webp',
    screenshotFallback: '/cardsense.jpg',
    gallery: [
      { src: '/projects/cardsense-home.webp', caption: 'Home: outstanding, utilisation ring, next due payment and alerts', kind: 'phone' },
    ],
    github: '',
    demo: '',
    caseStudy: true,
    featured: true,
  },
  {
    id: 'shofiy',
    title: 'Shofiy',
    tagline: 'An electronics store in PHP + MySQL, with Razorpay, live stock and a no-code admin',
    category: 'Full-Stack',
    year: '2026',
    description:
      'An electronics and home-appliance store built to actually run a shop. Customers browse, see live stock, pay with Razorpay (UPI, cards, netbanking, wallets) or cash on delivery, and track their order. The owner runs prices, stock, daily deals, banners and order status from the admin panel without touching code.',
    problem:
      'The first version of this store worked as a college project and nothing more: passwords stored in a weak, crackable format, SQL injection in the category page, no real payments, and nothing stopping two people from buying the last unit. You could not put it in front of real customers.',
    solution:
      'I rebuilt it from scratch in plain PHP 8 and MySQL. It installs from a web wizard on any cPanel host. Prices are read on the server, the server tells Razorpay the amount, and every payment is checked by signature and confirmed again by webhook. Checkout holds stock for 20 minutes, so the last unit can only be sold once.',
    tech: ['PHP 8', 'MySQL', 'PDO', 'Razorpay', 'Vanilla JS', 'CSS', 'Apache'],
    features: [
      'Catalogue, search, categories, wishlist and cart',
      'Razorpay checkout (UPI, cards, netbanking, wallets) and cash on delivery',
      'Live "In stock / Only X left / Out of stock" labels, refreshed in the background',
      'Today\'s deals with a countdown that reverts on its own',
      'Order tracking with Processing, Shipped and Delivered emails',
      'Admin: dashboard, quick-edit stock table, banners, categories, customers, messages',
      'CSV export of orders, plus call and WhatsApp buttons on every order',
      'One-page web installer that seeds a sample catalogue',
    ],
    highlights: [
      {
        label: 'No overselling',
        detail:
          'Placing an order reserves the items for 20 minutes (configurable) while the customer pays. Unpaid holds release themselves. If a payment arrives after its hold expired, the order is still marked paid; if the item sold out in the meantime, the dashboard flags it ATTENTION.',
      },
      {
        label: 'Payments you can\'t tamper with',
        detail:
          'The total comes from the database, the Razorpay order is created on the server, and every payment is verified against Razorpay\'s HMAC signature. A webhook (payment.captured, order.paid, payment.failed) also confirms the order if the customer closes the tab halfway through paying.',
      },
      {
        label: 'Live stock without reloading',
        detail:
          'Product cards poll a small JSON endpoint every few seconds, so a price or stock change made in the admin reaches open pages in about 15 seconds.',
      },
      {
        label: 'Security fixes over the old version',
        detail:
          'bcrypt passwords, prepared statements for every query, escaped output, CSRF tokens on every form, rate-limited logins, admin logout after 2 hours idle, and uploads re-encoded under random names in a folder where scripts are not allowed to run.',
      },
    ],
    stats: [
      { value: '13', label: 'MySQL tables' },
      { value: '48', label: 'PHP files' },
      { value: '20m', label: 'Stock hold at checkout' },
      { value: '~5.3k', label: 'Lines of code' },
    ],
    gallery: [
      { src: '/projects/shofiy-home.webp', caption: 'Storefront: banner slider, categories, today\'s deals', kind: 'browser', url: 'shofiy.store' },
      { src: '/projects/shofiy-product.webp', caption: 'Product page: deal countdown and a live "Only 5 left" badge', kind: 'browser', url: 'shofiy.store/product' },
      { src: '/projects/shofiy-shop.webp', caption: 'Catalogue with filters and live stock labels', kind: 'browser', url: 'shofiy.store/shop' },
      { src: '/projects/shofiy-cart.webp', caption: 'Cart and order summary, before Razorpay checkout', kind: 'browser', url: 'shofiy.store/cart' },
      { src: '/projects/shofiy-admin.webp', caption: 'Admin dashboard: sales, COD to collect, low-stock quick edit', kind: 'browser', url: 'shofiy.store/admin' },
      { src: '/projects/shofiy-admin-products.webp', caption: 'Admin: products and stock in one editable table', kind: 'browser', url: 'shofiy.store/admin/products' },
      { src: '/projects/shofiy-admin-specials.webp', caption: 'Admin: today\'s specials, set a price or a % off', kind: 'browser', url: 'shofiy.store/admin/specials' },
      { src: '/projects/shofiy-mobile.webp', caption: 'Mobile storefront', kind: 'phone' },
      { src: '/projects/shofiy-mobile-product.webp', caption: 'Mobile product page', kind: 'phone' },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    id: 'phonehub',
    title: 'PhoneHub',
    tagline: 'Full-stack MERN mobile-phone store',
    category: 'Full-Stack',
    year: '2025',
    accent: 'blue',
    description:
      'An end-to-end e-commerce platform for a mobile phone retailer: catalog, cart, checkout, order history, and a separate admin console for products, orders and bookings.',
    problem:
      'A storefront is the easy half of e-commerce. The hard half is everything behind it — keeping stock honest while several people check out at once, giving staff a place to manage products and orders, and not leaking the admin surface to customers.',
    solution:
      'A React + Redux Toolkit front end against an Express/MongoDB API, split into customer and admin route trees guarded separately. Stock is held by reservation documents rather than decremented optimistically, product media goes to Cloudinary through a validated upload route, and the API ships with Helmet, CORS, rate limiting and request validation from the start.',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Cloudinary'],
    features: [
      'Product catalog with search, filtering and detail pages',
      'Cart sidebar and multi-step checkout',
      'JWT auth with protected and admin-only routes',
      'Admin dashboard: products, orders, bookings, users',
      'Image upload pipeline backed by Cloudinary',
      'Stock reservations to prevent oversell',
      'Order history and user profiles',
      'Seed scripts and an admin bootstrap command',
    ],
    highlights: [
      {
        label: 'Stock reservations',
        detail:
          'A dedicated StockReservation model holds inventory during checkout instead of mutating product counts, so an abandoned cart releases its stock rather than silently losing it.',
      },
      {
        label: 'Hardened API surface',
        detail:
          'helmet, compression, express-rate-limit (100 req / 15 min), express-validator and a central error handler — plus a port-scan fallback so the dev server never dies on EADDRINUSE.',
      },
      {
        label: 'Two apps, one bundle',
        detail:
          'AdminLayout / AdminRoute and ProtectedRoute split the admin console from the storefront at the router level, each with its own navbar, sidebar and guard.',
      },
    ],
    stats: [
      { value: '7', label: 'REST route groups' },
      { value: '5', label: 'Mongoose models' },
      { value: '20+', label: 'React pages' },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    id: 'theme-park',
    title: 'Theme Park Ride Booking',
    tagline: 'MERN booking platform with an admin console',
    category: 'Full-Stack',
    year: '2025',
    accent: 'violet',
    description:
      'A full-stack web application for browsing theme park rides, viewing ride details, booking tickets, managing bookings, and running the park from an admin dashboard.',
    problem:
      'Ride ticketing is usually split across physical queues, paper slips and a spreadsheet somewhere in the back office — no live visibility for visitors and no reporting for staff.',
    solution:
      'One platform with two faces: visitors browse rides, open a detail page and book tickets with a booking history they can check later; administrators manage rides, bookings and users from a single dashboard with reporting.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'User authentication and profiles',
      'Ride browsing and detailed ride pages',
      'Ticket booking and booking history',
      'Admin dashboard for rides and bookings',
      'User management and reports',
    ],
    highlights: [
      {
        label: 'Role-separated interfaces',
        detail:
          'Visitor and administrator journeys are distinct surfaces over the same data model, so neither one is a compromise for the other.',
      },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    id: 'theme-park-php',
    title: 'Theme Park Booking (PHP)',
    tagline: 'The same problem, solved on a LAMP stack',
    category: 'Full-Stack',
    year: '2025',
    accent: 'blue',
    description:
      'A classic PHP + MySQL implementation of the ride-booking system — server-rendered pages, session auth, and a normalised schema — built to understand the stack the modern tooling abstracts away.',
    problem:
      'Frameworks hide a lot. Writing the same booking flow with nothing but PHP, sessions and SQL makes the parts you normally import — routing, auth, query safety — impossible to ignore.',
    solution:
      'Separate user and admin entry points over a shared MySQL schema: registration and login with hashed passwords and sessions, a booking flow, a "my bookings" view, and admin pages for rides, bookings and users.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'SQL'],
    features: [
      'Session-based user registration and login',
      'Ride browsing and booking',
      'Per-user booking history',
      'Admin login with a separate guard',
      'Admin management of rides, bookings and users',
      'Versioned SQL schema in the repo',
    ],
    highlights: [
      {
        label: 'Schema-first',
        detail:
          'The database is checked in as theme_park.sql rather than drifting in someone\'s local MySQL — the project can be stood up from scratch in two commands.',
      },
    ],
    github: '',
    demo: '',
    featured: false,
  },
  {
    id: 'real-estate-ml',
    title: 'Real Estate Price Analysis',
    tagline: 'Applied ML on housing data',
    category: 'AI / ML',
    year: '2026',
    accent: 'violet',
    description:
      'A data-driven project exploring real estate datasets with Python and scikit-learn to find what actually moves price — and to see how far a careful, well-understood model gets you.',
    problem:
      'Property pricing looks like it should be a simple function of size and location, and is not. The interesting question is which features carry signal and which ones are noise dressed up as insight.',
    solution:
      'An exploratory pipeline: clean and profile the data with Pandas, visualise distributions and correlations with Matplotlib, engineer features, then fit and compare regression models with scikit-learn, judged on held-out error rather than training fit.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'scikit-learn'],
    features: [
      'Data cleaning and exploratory analysis',
      'Correlation and distribution visualisation',
      'Feature engineering and selection',
      'Regression modelling and comparison',
      'Evaluation on held-out data',
    ],
    highlights: [
      {
        label: 'Evaluation discipline',
        detail:
          'Models are compared on held-out error, so an improvement in the notebook is an improvement in reality and not just a better-memorised training set.',
      },
    ],
    github: '',
    demo: '',
    featured: false,
  },
  {
    id: 'real-estate-app',
    title: 'Property Management System',
    tagline: 'Listings, users and applications in one place',
    category: 'Full-Stack',
    year: '2025',
    accent: 'cyan',
    description:
      'A property management application for handling listings, user accounts and rental applications, built in Python with a relational data model behind it.',
    problem:
      'Small property managers run on a spreadsheet plus a WhatsApp thread: listings go stale, applications get lost, and nobody can answer "what is the status of this flat?" in one place.',
    solution:
      'A single system of record for properties, the people attached to them, and the applications moving between the two — with the state of each application explicit rather than implied by the last message someone sent.',
    tech: ['Python', 'SQL', 'MongoDB'],
    features: [
      'Property listing management',
      'User accounts and roles',
      'Rental application tracking',
      'Status-driven application workflow',
    ],
    highlights: [],
    github: '',
    demo: '',
    featured: false,
  },
]

export const projectCategories = ['All', 'Android', 'Full-Stack', 'AI / ML']

export const caseStudy = projects.find((p) => p.caseStudy)

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institute: 'D Y Patil University, Navi Mumbai',
    detail: 'Specialization: Artificial Intelligence & Machine Learning',
    status: 'In progress',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institute: 'Veer Narmad South Gujarat University, Surat',
    detail:
      'Foundation in programming, databases and web development. Project work across MERN and LAMP stacks.',
    status: 'Completed',
  },
]

export const experience = [
  {
    role: 'Web Development Intern',
    company: 'Izonnet Web Solution Pvt. Ltd.',
    location: 'Chikhli, Gujarat',
    period: '29 Oct – 15 Nov 2025',
    detail:
      'On-the-job training as part of the BCA programme. Graded A+ (Excellent), 47/50 — 28/30 for skill, 19/20 for attendance and discipline.',
  },
]

export const journeySteps = [
  { label: 'BCA', detail: 'Programming, databases, first real projects' },
  { label: 'Full-Stack', detail: 'MERN and LAMP — booking systems, e-commerce' },
  { label: 'AI/ML', detail: 'Python, scikit-learn, applied data analysis' },
  { label: 'MCA', detail: 'AI & ML specialization at D Y Patil University' },
  { label: 'Android', detail: 'CardSense — a native app built end to end' },
]

export const philosophy = [
  {
    title: 'Learn',
    detail: 'Go a layer deeper than the tutorial. Build the same thing twice if that is what it takes to understand it.',
  },
  {
    title: 'Build',
    detail: 'Ship something someone can actually use. A finished small thing beats an unfinished ambitious one.',
  },
  {
    title: 'Improve',
    detail: 'Measure, debug, refactor. The second version of a project is where the real engineering happens.',
  },
]

export const aiPipeline = ['Data', 'Model', 'Intelligence', 'Application']
