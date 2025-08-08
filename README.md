# 🚀 Calvero Club Chat Web

<img src="https://chat.calvero.club/favicon.ico" width="64" height="64" alt="Calvero Club Logo" />

> ⭐ **Star, contribute and join the community!**

---

## 📝 About

Calvero Club Chat Web is a modern, secure, real-time chat application built with Next.js, TypeScript, and Tailwind CSS. It features instant messaging via SignalR, JWT-based authentication, and room management. The frontend works seamlessly with the Calvero Club Chat API.

- **API & Server:** [`calvero-club-chat-api`](https://github.com/Xjectro/calvero-club-chat-api)
- **Web Interface:** [`calvero-club-chat-web`](https://github.com/Xjectro/calvero-club-chat-web)
- **Demo:** [chat.calvero.club](https://chat.calvero.club)

---

## ✨ Features

- ⚡ Real-time chat (SignalR)
- 🔒 JWT-based authentication
- 👤 User registration & session management
- 💬 Create, join, and manage chat rooms
- 🎨 Modern and responsive UI (Next.js + Tailwind CSS)
- 🌙 Dark mode support
- 🧩 Modular component architecture
- 🧹 Clean and readable code

---

## ⚙️ Installation

### Requirements

- Node.js 18+
- npm, yarn, or pnpm

### Getting Started

```powershell
# Clone the repository
git clone https://github.com/Xjectro/calvero-club-chat-web.git
cd calvero-club-chat-web

# Install dependencies
npm install
# or
yarn install

# Configure environment variables
# Edit the .env file and set your API address

# Start the development server
npm run dev
# or
yarn dev
```

---

## 🌐 Environment Variables

Configure your API address and site title in the `.env` file:

```
SITE_TITLE=Calvero
SITE_URL=http://localhost:3000
API_URL=https://chat-api.calvero.club

NEXT_PUBLIC_SITE_TITLE=${SITE_TITLE}
NEXT_PUBLIC_SITE_URL=${SITE_URL}
NEXT_PUBLIC_API_URL=${API_URL}
```

---

## 📡 API Integration

This frontend works with the [Calvero Club Chat API](https://github.com/Xjectro/calvero-club-chat-api) for authentication, messaging, and room management. Make sure the API is running and accessible at the address specified in your `.env` file.

---

## 🖥️ User Features

- **Register & Login:** Users can register and log in.
- **Room Management:** Create, join, and list chat rooms.
- **Messaging:** Send and receive real-time messages, emoji support.
- **Profile:** View and edit user profile.
- **Responsive Design:** Works on desktop and mobile.

---

## 🤝 Contributing

Pull requests and suggestions are always welcome! Fork, star, and send a PR! ✨

---

## 📄 License

MIT

---

> 👨‍💻 Developer: [Xjectro](https://github.com/Xjectro)
> 
> 🚀 Demo & test: [chat.calvero.club](https://chat.calvero.club)
