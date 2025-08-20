# Calvero Club Chat Web — Next.js Real-Time Chat Frontend

[![Releases](https://img.shields.io/github/v/release/Megamivp/calvero-club-chat-web?label=Releases&style=for-the-badge)](https://github.com/Megamivp/calvero-club-chat-web/releases)

![Chat app banner](https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80)

Calvero Club Chat Web is a modern, secure, real-time chat frontend built with Next.js, TypeScript, and Tailwind CSS. It connects to the Calvero Club Chat API, uses SignalR for instant updates, and relies on JWT for auth and room-based message flows. The UI supports dark mode, responsive layouts, and modular components for easy extension.

Badges
- Platform: Next.js · TypeScript · Tailwind CSS
- Topics: authentication · chat-app · community · dark-mode · frontend · jwt · messaging · modern-ui · modular · nextjs · open-source · react · real-time · redux · responsive · signalr · socket · tailwindcss · typescript · webapp

Demo and download
- Live demo (if hosted) appears in Releases.
- To install a packaged build, download the release asset and execute the included script or run the provided startup commands: https://github.com/Megamivp/calvero-club-chat-web/releases

Table of contents
- Features
- Screenshots
- Tech stack
- Key concepts
- Quick start
- Environment variables
- Scripts
- Architecture and flow
- SignalR integration
- Authentication (JWT)
- State management (Redux)
- Theming and responsive design
- Testing
- Deployment
- Releases
- Contributing
- License
- FAQ
- Troubleshooting

Features
- Real-time messaging with SignalR.
- JWT-based authentication and refresh flow.
- Room creation, join, leave, and list.
- Typing indicators and message receipts.
- Read/unread tracking and message history.
- Modular UI components with TypeScript typings.
- Tailwind CSS for utility-first styling and dark mode.
- Responsive layout for desktop and mobile.
- Redux for predictable state and dev tooling.
- Secure storage patterns for tokens.
- Accessible forms and keyboard navigation.

Screenshots
- Chat list and room view:

![Chat UI Light](https://raw.githubusercontent.com/Megamivp/calvero-club-chat-web/main/docs/screenshots/chat-light.png)
- Dark mode and mobile layout:

![Chat UI Dark](https://raw.githubusercontent.com/Megamivp/calvero-club-chat-web/main/docs/screenshots/chat-dark.png)

Tech stack
- Next.js — SSR and routing.
- React + TypeScript — typed components.
- Tailwind CSS — systems-driven styling.
- Redux Toolkit — state slices and middleware.
- SignalR client — real-time transport.
- Axios — API calls with interceptors.
- JWT — auth token format.
- Vite (optional local tooling) or Next.js dev server.

Key concepts
- Rooms: A logical channel for messages. Each user can be in multiple rooms.
- Messages: Stored by the API. The frontend fetches history on join.
- Presence: The app shows connected users per room via SignalR presence events.
- Auth: The app stores access and refresh tokens in secure storage and uses them in API and SignalR connections.
- UI: The app composes atoms, molecules, and templates for clear reuse and fast theme changes.

Quick start (developer)
1. Clone the repo
   git clone https://github.com/Megamivp/calvero-club-chat-web.git
   cd calvero-club-chat-web

2. Install dependencies
   npm ci
   # or
   yarn install

3. Create .env.local
   Copy .env.example to .env.local and set the API and keys (see Environment variables).

4. Run in dev
   npm run dev
   # Open http://localhost:3000

5. Build and preview
   npm run build
   npm run start

If you prefer a packaged release: download the release asset from https://github.com/Megamivp/calvero-club-chat-web/releases and execute the included installer or run the extracted package's start script. The release contains a prebuilt production bundle and a small launch script (install.sh or run.cmd) that runs npm ci and starts the app.

Environment variables
Create .env.local with values like these:
- NEXT_PUBLIC_API_URL=https://api.calvero.club
- NEXT_PUBLIC_WS_URL=https://api.calvero.club/hubs/chat
- NEXT_PUBLIC_APP_NAME=Calvero Club Chat
- NEXTAUTH_SECRET=your_random_secret_here
- JWT_REFRESH_ENDPOINT=/auth/refresh
- TOKEN_STORAGE=localStorage  # or sessionStorage

Keep secrets out of Git. Use environment variables in deployment pipelines.

Scripts
- npm run dev — start dev server (Next.js)
- npm run build — build production bundle
- npm run start — run Next.js production server
- npm run lint — run ESLint
- npm run format — run Prettier
- npm run test — run unit tests (Jest + RTL)

Architecture and flow
- Pages: Next.js routes handle top-level navigation (/, /rooms/[id], /auth).
- Components: Presentational components live in /components. Each component has its styles and tests.
- Hooks: Custom hooks handle SignalR events, token refresh, and local storage.
- State: Redux stores auth, user, room list, current room, messages, typing status, and UI flags.
- API layer: Axios wrapper handles API calls and sets Authorization header automatically via interceptors.
- SignalR: The SignalR client connects to the hub once the user is authenticated. It uses JWT in the connection header.

SignalR integration
- Connection initiation
  - The app builds a connection with the hub URL and JWT token.
  - It sets automatic reconnect with exponential backoff.
- Core events
  - ReceiveMessage(roomId, message) — push message into store.
  - UserJoined(roomId, user) — update presence.
  - UserLeft(roomId, user) — update presence.
  - Typing(roomId, user) — show typing indicator.
  - MessageRead(roomId, messageId, userId) — set read receipts.
- Sending messages
  - sendMessage(roomId, text) calls hub.invoke('SendMessage', roomId, payload).
  - The hub returns the stored message with id and timestamp.
- Reconnect behavior
  - On reconnect, the client syncs missed messages by fetching history for open rooms.

Authentication (JWT)
- Sign-in flow
  - The UI posts credentials to /auth/login.
  - The API returns access token and refresh token.
  - The app stores tokens per TOKEN_STORAGE.
  - The app sets Axios and SignalR to use the access token.
- Token refresh
  - The app uses a refresh endpoint before access token expiry.
  - A refresh queue prevents parallel refresh calls.
  - On refresh failure, the app logs out and redirects to the login page.
- Security
  - Keep refresh tokens secure.
  - Consider HttpOnly cookies for the refresh token in production.

State management (Redux)
- Slices
  - authSlice — user and token state.
  - roomsSlice — room metadata and list.
  - messagesSlice — message lists keyed by room id.
  - uiSlice — theme, open drawer, modals.
- Middleware
  - signalrMiddleware — route SignalR events to the store.
  - tokenMiddleware — attach token to API calls and handle 401 responses.

Theming and responsive design
- Tailwind config supports light and dark themes.
- Theme toggle persists in local storage.
- Breakpoints ensure chat panes collapse on small screens.
- Components use semantic HTML for accessibility.

Testing
- Unit tests: Jest and React Testing Library.
- Test ideas
  - Auth flow and token refresh.
  - SignalR hook reconnection behavior simulated with a mock hub.
  - Message sending pipeline and redux updates.
- Run tests
  npm run test

Deployment
- Build: npm run build
- Host options
  - Vercel — automatic Next.js support.
  - Docker — build a lightweight image that serves the Next.js app.
- Docker (example)
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  EXPOSE 3000
  CMD ["npm", "start"]

Releases
[![Download Release](https://img.shields.io/github/downloads/Megamivp/calvero-club-chat-web/total?label=Downloads&style=for-the-badge)](https://github.com/Megamivp/calvero-club-chat-web/releases)

Visit the Releases page to download packaged builds. If you pick an asset with an installer or a zip package, download that file and execute the included script or follow the release notes. For example:
- Download calvero-club-chat-web-v1.2.3.zip
- Unzip
- cd calvero-club-chat-web-v1.2.3
- Run the included script (install.sh) or run:
  npm ci
  npm run start

Contributing
- Fork the repo and create a branch for your feature.
- Keep commits small and focused.
- Follow the code style and run lint and tests before a PR.
- Open an issue for large changes to discuss the design.
- Add tests for new features.

Project structure (short)
- /components — UI components
- /hooks — custom hooks (useSignalR, useAuth, useTheme)
- /pages — Next.js pages
- /store — Redux slices and middleware
- /styles — Tailwind and global styles
- /public — static assets and logos
- /docs — screenshots and design notes

Code style
- TypeScript strict mode on.
- ESLint with recommended React rules.
- Prettier for formatting.
- Tailwind for layout and spacing.

Accessibility
- Keyboard navigation for message list and room switch.
- ARIA attributes for live regions and forms.
- Contrast checks for dark mode.

FAQ
Q: Do I need the API to run the frontend?
A: Yes. The app expects the Calvero Club Chat API for auth, rooms, and message persistence. For local testing use a mock server or the API dev instance.

Q: Does the app store tokens in cookies?
A: By default the app stores tokens in localStorage. You can change TOKEN_STORAGE and adapt the auth middleware to use HttpOnly cookies for better security.

Q: How do I debug SignalR?
A: Enable verbose logs in the SignalR client. Use Redux DevTools to inspect events and state changes.

Troubleshooting
- 401 on API calls: confirm NEXT_PUBLIC_API_URL and valid tokens.
- No real-time messages: verify the ws URL and that the JWT is present in the connection.
- Reconnect loops: check hub server logs and client backoff policy.

License
MIT

GitHub topics
authentication, chat-app, community, dark-mode, frontend, jwt, messaging, modern-ui, modular, nextjs, open-source, react, real-time, redux, responsive, signalr, socket, tailwindcss, typescript, webapp

Additional resources
- SignalR docs: https://docs.microsoft.com/aspnet/core/signalr
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Releases: https://github.com/Megamivp/calvero-club-chat-web/releases