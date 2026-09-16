# Content sign-off

The brief was to keep all existing copy. **Every piece of marketing copy from the
original build is reproduced verbatim** — same words, same punctuation, same
order. Nothing was rewritten, shortened or dropped.

This was checked mechanically: all 111 prose strings extracted from the original
components were confirmed to appear character for character in the new
`src/content/` modules. Exactly one client string changed, and it is not visible
copy — see _One changed string_ below.

This file lists the strings that did **not** come from the client, so they can be
reviewed. They fall into three groups: functional UI text for features that did
not exist before, accessibility text that is never visible, and the legal
scaffolding.

---

## 0. One changed string

The portrait's `alt` attribute — invisible text, read only by screen readers and
shown if the image fails to load.

|         |                                                  |
| ------- | ------------------------------------------------ |
| **Was** | `Cedrik - Geschäftsführer`                       |
| **Now** | `Cedrik Leibinn, Gründer von Leibinn Consulting` |

Changed because the visible caption directly beneath the photograph says
**Gründer**, and the old `alt` said **Geschäftsführer** — two different roles. If
_Geschäftsführer_ is the correct title, the caption is the one to change, and
this `alt` should follow it. Tell me which is right and I'll align both.

The visible caption itself ("Ihr Ansprechpartner und Gründer - Cedrik Leibinn")
is unchanged.

---

## 1. Form text (new — the forms previously had no validation or feedback)

The original forms had no `onSubmit`, no validation and no result states, so none
of this had an equivalent. In `src/content/contact.ts` → `formMessages`.

| Key               | German text                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `required`        | Bitte füllen Sie dieses Feld aus.                                                          |
| `invalidEmail`    | Bitte geben Sie eine gültige E-Mail-Adresse ein.                                           |
| `tooShort`        | Bitte geben Sie etwas mehr Kontext an.                                                     |
| `consentRequired` | Bitte stimmen Sie der Datenschutzerklärung zu.                                             |
| consent label     | Ich habe die **Datenschutzerklärung** gelesen und stimme der Verarbeitung meiner Daten zu. |
| `submitting`      | Wird gesendet …                                                                            |
| `successTitle`    | Vielen Dank für Ihre Anfrage.                                                              |
| `successBody`     | Wir melden uns zeitnah persönlich bei Ihnen.                                               |
| `errorTitle`      | Das hat leider nicht geklappt.                                                             |
| `errorBody`       | Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.                    |

Also shown only when mail credentials are missing (i.e. never in production once
configured):

> Entwicklungsmodus: Es sind noch keine E-Mail-Zugangsdaten hinterlegt, die
> Anfrage wurde nur protokolliert.

**The consent checkbox is legally required** (Art. 6(1)(a) / Art. 13 DSGVO) and
must stay unchecked by default — a pre-ticked box is not valid consent
(EuGH C-673/17, "Planet49"). Its wording can be adjusted; its presence should not
be removed.

---

## 2. Navigation and interface labels

| Where                | Text                    | Note                                              |
| -------------------- | ----------------------- | ------------------------------------------------- |
| Footer column        | Navigation              | New — footer previously had no columns            |
| Footer column        | Rechtliches             | New — same                                        |
| Header (legal pages) | Zur Startseite          | New — replaces the section links off the homepage |
| Legal pages          | ← Zurück zur Startseite | New                                               |

Everything else in the header and footer reuses labels that already existed
(Leistungen, Prozess, Vertrauen, FAQ, Beratung anfragen, Datenschutz, Impressum).

Say the word and the two footer column headings can be removed or made
screen-reader-only; they are structural, not marketing.

---

## 3. 404 page (new — the route did not exist and returned a blank page)

> **404**
> Diese Seite gibt es nicht.
> Möglicherweise wurde die Adresse falsch eingegeben oder der Inhalt ist nicht
> mehr verfügbar.
> Buttons: _Zur Startseite_ · _Kontakt aufnehmen_

---

## 4. SEO metadata (never rendered on the page)

Used for the browser tab, search results and link previews. Drafted from the
existing hero and footer copy.

- **Title:** Leibinn Consulting — Steueroptimierte Immobilienstrategien
- **Description:** Verwandeln Sie Ihre Steuerlast in langfristiges
  Immobilienvermögen. Strukturierte Immobilien- und Steuerstrategien für
  Unternehmer, Führungskräfte und Privatanleger.

The previous values were `Cedrik LP3` as the page title with `lang="en"` and
bolt.new's default placeholder share image.

---

## 5. Accessibility text (invisible — read only by screen readers)

Announced to assistive technology, never shown on screen:

- Skip link: _Zum Inhalt springen_
- Menu button: _Menü öffnen_ / _Menü schließen_
- Landmarks: _Hauptnavigation_, _Seitenbereiche_, _Rechtliches_
- Logo link: _Leibinn Consulting — zur Startseite_
- Portrait `alt`: _Cedrik Leibinn, Gründer von Leibinn Consulting_
- Honeypot field label: _Firma (nicht ausfüllen)_

Decorative images carry an empty `alt` so screen readers skip them, which is the
correct treatment. The `alt` on the final CTA photograph (_Moderne Immobilie_)
was already in the original.

---

## 6. Legal pages (new — both links previously led nowhere)

`/impressum` and `/datenschutz` are complete structural drafts following § 5 DDG,
§ 18 MStV and the Art. 13 DSGVO information duties.

**Every value that could not be known is rendered as a visible yellow marker
rather than invented.** Outstanding items:

**Impressum** — firm name, legal form, street, postcode and city, telephone,
email, register court and number, VAT ID, trade permission (§ 34c/d/f/i GewO) and
supervisory authority, photographer credit.

**Datenschutz** — controller's address and contact, whether a data protection
officer is appointed, confirmation of the processing agreements with Vercel and
Resend, the competent state data protection authority, and the version date.

The technical statements in the Datenschutzerklärung are accurate for this build:
fonts are self-hosted (no Google Fonts transfer), no tracking or analytics cookies
are set, and the forms relay by email through Resend. The Pexels section is
rendered conditionally and disappears automatically once the photographs are
self-hosted.

> This is a structured draft, not legal advice. Have it reviewed before go-live.
