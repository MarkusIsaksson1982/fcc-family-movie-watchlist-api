# Family Movie Watchlist API

My solution to freeCodeCamp's [Build a Family Movie Watchlist API](https://www.freecodecamp.org/learn/back-end-development-and-apis-v9/lab-family-movie-watchlist-api/build-a-family-movie-watchlist-api) lab (Back End Development and APIs). Node.js + Express 5, JWT auth, ES modules. Watchlists are stored in `data/watchlists.json`.

## Auth

`POST /api/auth/login` returns a JWT. Send it as `Authorization: Bearer <token>` on watchlist routes.

Parents can add, update, or delete movies on any user's list. Children can only modify their own list. Any authenticated user can read any list.

Seed accounts in `data/users.json` (fictional lab users; plaintext demo passwords are in the `_password` field):

| Username | Password | Role | User id |
|---|---|---|---|
| `dad_miller` | `parent456` | parent | 1 |
| `mom_miller` | `parent123` | parent | 2 |
| `jake_miller` | `child123` | child | 3 |
| `sophie_miller` | `child456` | child | 4 |

## API

| Request | Auth | Success |
|---|---|---|
| `GET /` | no | `"Family Movie Watchlist API"` |
| `POST /api/auth/login` `{ "username", "password" }` | no | `200 { "token" }` |
| `GET /api/watchlist/:userId` | any logged-in user | `200` watchlist array |
| `POST /api/watchlist/:userId/movies` `{ "title", "genre" }` | parent, or child on their own list | `201` created movie (`watched` starts `false`) |
| `PUT /api/watchlist/:userId/movies/:movieId` | parent, or child on their own list | `200` updated movie |
| `DELETE /api/watchlist/:userId/movies/:movieId` | parent, or child on their own list | `200 { "message": "Movie deleted." }` |

Missing login fields return `400`. Bad credentials, a missing token, or an invalid token return `401`. A child modifying someone else's list returns `403 { "error": "Access denied" }`. Unknown user or movie ids return `404`.

## Run

Create a `.env` file in the project root (not committed):

```
PORT=3000
```

```bash
npm install
npm start   # http://localhost:3000
```
