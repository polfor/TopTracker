# TopTracker (name pending)

A Nuxt3 - MongoDB App hosting different games based on the Spotify API

---

Games pitched :

- Guessing who has a select song in their spotify top songs
- Spotify Artists Wordle (based on your favourite artists)
- Blind Test based on music styles common to the lobby's users
- Guess an album based on an album cover

## Setup

Make sure to install the dependencies:

```bash
npm install
```

Don't forget to create your .env file based on [.env.example](.env.example)

Start the MongoDB docker

```bash
docker-compose up -d
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

## Dev Philosophy

- Test every logic using vitest
- Use husky for pre-commit testing and linting
