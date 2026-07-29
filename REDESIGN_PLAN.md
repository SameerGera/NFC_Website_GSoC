# GSOCK ID — Redesign Implementation Plan

## Design Reference
- **Theme**: Warm cream/peach background, orange/amber accents
- **Cards**: White with subtle peach border, rounded-2xl
- **Avatar**: Circular, centered, with thin border
- **Name**: Bold, dark brown, with blue verified badge
- **Social links**: Circular icon buttons (orange themed)
- **Tabs**: Pill-shaped (Overview / Projects / Credentials)
- **Sections**: White cards with orange icon circle headers
- **QR Code**: Member ID card section with download/share
- **Skills**: Orange bordered chips
- **Mobile-first**: Optimized for NFC tap → phone view

---

## Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#FFF5EB` | Page background |
| `--card` | `#FFFFFF` | Card background |
| `--card-border` | `#F3E8DB` | Card border |
| `--orange` | `#F97316` | Primary accent |
| `--orange-light` | `#FB923C` | Hover / secondary |
| `--orange-bg` | `#FFF7ED` | Tag/chip background |
| `--text-primary` | `#1C1917` | Headings |
| `--text-secondary` | `#78716C` | Body / labels |
| `--verified` | `#3B82F6` | Verified badge |

---

## Component Architecture

### 1. `globals.css`
- Warm cream background (`#FFF5EB`)
- Orange accent variables
- Mobile tap optimization
- Safe area padding for notched phones

### 2. `ProfileCard.tsx` (Server Component)
- Circular avatar (96px) with peach ring
- Name (bold, 20px) + blue verified checkmark SVG
- Member ID (14px, warm gray)
- Department • Year • Role (14px, centered)
- Club team label

### 3. `ProfileLinks.tsx` (Server Component)
- Horizontal row of circular buttons (40px)
- Orange background, white icon SVG
- GitHub, LinkedIn, Globe, Email icons
- Open in new tab

### 4. `ProfileTabs.tsx` (Client Component)
- Pill-shaped tab bar: Overview | Projects | Credentials
- Active tab: orange background, white text
- Inactive: transparent, dark text
- State managed via `useState`

### 5. `ProfileAbout.tsx` (Server Component)
- Section header with orange circle icon + "About Me"
- Bio text in warm gray

### 6. `ProfileSkills.tsx` (Server Component)
- Section header with orange circle icon + "Skills"
- Flex-wrap chips: white bg, orange border, orange text
- Rounded-full pills

### 7. `MemberIdCard.tsx` (Client Component)
- Section header: "Member ID Card"
- QR code (generated from profile URL)
- Download QR button (orange)
- Share Profile button (outlined)

### 8. `ProfileClubRole.tsx` (Server Component)
- Section header: "Club Role"
- Icon-labeled rows: Email, LinkedIn, GitHub, Portfolio, Location
- Each row: icon (orange) + label + value

### 9. `ProfileProjects.tsx` (Server Component)
- Section header with "View all" link
- Horizontal scroll cards (mobile) / grid (desktop)
- Thumbnail image, title, tech tags, GitHub/Live Demo links

### 10. `ProfileCertificates.tsx` (Server Component)
- Section header with "View all" link
- Horizontal scroll cards
- Org logo, cert name, org name, date, external link icon

### 11. `ProfileAchievements.tsx` (Server Component)
- Section header with "View all" link
- Timeline-style cards

### 12. `ProfileStatus.tsx` (Server Component)
- Warm theme error state (not dark)
- Orange warning icon

### 13. `page.tsx` (Member Page)
- Cream background
- Pass member data to all components
- Tab state managed in child client component

---

## File Creation/Update Order
1. `globals.css` — warm theme variables
2. `ProfileCard.tsx` — avatar + name + badge
3. `ProfileLinks.tsx` — circular social buttons
4. `ProfileTabs.tsx` — NEW tab component
5. `ProfileAbout.tsx` — renamed from ProfileBio
6. `ProfileSkills.tsx` — orange chips
7. `MemberIdCard.tsx` — NEW QR + download
8. `ProfileClubRole.tsx` — NEW icon rows
9. `ProfileProjects.tsx` — card redesign
10. `ProfileCertificates.tsx` — card redesign
11. `ProfileAchievements.tsx` — section redesign
12. `ProfileStatus.tsx` — warm theme
13. `page.tsx` — new layout
14. `page.tsx` (landing) — warm theme
15. `layout.tsx` — warm theme body bg

---

## Dependencies to Install
- `qrcode.react` — QR code generation for Member ID Card

---

## Mobile Optimizations
- All touch targets ≥ 44px
- `-webkit-tap-highlight-color: transparent`
- `overscroll-behavior: none`
- `viewport-fit: cover` for notched phones
- Horizontal scroll sections for projects/certs
- Sticky tab bar at top (optional)
- Bottom safe area padding
