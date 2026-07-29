# GSOCK ID — Digital Identity Platform

A production-ready, mobile-first digital identity card platform for GSOCK club members. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Firebase Firestore. NFC stickers redirect to `https://id.gsock.tech/member/{username}` for instant profile access.

---

## Features

| Feature | Description |
|---------|-------------|
| **Member Profiles** | SSR-rendered profile pages with avatar, bio, skills, projects, certificates, achievements |
| **NFC/QR Integration** | Physical NFC stickers + QR codes point to `/member/{username}` |
| **Native Share Sheet** | Share Profile button triggers OS-native share (WhatsApp, Bluetooth, Messages, etc.) |
| **Admin Dashboard** | Full CRUD for members — add/edit/delete, search, status toggle (Verified/Unverified/Inactive) |
| **PWA Ready** | Service worker, manifest, installable on mobile, offline caching |
| **Security Hardened** | CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy |
| **Performance Optimized** | `stale-while-revalidate` caching, font `display: swap`, lazy Firebase init, preconnect hints |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (`@theme inline`)
- **Database**: Firebase Firestore (via Admin SDK server-side, Client SDK client-side)
- **Auth**: Firebase Auth (email/password for admin)
- **QR Codes**: `qrcode.react`
- **Icons**: Inline SVG (zero dependencies)

---

## Project Structure

```
gsock-id/
├── public/
│   ├── icons/              # PWA icons (192px, 512px SVG)
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker (network-first for member pages)
├── src/
│   ├── app/
│   │   ├── api/member/[memberId]/route.ts   # REST endpoint with caching
│   │   ├── member/[memberId]/
│   │   │   ├── page.tsx         # SSR member profile
│   │   │   ├── loading.tsx      # Skeleton loading state
│   │   │   ├── not-found.tsx    # 404 page
│   │   │   └── opengraph-image.tsx # Dynamic OG image
│   │   ├── admin/
│   │   │   ├── login/page.tsx   # Admin login (Firebase Auth)
│   │   │   └── dashboard/page.tsx # Admin CRUD dashboard
│   │   ├── layout.tsx           # Root layout + inline SW/Error scripts
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css          # Tailwind v4 theme + safe-area insets
│   ├── components/
│   │   ├── admin/               # Admin components (AuthGuard, MemberForm, MemberList, StatusBadge)
│   │   └── profile/             # Profile components (ProfileCard, ProfileTabs, MemberIdCard, etc.)
│   ├── lib/
│   │   ├── firebase-admin.ts    # Server-only Admin SDK (lazy init)
│   │   ├── firebase-client.ts   # Client SDK (lazy getters with window guard)
│   │   └── get-member.ts        # Server-side data fetcher + normalization
│   └── types/
│       └── member.ts            # TypeScript interfaces matching Firestore schema
├── next.config.ts               # Security headers, image config, cache headers
├── tsconfig.json
├── package.json
└── .env.local                   # Firebase credentials (not committed)
```

---

## Firestore Data Model

**Collection**: `members`  
**Document ID**: `username` (e.g., `tanisha.25bhi10126`)

```typescript
interface Member {
  username: string;           // document ID
  name: string;
  email: string;
  phone: string;
  clubrole: string;
  department: string;
  year: string;
  bio: string;
  "registration number": string;  // note: space in field name
  "profile Image": string;        // note: space in field name
  skills?: string[];
  projects?: Project[];
  certificates?: Certificate[];
  achievements?: Achievement[];
  github?: string;
  linkedin?: string;              // can also be in social.LinkedIn map
  portfolio?: string;
  status?: "Verified" | "Unverified" | "Inactive";
}
```

**Nested objects** (arrays of objects):

```typescript
interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemo: string;
}

interface Certificate {
  name: string;
  issuingOrganization: string;
  issueDate: string; // ISO date or "2024-06"
}

interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
}
```

> **Note**: The code normalizes legacy data — `linkedin` is read from `social.LinkedIn` map, `achievements`/`certificates`/`projects` arrays are filtered to keep only valid objects (ignoring empty strings).

---

## Getting Started

### Prerequisites

- Node.js 20+
- Firebase project (`nfc-portfolio-45bcb` or your own)
- Domain `id.gsock.tech` pointed to Vercel (or use `localhost:3000`)

### 1. Clone & Install

