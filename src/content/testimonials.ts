/* `avatar` refers to the generated variants under public/img (see scripts/build-assets.mjs). */

export const testimonialSection = {
  eyebrow: 'Das sagen unsere Mandanten',
  headline: 'Echte Ergebnisse. Echte Menschen.',
} as const;

export const testimonials = [
  {
    quote:
      'Cedrik überzeugt durch eine herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen. Seine Vertrauenswürdigkeit und Zuverlässigkeit machen ihn zu einem idealen Ansprechpartner für alle, die eine professionelle und individuelle Beratung suchen. Kleine Extras wie eine regelmäßige Überprüfung der bestehenden Verträge zeigen, dass er auch langfristig an einer optimalen Absicherung seiner Kunden interessiert ist.',
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    avatar: 'avatar-winsome',
  },
  {
    quote:
      'Dank der Beratung von Herrn Leibinn konnte ich mich voll und ganz auf mein Kerngeschäft konzentrieren, ohne mir Sorgen um meinen Vermögensaufbau machen zu müssen. Als Selbstständiger ist Zeit für mich das wertvollste Gut, und durch die klaren, effizienten Strategien, die er für mich entwickelt hat, wurde mein finanzieller Fortschritt gesichert.',
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    avatar: 'avatar-tom',
  },
  {
    quote:
      'Als Anwalt bin ich es gewohnt, komplexe Sachverhalte zu durchdringen und sichere Entscheidungen zu treffen. Bei meinen Investments und Versicherungen verlasse ich mich deshalb voll und ganz auf die Expertise von Herrn Leibinn. Besonders schätze ich die transparente Kommunikation und das fundierte Fachwissen, das mir bei jeder Entscheidung hilft, die richtigen Weichen für die Zukunft zu stellen.',
    name: 'Luka Šilić',
    role: 'Anwalt',
    avatar: 'avatar-luka',
  },
] as const;