```bash
git clone <repo-url>
cd gsock-id
npm install
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
# Client (NEXT_PUBLIC_ prefix exposes to browser)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Server (Admin SDK) — NEVER expose these to client
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nXXXX\n-----END PRIVATE KEY-----\n"
```

> **Tip**: Get the service account key from Firebase Console → Project Settings → Service Accounts → Generate New Private Key. Escape newlines in the private key as `\n`.

### 3. Run Development Server

```bash
npm run dev
# Opens http://localhost:3000
```

### 4. Create Admin User

1. Go to [Firebase Console](https://console.firebase.google.com) → your project → **Authentication** → **Users**
2. Click **Add user** → enter email + password
3. Login at `/admin/login` with those credentials

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Import in Vercel → Framework: **Next.js** (auto-detected)
3. Add all environment variables from `.env.local` to Vercel Project Settings → Environment Variables
4. Deploy → Vercel provides `*.vercel.app` URL
5. In Vercel → Settings → Domains → Add `id.gsock.tech` → configure DNS (CNAME to `cname.vercel-dns.com`)

---

## NFC Sticker Setup

1. Buy NTAG213/215/216 stickers
2. Write NDEF record: **URL** → `https://id.gsock.tech/member/{username}`
3. Test: tap sticker with phone → opens profile instantly

> The profile page is SSR-rendered with proper Open Graph tags for link previews in WhatsApp/Slack.

---

## Admin Panel Usage

| Action | How |
|--------|-----|
| **Add member** | Click "Add Member" → fill form → Save |
| **Edit member** | Click "Edit" on any row → modify → Save |
| **Delete member** | Click "Delete" → confirm |
| **Toggle status** | Click "Deactivate"/"Activate" — cycles Verified → Unverified → Verified |
| **Search** | Type in search box (filters by name or username) |

**Form fields** match Firestore schema exactly. Arrays (skills, projects, certificates, achievements) have dynamic "Add/Remove" rows.

---

## Security Checklist

- [x] CSP with strict `script-src`, `connect-src` (Firebase + WebSocket for HMR)
- [x] HSTS (2 years, preload)
- [x] `X-Frame-Options: DENY`
- [x] `X-Content-Type-Options: nosniff`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- [x] Admin SDK only in `import "server-only"` modules
- [x] Client SDK lazy-initialized behind `typeof window !== "undefined"`
- [x] API route checks `status !== "Verified"` → 403
- [x] Service worker bypasses `/_next/*` chunks (dev HMR stability)

---

## Performance

| Metric | Target |
|--------|--------|
| LCP (member page) | < 1.5s |
| CLS | < 0.05 |
| TTI | < 2s |
| Bundle (gzipped) | < 50 KB JS + CSS |

**Caching strategy**:
- `/api/member/:id` → `max-age=60, s-maxage=300, stale-while-revalidate=600`
- PWA icons/manifest → `max-age=1yr, immutable`
- Member HTML → `no-store` (always fresh SSR)

---

## Accessibility

- Semantic HTML5 (`header`, `main`, `footer`, `section`, `nav`)
- Focus-visible outlines on all interactive elements
- `min-height: 44px` touch targets on mobile
- Safe-area insets for iPhone notch/Dynamic Island
- `prefers-reduced-motion` respected
- Color contrast ≥ 4.5:1 (WCAG AA)

---

## Extending the Schema

To add a new field (e.g., `twitter`):

1. Add to `src/types/member.ts`:
   ```typescript
   twitter?: string;
   ```
2. Update `get-member.ts` normalization:
   ```typescript
   twitter: raw.twitter ?? "",
   ```
3. Add form field in `src/components/admin/MemberForm.tsx`
4. Display in `ProfileCard.tsx` or `ProfileClubRole.tsx`
5. Run `npm run build` — TypeScript catches missing updates

---

## Scripts

```bash
npm run dev        # Development (Turbopack)
npm run build      # Production build
npm run start      # Run production server
npm run lint       # ESLint (Next.js config)
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| ChunkLoadError in dev | Clear `.next` cache: `rm -rf .next && npm run dev` |
| LinkedIn/GitHub not showing | Ensure Firestore has `social.LinkedIn` or top-level `linkedin`/`github` fields |
| Admin login redirects to login | Create user in Firebase Auth console |
| PWA not installing | Serve over HTTPS (localhost works via `localhost` exception) |
| QR code not scanning | Ensure URL is `https://id.gsock.tech/member/{username}` (no trailing slash) |

---

## License

MIT — Built for GSOCK Club.