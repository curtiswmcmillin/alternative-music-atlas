// ─────────────────────────────────────────────────────────────
// data.js — the source of truth for the Alternative Music Atlas
//
// This file is pure data. Edit it to add eras, sub-genres, or
// detailed essays; the UI will pick up your changes on reload.
//
// Schema:
//   eras: [Era]                 — top-level timeline entries
//   subGenreFamilies: [Family]  — groups of sub-genres under a parent era
//
// Era fields:
//   id, number, name, dates, summary, narrative
//   isOrigin?: boolean, originNote?: string
//   keyBands: [Band]
//   signatureTrack?: Track
//
// Band fields:
//   name, years, location, note
//   isTouchstone?: boolean   — marks an era-defining band (★)
//   spotify?: string         — full URL; if omitted, app.js falls back to a search URL
//   appleMusic?: string      — full URL; if omitted, app.js falls back to a search URL
//
// SubGenre fields (basic):
//   id, name, origin, summary, bands: [string]
//   signatureTrack?: Track
//
// SubGenre fields (detailed — set `detailed: true`):
//   sections: [{heading, text}]
//   firstWave, secondWave: {title, context?, bands: [{name, note}]}
//   offshoots: [Offshoot]
//   mainstream, culturalNote: string
//
// Offshoot fields:
//   id, name, desc, bands: [string]
//   signatureTrack?: Track
//
// Track fields (the one song that captures a taxonomy level):
//   title, artist, spotify?, appleMusic?
// ─────────────────────────────────────────────────────────────

window.MUSIC_DATA = {
  meta: {
    title: "Alternative",
    subtitle: "A field guide, from the Velvet Underground to now",
    credit: "An atlas of the music that lived beside the mainstream"
  },

  // ═══════════════════════════════════════════════════════════
  // ERAS — the main timeline
  // ═══════════════════════════════════════════════════════════

  eras: [
    {
      id: "proto-alt",
      number: "01",
      name: "Proto-alternative",
      dates: "1965–1973",
      summary: "The spiritual origin. Bands that sold almost nothing but taught every alternative band that came after.",
      narrative: "Alternative doesn't start with a scene — it starts with a posture. In the late 1960s, a handful of bands paired pop songcraft with noise, drone, art-world sensibility, and literary subject matter. They were too strange to sell, but too exciting to ignore. Decades later, every alternative band would cite one of them as a turning point.",
      isOrigin: true,
      originNote: "Spiritual origin",
      signatureTrack: { title: "Sister Ray", artist: "The Velvet Underground" },
      keyBands: [
        {
          name: "The Velvet Underground",
          years: "1964–1973",
          location: "New York",
          isTouchstone: true,
          note: "Brian Eno famously said only a few thousand people bought their debut — but every one of them started a band. That's the alternative thesis in a sentence."
        },
        {
          name: "The Stooges",
          years: "1967–1974",
          location: "Ann Arbor, MI",
          note: "Iggy Pop's raw, confrontational proto-punk. Completely out of step with 1969; the template for everyone after 1975."
        },
        {
          name: "Big Star",
          years: "1971–1974",
          location: "Memphis",
          note: "Impossibly perfect power-pop that nobody heard until the 80s indie scene canonized them."
        }
      ]
    },

    {
      id: "punk",
      number: "02",
      name: "Punk",
      dates: "1975–1978",
      summary: "The ethos — strip it back, start a label, anyone can play.",
      narrative: "Punk didn't invent the attitude, but it codified it. Three chords, your own record label, your own fanzine, your own scene. Every alternative scene afterward — from hardcore to indie to bedroom pop — inherits punk's DIY proof.",
      signatureTrack: { title: "Anarchy in the U.K.", artist: "Sex Pistols" },
      keyBands: [
        {
          name: "Ramones",
          years: "1974–1996",
          location: "New York",
          note: "Two-minute songs, leather jackets, absolute economy. Made punk legible as a sound."
        },
        {
          name: "Sex Pistols",
          years: "1975–1978",
          location: "London",
          note: "More of a provocation than a band. Lasted two years, changed British youth culture permanently."
        },
        {
          name: "The Clash",
          years: "1976–1986",
          location: "London",
          note: "Punk's conscience — proof that punk could grow without softening."
        }
      ]
    },

    {
      id: "post-punk",
      number: "03",
      name: "Post-punk",
      dates: "1978–1982",
      summary: "What happened after punk — angular, intellectual, sonically expansive.",
      narrative: "Once punk had proved anyone could start a band, the smartest bands asked: now what? The answer was post-punk — chilly atmospheres, angular guitars, dub influences, literary ambition. This is where the template for alternative as a sound (not just an ethos) really gets drawn.",
      signatureTrack: { title: "Love Will Tear Us Apart", artist: "Joy Division" },
      keyBands: [
        {
          name: "Joy Division",
          years: "1976–1980",
          location: "Manchester",
          note: "Ian Curtis, Martin Hannett's cavernous production, and an existential weight no one has really matched."
        },
        {
          name: "Wire",
          years: "1976–",
          location: "London",
          note: "Terse, art-damaged, constantly reinventing. Three albums in three years, each different."
        },
        {
          name: "Gang of Four",
          years: "1976–2024",
          location: "Leeds",
          note: "Funk rhythms plus Marxist lyrics plus serrated guitar. The whole dance-punk revival of 2001 was listening to their first album."
        },
        {
          name: "Public Image Ltd.",
          years: "1978–",
          location: "London",
          note: "John Lydon's post-Sex Pistols project. Made dub and dissonance central to what post-punk could be."
        }
      ]
    },

    {
      id: "college-rock",
      number: "04",
      name: "College rock",
      dates: "1980–1989",
      summary: "Where “alternative” became a recognizable scene — indie labels, college radio, relentless touring.",
      narrative: "In the 80s, an underground network crystallized: indie labels (SST, Twin/Tone, 4AD, Rough Trade), college radio stations, and a circuit of small clubs. R.E.M. is the band usually credited as the first true alternative band in the modern sense — they built a career entirely outside the major-label system before crossing over. Around them, an entire American underground grew up.",
      isOrigin: true,
      originNote: "First alt scene",
      signatureTrack: { title: "Radio Free Europe", artist: "R.E.M." },
      keyBands: [
        {
          name: "R.E.M.",
          years: "1980–2011",
          location: "Athens, GA",
          isTouchstone: true,
          note: "The archetype. Built a mainstream career on college radio, indie-label discipline, and endless touring. If there's a “first alternative band” in the modern sense, it's this one."
        },
        {
          name: "The Smiths",
          years: "1982–1987",
          location: "Manchester",
          note: "Morrissey's words, Johnny Marr's guitar, five years of perfection, a breakup that still hurts."
        },
        {
          name: "Sonic Youth",
          years: "1981–2011",
          location: "New York",
          note: "Noise and tunings and downtown art influence. Later signed Nirvana to DGC — a direct thread to the 1991 breakthrough."
        },
        {
          name: "Pixies",
          years: "1986–",
          location: "Boston",
          note: "Quiet-loud-quiet dynamics, surreal lyrics. Cobain would openly admit he was ripping them off."
        },
        {
          name: "Hüsker Dü",
          years: "1979–1988",
          location: "Minneapolis",
          note: "Hardcore tempos plus pop melody. The bridge between punk and what would become 90s indie."
        }
      ]
    },

    {
      id: "breakthrough",
      number: "05",
      name: "The 1991 breakthrough",
      dates: "1991–1995",
      summary: "Nirvana knocks Michael Jackson off #1. Alternative becomes an industry category.",
      narrative: "For one compressed stretch of years, the underground became the mainstream. Nevermind displaced Michael Jackson at #1 in January 1992, and the music industry suddenly wanted every band that had been playing to 200 people. The ethos survived the crossover less well than the sound did — but the sound reshaped rock radio for a decade.",
      signatureTrack: { title: "Smells Like Teen Spirit", artist: "Nirvana" },
      keyBands: [
        {
          name: "Nirvana",
          years: "1987–1994",
          location: "Seattle",
          note: "Nevermind (1991) was the crossover moment. Three albums, one flannel shirt, a direct line from the Melvins and Pixies to arenas."
        },
        {
          name: "Pearl Jam",
          years: "1990–",
          location: "Seattle",
          note: "The more classic-rock wing of grunge. Still touring, still selling out stadiums."
        },
        {
          name: "Oasis",
          years: "1991–2009",
          location: "Manchester",
          note: "The loudest band in Britpop and the biggest — arena-sized melodies, Beatles-scaled ambition."
        },
        {
          name: "My Bloody Valentine",
          years: "1983–",
          location: "Dublin / London",
          note: "Loveless (1991) is the shoegaze Rosetta Stone — layered guitar textures that nobody has decoded since."
        }
      ]
    },

    {
      id: "fragmentation",
      number: "06",
      name: "Fragmentation",
      dates: "1996–2009",
      summary: "Alternative splinters. Indie rock consolidates underground; garage and blog-era indie bring it back overground.",
      narrative: "Once alternative was a radio format, the real action moved elsewhere. A smarter indie rock coalesced around Pavement, Built to Spill, and Modest Mouse. The early 2000s garage revival (Strokes, White Stripes, Yeah Yeah Yeahs) brought noisy guitars back to fashion, and the blog era made bands like Arcade Fire, Interpol, and LCD Soundsystem festival-sized without major-label infrastructure.",
      signatureTrack: { title: "All My Friends", artist: "LCD Soundsystem" },
      keyBands: [
        {
          name: "Pavement",
          years: "1989–1999",
          location: "Stockton, CA",
          note: "Lo-fi, literate, gorgeously ragged. The template 90s indie band."
        },
        {
          name: "The Strokes",
          years: "1998–",
          location: "New York",
          note: "Is This It (2001) rebooted the whole idea of guitar rock for the 2000s."
        },
        {
          name: "Arcade Fire",
          years: "2001–",
          location: "Montreal",
          note: "Funeral (2004) was the moment blog-era indie became a stadium affair."
        },
        {
          name: "LCD Soundsystem",
          years: "2002–",
          location: "New York",
          note: "James Murphy welding post-punk, disco, and generational anxiety. Dance-punk at its most articulate."
        }
      ]
    },

    {
      id: "today",
      number: "07",
      name: "Today",
      dates: "2010s–now",
      summary: "Streaming dissolves genre walls. Indie songwriters and post-punk revivals share the stage.",
      narrative: "Alternative now functions more as a mood than a scene — introspective, guitar-leaning, not chart-pop. The two liveliest branches: a wave of emotionally direct songwriters picking up 90s indie's melodic inheritance, and a new UK-led post-punk revival that sounds like Gang of Four rebuilt for the algorithm age.",
      signatureTrack: { title: "Motion Sickness", artist: "Phoebe Bridgers" },
      keyBands: [
        {
          name: "Phoebe Bridgers",
          years: "2014–",
          location: "Los Angeles",
          note: "Quiet, deadpan, devastating. Punisher (2020) was a generational record."
        },
        {
          name: "Mitski",
          years: "2012–",
          location: "New York",
          note: "Sharp, theatrical, emotionally exacting. Be the Cowboy is the inflection point."
        },
        {
          name: "Big Thief",
          years: "2015–",
          location: "Brooklyn",
          note: "Adrianne Lenker's songwriting and a band that plays like it's breathing together."
        },
        {
          name: "Fontaines D.C.",
          years: "2017–",
          location: "Dublin",
          note: "Literary, snarling, unmistakably post-punk — but tuned for headphones and festival stages."
        },
        {
          name: "Idles",
          years: "2009–",
          location: "Bristol",
          note: "Hardcore energy with a political heart. The loudest band in this era."
        }
      ]
    }
  ],

  // ═══════════════════════════════════════════════════════════
  // SUB-GENRE FAMILIES — grouped branches off the main timeline
  // ═══════════════════════════════════════════════════════════

  subGenreFamilies: [
    {
      id: "post-punk-family",
      name: "Post-punk family",
      dates: "1978–1985",
      parentEra: "post-punk",
      summary: "Post-punk's children — four distinct sub-genres all pointing at different horizons.",
      subGenres: [
        {
          id: "goth-rock",
          name: "Goth rock",
          origin: "UK, 1979–",
          summary: "The dark, atmospheric, literary-minded cousin of post-punk — vampires, cathedrals, doomed romance, tribal drums, reverb for days.",
          detailed: true,
          signatureTrack: { title: "Bela Lugosi's Dead", artist: "Bauhaus" },
          sections: [
            {
              heading: "The origin moment",
              text: "Usually pinned to Bauhaus's “Bela Lugosi's Dead” in 1979 — nine minutes of dub-influenced reverb, tribal drumming, and Peter Murphy doing a vampire impression. Almost every convention of goth is already in that one song: cavernous production, flanged guitar, elastic bassline, baritone vocal, horror references."
            },
            {
              heading: "The sound",
              text: "Basslines doing most of the melodic work. Guitars drenched in chorus and reverb rather than distortion. Drum machines or tribal live drumming. Vocals that either swoop operatically (Siouxsie) or rumble in a baritone (Andrew Eldritch). Lyrically: Poe, Baudelaire, vampire films, Catholic imagery, doomed romance."
            }
          ],
          firstWave: {
            title: "First wave",
            bands: [
              { name: "Bauhaus", note: "The ignition point." },
              { name: "Siouxsie and the Banshees", note: "Developing adjacent territory; Kaleidoscope (1980) is proto-goth." },
              { name: "The Cure", note: "The Pornography-era trilogy (1980–82) is the canonical goth Cure." },
              { name: "Killing Joke", note: "Tribal, apocalyptic, hugely influential." },
              { name: "Joy Division", note: "Patron saints — technically post-punk, but the shadow over everything." }
            ]
          },
          secondWave: {
            title: "Second wave — the Batcave era",
            context: "The Batcave, a London nightclub that opened in 1982, became the scene's hub.",
            bands: [
              { name: "The Sisters of Mercy", note: "Andrew Eldritch famously hates being called goth." },
              { name: "The Mission", note: "Sisters splinter group gone anthemic." },
              { name: "Fields of the Nephilim", note: "Spaghetti-western goth. Flour on everything." },
              { name: "Specimen", note: "Batcave house band, glam-goth crossover." },
              { name: "Alien Sex Fiend", note: "Cartoonish, synth-heavy, beloved." }
            ]
          },
          offshoots: [
            {
              id: "deathrock",
              name: "Deathrock",
              desc: "The LA version — rawer, punkier, more horror-movie.",
              bands: ["Christian Death", "45 Grave"],
              signatureTrack: { title: "Romeo's Distress", artist: "Christian Death" }
            },
            {
              id: "ethereal-wave",
              name: "Ethereal wave",
              desc: "Goth's dreamy, shoegaze-adjacent sister. 4AD's house sound.",
              bands: ["Cocteau Twins", "Dead Can Dance", "This Mortal Coil"],
              signatureTrack: { title: "The Host of Seraphim", artist: "Dead Can Dance" }
            },
            {
              id: "gothic-metal",
              name: "Gothic metal",
              desc: "90s metal bands borrowing goth's atmosphere.",
              bands: ["Paradise Lost", "Type O Negative", "My Dying Bride", "HIM"],
              signatureTrack: { title: "Black No. 1 (Little Miss Scare-All)", artist: "Type O Negative" }
            },
            {
              id: "darkwave",
              name: "Darkwave",
              desc: "Goth fused with synthpop and cold electronics.",
              bands: ["Clan of Xymox", "later Sisters of Mercy"],
              signatureTrack: { title: "A Day", artist: "Clan of Xymox" }
            }
          ],
          mainstream: "Crossed over through Nine Inch Nails (industrial with goth DNA), Marilyn Manson, and later Evanescence and AFI. The Cure became one of the biggest alternative bands in the world without ever leaving the genre behind.",
          culturalNote: "Uniquely durable: the only one of these sub-genres that became a permanent subculture, with its own fashion, literature, club nights, and annual festivals (Whitby Goth Weekend in the UK, Wave-Gotik-Treffen in Germany). Most musical genres fade; goth has kept going for 45 years."
        },
        {
          id: "new-wave",
          name: "New wave",
          origin: "UK / US, 1978–1984",
          summary: "Post-punk's pop-friendly side — arty, danceable, radio-ready, without surrendering intelligence.",
          bands: ["Talking Heads", "Blondie", "Devo", "Elvis Costello", "The B-52's"],
          signatureTrack: { title: "Once in a Lifetime", artist: "Talking Heads" }
        },
        {
          id: "synthpop",
          name: "Synthpop",
          origin: "UK, 1979–1985",
          summary: "Synths in front, rhythm machines for a spine, melancholy disco at heart.",
          bands: ["Depeche Mode", "New Order", "The Human League", "Soft Cell", "Erasure"],
          signatureTrack: { title: "Bizarre Love Triangle", artist: "New Order" }
        },
        {
          id: "industrial",
          name: "Industrial",
          origin: "UK / Germany, 1977–",
          summary: "Machines, noise, found sound, transgression. Goth's menacing cousin.",
          bands: ["Throbbing Gristle", "Cabaret Voltaire", "Ministry", "Nine Inch Nails", "Einstürzende Neubauten"],
          signatureTrack: { title: "Head Like a Hole", artist: "Nine Inch Nails" }
        }
      ]
    },

    {
      id: "80s-underground",
      name: "80s underground",
      dates: "1980–1989",
      parentEra: "college-rock",
      summary: "The American underground's sub-genres — each scene tied to specific cities and independent labels.",
      subGenres: [
        {
          id: "jangle-pop",
          name: "Jangle pop",
          origin: "US, 1980–1988",
          summary: "Bright, chiming Rickenbackers and Southern melodic sensibility. R.E.M.'s home territory.",
          bands: ["R.E.M.", "The Feelies", "The dB's", "The Smiths (UK counterpart)"],
          signatureTrack: { title: "So. Central Rain", artist: "R.E.M." }
        },
        {
          id: "hardcore",
          name: "Hardcore",
          origin: "US, 1980–1986",
          summary: "Punk sped up, stripped down, moved to the suburbs. Scene codes and DIY discipline.",
          detailed: true,
          signatureTrack: { title: "Rise Above", artist: "Black Flag" },
          sections: [
            {
              heading: "The origin moment",
              text: "Hardcore congealed almost simultaneously in three American cities around 1980 — LA (Black Flag, Circle Jerks), DC (Bad Brains, Minor Threat), and San Francisco (Dead Kennedys). Each scene rejected the artiness of post-punk and the commercial sheen of new wave in favor of something faster, shorter, angrier, and more disciplined."
            },
            {
              heading: "The sound",
              text: "Songs under two minutes. Tempos that left punk in the dust. Vocals shouted rather than sung. Lyrics about Reagan, conformity, the suburbs, the police, and your own scene's politics. The look — shaved heads, work boots, Xs on hands — became as legible as the music."
            },
            {
              heading: "The discipline",
              text: "Hardcore took punk's DIY ethic and made it a code: your own labels (SST, Dischord, Alternative Tentacles), your own fanzines (Maximum Rocknroll), your own all-ages venues. “Selling out” became a defining moral category. The infrastructure outlasted the music — most American underground rock from 1985 onward inherits hardcore's institutions even when it doesn't sound like it."
            }
          ],
          firstWave: {
            title: "First wave — the three cities",
            bands: [
              { name: "Black Flag", note: "LA. Henry Rollins, Greg Ginn's bent guitar, the SST label as a movement HQ." },
              { name: "Bad Brains", note: "DC. Jamaican-American, jazz-trained, blindingly fast — Rastafarian hardcore." },
              { name: "Minor Threat", note: "DC. Ian MacKaye coined “straight edge” in a 46-second song." },
              { name: "Dead Kennedys", note: "SF. Jello Biafra's satirical attack on Reagan-era America." },
              { name: "Circle Jerks", note: "LA. Ex-Black Flag personnel; tighter, faster, funnier." }
            ]
          },
          secondWave: {
            title: "Second wave — youth crew and beyond",
            context: "By 1986 the original wave had splintered or burned out. The next wave systematized it.",
            bands: [
              { name: "Youth of Today", note: "NYC. Codified straight edge into a uniform and a creed." },
              { name: "Gorilla Biscuits", note: "NYC. Youth crew's most charismatic band." },
              { name: "Cro-Mags", note: "NYC. Krishna-conscious metallic hardcore — the bridge to crossover." },
              { name: "Agnostic Front", note: "NYC. The other defining NYHC band, more streetwise." }
            ]
          },
          offshoots: [
            {
              id: "straight-edge",
              name: "Straight edge / youth crew",
              desc: "The drug-and-alcohol-free wing — Minor Threat's “Straight Edge” (1981) coined it in 46 seconds; Youth of Today turned it into a uniform.",
              bands: ["Minor Threat", "Youth of Today", "Gorilla Biscuits", "Judge", "Chain of Strength"],
              signatureTrack: { title: "Straight Edge", artist: "Minor Threat" }
            },
            {
              id: "post-hardcore",
              name: "Post-hardcore",
              desc: "Hardcore's smarter children — same intensity, weirder time signatures, dub influence, art-school instincts.",
              bands: ["Fugazi", "Drive Like Jehu", "Quicksand", "Jawbox", "At the Drive-In"],
              signatureTrack: { title: "Waiting Room", artist: "Fugazi" }
            },
            {
              id: "screamo",
              name: "Screamo",
              desc: "The chaotic, emotional, blast-beat-adjacent wing. Short songs, screamed vocals, dynamic explosions.",
              bands: ["Saetia", "Orchid", "City of Caterpillar", "Pg.99", "Hot Cross"],
              signatureTrack: { title: "Notres Langues Nous Trompes", artist: "Saetia" }
            },
            {
              id: "powerviolence",
              name: "Powerviolence",
              desc: "Hardcore taken to its logical extreme — songs under 30 seconds, grindcore-fast, deliberately ugly.",
              bands: ["Infest", "Man Is the Bastard", "Crossed Out", "Spazz", "Charles Bronson"],
              signatureTrack: { title: "Cycle of Hate", artist: "Infest" }
            },
            {
              id: "metalcore",
              name: "Metalcore",
              desc: "Hardcore + metal riffs. The 90s underground version (Earth Crisis, Integrity) later spawned the 2000s mainstream version (Killswitch Engage, Converge).",
              bands: ["Earth Crisis", "Integrity", "Converge", "Hatebreed", "Killswitch Engage"],
              signatureTrack: { title: "Concubine", artist: "Converge" }
            }
          ],
          mainstream: "Hardcore as a sound never fully crossed over — it was too abrasive — but its DNA is everywhere downstream. Rage Against the Machine, Refused's The Shape of Punk to Come, and the entire 2000s metalcore wave (Killswitch, Trivium, As I Lay Dying) are unthinkable without it. Henry Rollins became a brand. Ian MacKaye became a moral authority.",
          culturalNote: "More than the music, hardcore left an institutional inheritance: independent labels, all-ages venues, fanzines, the DIY tour circuit, and a vocabulary for talking about scene ethics. Forty years on, those institutions still structure American underground music — even genres that have nothing to do with hardcore's sound run on the infrastructure it built."
        },
        {
          id: "noise-rock",
          name: "Noise rock",
          origin: "US, 1981–1991",
          summary: "Post-hardcore with the volume knob set to menace. Feedback as melody.",
          bands: ["Sonic Youth", "Big Black", "Swans", "The Jesus Lizard"],
          signatureTrack: { title: "Teen Age Riot", artist: "Sonic Youth" }
        },
        {
          id: "dream-pop",
          name: "Dream pop",
          origin: "UK, 1982–",
          summary: "Reverb-drenched atmospheres, breathy vocals, pop bones under the haze. Quietly birthed shoegaze and most of indie's prettier corners.",
          detailed: true,
          signatureTrack: { title: "Cherry-Coloured Funk", artist: "Cocteau Twins" },
          sections: [
            {
              heading: "The origin moment",
              text: "Dream pop coheres around the Cocteau Twins' early-80s 4AD output — Garlands (1982) and especially Treasure (1984). Elizabeth Fraser's wordless soaring vocals and Robin Guthrie's chorus-and-reverb guitar walls established a template that everyone since has either copied or reacted against."
            },
            {
              heading: "The sound",
              text: "Guitars treated as texture rather than riff. Reverb and chorus pedals as primary instruments. Vocals high in the mix but low in legibility — meaning matters less than mood. Tempos drift. Songs end when they end. The whole genre prizes atmosphere over hook, even when the hooks are there."
            },
            {
              heading: "The 4AD aesthetic",
              text: "The British label 4AD didn't just sign dream pop bands — it gave the genre a visual identity through Vaughan Oliver's design work. Album covers as gauzy collages, type half-dissolved into image. The look reinforced the sound: distant, beautiful, slightly unreal."
            }
          ],
          firstWave: {
            title: "First wave — the 4AD years",
            bands: [
              { name: "Cocteau Twins", note: "The genre's anchor band. Twelve albums of the same ravishing thing, somehow never repetitive." },
              { name: "This Mortal Coil", note: "4AD label-mate supergroup. Less a band than a recording project — gorgeous, mostly covers." },
              { name: "A.R. Kane", note: "British duo who arguably invented the term “dream pop” — and the seed of shoegaze." }
            ]
          },
          secondWave: {
            title: "Second wave — American dream pop",
            context: "By the late 80s the sound had crossed the Atlantic and gained a dustier, more nocturnal edge.",
            bands: [
              { name: "Galaxie 500", note: "Boston. Slow, hushed, drugged. The bridge to slowcore." },
              { name: "Mazzy Star", note: "LA. Hope Sandoval's deadpan vocal, country-dream-pop fusion." },
              { name: "Mojave 3", note: "Slowdive's quieter spinoff after shoegaze burned out." },
              { name: "Beach House", note: "Baltimore. The 2000s revival's anchor band — twelve albums of patient mood." }
            ]
          },
          offshoots: [
            {
              id: "shoegaze",
              name: "Shoegaze",
              desc: "Dream pop's loud, guitar-pedal-obsessed sister. Same ethereal vocals, but buried under walls of distorted guitar drones. My Bloody Valentine's Loveless (1991) is the genre's monolith — the rest of the scene has been measured against it for 35 years.",
              bands: ["My Bloody Valentine", "Slowdive", "Ride", "Lush", "Chapterhouse", "Catherine Wheel"],
              signatureTrack: { title: "Only Shallow", artist: "My Bloody Valentine" }
            },
            {
              id: "chillwave",
              name: "Chillwave",
              desc: "Late-2000s synthy revival — dream pop refracted through tape hiss, washed-out 80s nostalgia, and lo-fi production. Briefly inescapable on Pitchfork c. 2010.",
              bands: ["Washed Out", "Toro y Moi", "Neon Indian", "Memory Tapes"],
              signatureTrack: { title: "Feel It All Around", artist: "Washed Out" }
            },
            {
              id: "nu-gaze",
              name: "Nu-gaze / dreamgaze",
              desc: "Modern shoegaze revival — younger bands rediscovering the pedalboard, often crossed with indie pop melodicism.",
              bands: ["DIIV", "Beach Fossils", "Wild Nothing", "No Joy", "Nothing"],
              signatureTrack: { title: "Doused", artist: "DIIV" }
            },
            {
              id: "blackgaze",
              name: "Blackgaze",
              desc: "Shoegaze fused with black metal — the texture and atmosphere of one, the blast beats and tremolo picking of the other. A genuinely new sound born around 2010.",
              bands: ["Deafheaven", "Alcest", "Lantlôs", "Astronoid"],
              signatureTrack: { title: "Dream House", artist: "Deafheaven" }
            }
          ],
          mainstream: "Dream pop never had a true crossover moment, but its texture seeped into nearly every pretty corner of indie rock — Beach House, Cigarettes After Sex, and the lo-fi YouTube radio aesthetic all live downstream. Shoegaze, the louder offshoot, has had multiple revivals; in the streaming era it became one of TikTok's accidental discoveries via Slowdive and Cocteau Twins songs going viral.",
          culturalNote: "The aesthetic outlasted the scene. “Dreamy guitar music” is now a permanent niche in indie — every generation produces a new wave of bands with chorus pedals and reverb-soaked vocals, and they all sound like late-period 4AD whether they know the lineage or not."
        }
      ]
    },

    {
      id: "90s-alt",
      name: "90s alt / indie",
      dates: "1991–1999",
      parentEra: "breakthrough",
      summary: "The most fertile sub-genre decade — fragmentation, specialization, scene after scene.",
      subGenres: [
        {
          id: "grunge",
          name: "Grunge",
          origin: "Seattle, 1988–1994",
          summary: "Heavy, melodic, flannel-wearing, Sub Pop-raised. The sound that broke alternative into the mainstream.",
          bands: ["Nirvana", "Pearl Jam", "Soundgarden", "Alice in Chains", "Mudhoney"],
          signatureTrack: { title: "Black Hole Sun", artist: "Soundgarden" }
        },
        {
          id: "lo-fi-indie",
          name: "Lo-fi indie",
          origin: "US, 1990–1998",
          summary: "4-track recordings, deliberately unpolished, songwriterly. Indie's bedroom era.",
          bands: ["Pavement", "Guided by Voices", "Sebadoh", "Built to Spill", "Neutral Milk Hotel"],
          signatureTrack: { title: "Cut Your Hair", artist: "Pavement" }
        },
        {
          id: "emo",
          name: "Emo",
          origin: "US, 1985–",
          summary: "Post-hardcore's emotional wing. Confessional lyrics, quiet-loud dynamics, and the rare alt sub-genre that grew into a full-blown global youth subculture.",
          detailed: true,
          signatureTrack: { title: "Seven", artist: "Sunny Day Real Estate" },
          sections: [
            {
              heading: "The origin moment",
              text: "Coined in DC around 1985 to describe Rites of Spring — a band of ex-hardcore players whose songs replaced political shouting with personal anguish. Ian MacKaye called it “emotional hardcore,” which collapsed to “emo-core,” which collapsed to “emo.” Most of the original DC bands hated the label."
            },
            {
              heading: "The sound (and how it kept changing)",
              text: "Emo is one of the rare sub-genres where the second wave sounds nothing like the first, and the third wave sounds nothing like either. The constant is the affect: confessional lyrics about doubt, longing, and self-laceration. The container — DC post-hardcore, then Midwest twinkle, then mall-pop crossover — kept getting bigger and more melodic until the music was unrecognizable, but the mood survived."
            }
          ],
          firstWave: {
            title: "First wave — DC emocore",
            bands: [
              { name: "Rites of Spring", note: "The progenitors. One album (1985), a generation's worth of influence." },
              { name: "Embrace", note: "Ian MacKaye's post-Minor Threat band. Bridged hardcore politics into emotional territory." },
              { name: "Dag Nasty", note: "Melodic hardcore with feelings — the obvious bridge to what came next." }
            ]
          },
          secondWave: {
            title: "Second wave — Midwest emo",
            context: "By the mid-90s the center of gravity had shifted to college towns in the Midwest. Twinkly fingerpicked guitars, math rock time signatures, basement-show culture.",
            bands: [
              { name: "Sunny Day Real Estate", note: "Seattle. Diary (1994) is the genre's pivot album — emotional, melodic, no longer hardcore." },
              { name: "Cap'n Jazz", note: "Chicago. Yelping vocals, intricate guitars, a roster that splintered into half the genre's later bands." },
              { name: "Mineral", note: "Texas. The Power of Failing (1997) — patient, soaring, devastating." },
              { name: "American Football", note: "Urbana, IL. One self-titled album (1999), played in odd time signatures, that defined an aesthetic." },
              { name: "The Promise Ring", note: "Milwaukee. Pop-leaning Midwest emo with hooks that travel." }
            ]
          },
          offshoots: [
            {
              id: "midwest-emo",
              name: "Midwest emo",
              desc: "The twinkly, fingerpicked, math-rocky strand. American Football's debut is the founding document; the 2010s revival turned it into a worldwide style.",
              bands: ["American Football", "Cap'n Jazz", "Owls", "Algernon Cadwallader", "Snowing"],
              signatureTrack: { title: "Never Meant", artist: "American Football" }
            },
            {
              id: "screamo-emo",
              name: "Screamo",
              desc: "The chaotic, screamed wing — same scene as hardcore screamo but emo-side: more melodic, more dynamic, equally cathartic.",
              bands: ["Saetia", "City of Caterpillar", "Hot Cross", "Funeral Diner"],
              signatureTrack: { title: "And Hung from Limb to Limb", artist: "City of Caterpillar" }
            },
            {
              id: "third-wave-emo",
              name: "Third-wave / mall emo",
              desc: "The mainstream crossover wave of the early-to-mid 2000s — bigger choruses, eyeliner, side-swept hair, Hot Topic. Critically dismissed at the time, now nostalgically rehabilitated.",
              bands: ["Dashboard Confessional", "Jimmy Eat World", "Taking Back Sunday", "My Chemical Romance", "Fall Out Boy"],
              signatureTrack: { title: "The Middle", artist: "Jimmy Eat World" }
            },
            {
              id: "emo-revival",
              name: "Emo revival",
              desc: "2010s rediscovery of Midwest emo's sound by a new generation of college-town bands. Twinkly guitars, basement shows, cassette releases, Bandcamp culture.",
              bands: ["The World Is a Beautiful Place...", "Modern Baseball", "Tigers Jaw", "Into It. Over It.", "Foxing"],
              signatureTrack: { title: "Your Graduation", artist: "Modern Baseball" }
            }
          ],
          mainstream: "Third-wave emo was inescapable from roughly 2002 to 2007 — Dashboard Confessional on MTV Unplugged, My Chemical Romance headlining festivals, Fall Out Boy ruling pop radio. By the late 2000s the mainstream wave had collapsed into pop-punk and screamo, but the emo revival in the 2010s proved the well wasn't dry.",
          culturalNote: "Almost uniquely among alt sub-genres, emo is now bigger as a global youth subculture than as a sound — the fashion, the affect, and the meme-able sadness travel without the music. “Emo” as a self-description (or insult) lives in everyday teenage vocabulary worldwide. When Riot Fest sold out a 2023 lineup of mostly third-wave emo reunions, it confirmed the scene had become permanently legible to multiple generations."
        },
        {
          id: "post-rock",
          name: "Post-rock",
          origin: "UK / US, 1991–",
          summary: "Rock instruments used non-rock-ly. Textural, instrumental, cinematic.",
          bands: ["Mogwai", "Tortoise", "Slint", "Godspeed You! Black Emperor", "Sigur Rós"],
          signatureTrack: { title: "Mogwai Fear Satan", artist: "Mogwai" }
        }
      ]
    },

    {
      id: "modern-alt",
      name: "Modern alt",
      dates: "2000s–now",
      parentEra: "fragmentation",
      summary: "The revival era — old forms returning, blog-era discoveries, genre walls dissolving.",
      subGenres: [
        {
          id: "garage-rock",
          name: "Garage rock revival",
          origin: "2000–2006",
          summary: "New York, Detroit, Stockholm — tight jeans, tighter songs, guitars back in fashion.",
          bands: ["The Strokes", "The White Stripes", "Yeah Yeah Yeahs", "The Hives", "Arctic Monkeys"],
          signatureTrack: { title: "Fell in Love with a Girl", artist: "The White Stripes" }
        },
        {
          id: "post-punk-revival",
          name: "Post-punk revival",
          origin: "2001–",
          summary: "Gang of Four and Wire rediscovered by a new generation of razor-sharp bands — and then rediscovered again, twenty years later, by a UK windmill scene that's rebuilt the genre for the algorithm age.",
          detailed: true,
          signatureTrack: { title: "Take Me Out", artist: "Franz Ferdinand" },
          sections: [
            {
              heading: "The origin moment",
              text: "Two records from 2002 set the template — Interpol's Turn on the Bright Lights and The Rapture's House of Jealous Lovers. One was Joy Division refracted through downtown New York; the other welded post-punk's angular guitar to 90s house music. Together they pointed at the two paths the revival would take: the brooding/literary path, and the dance-floor path."
            },
            {
              heading: "The sound",
              text: "Angular, trebly guitars; high-in-the-mix basslines doing the melodic work; baritone vocals borrowed from Ian Curtis, Mark E. Smith, or Andrew Eldritch. Lyrically: alienation, modern dread, the city. Tempos suited to dance floors. The 2001-era version privileged sharp tailoring and short songs; the 2020s version privileges seven-minute tracks and saxophones."
            }
          ],
          firstWave: {
            title: "First wave — NYC + UK, 2001–2007",
            bands: [
              { name: "Interpol", note: "Brooklyn. Joy Division comparisons were earned and obvious; their first three albums hold up." },
              { name: "Franz Ferdinand", note: "Glasgow. Took the angular guitars and made them dance-able — the chart-friendly wing." },
              { name: "Bloc Party", note: "London. Silent Alarm (2005) — frantic, paranoid, deeply danceable." },
              { name: "The Rapture", note: "NYC. The DFA-affiliated bridge between post-punk and dance-punk." },
              { name: "Editors", note: "UK. Earnest, big-room Interpol — sold colossally in Europe, less so elsewhere." }
            ]
          },
          secondWave: {
            title: "Second wave — the windmill scene, 2018–",
            context: "Centered on a single South London pub (The Windmill in Brixton), this UK wave revived post-punk for a third time and immediately became the most interesting thing in indie rock.",
            bands: [
              { name: "Black Country, New Road", note: "Chamber post-punk — saxophones, violins, klezmer, free jazz, ten-minute songs." },
              { name: "Black Midi", note: "Math-rock-punk — thorny, virtuosic, faintly absurd." },
              { name: "Squid", note: "Krautrock-y, motorik, paranoid." },
              { name: "Dry Cleaning", note: "Florence Shaw's deadpan spoken-word vocals over wiry guitar grooves." },
              { name: "Shame", note: "Snarling, witty, the most classically post-punk of the bunch." },
              { name: "Fontaines D.C.", note: "Dublin, not London — but adjacent scene, similar ambitions, increasingly stadium-sized." }
            ]
          },
          offshoots: [
            {
              id: "dance-punk",
              name: "Dance-punk",
              desc: "Post-punk's rhythm-forward wing — Gang of Four's funk influence updated for 2000s dance floors. The DFA Records sound.",
              bands: ["LCD Soundsystem", "!!!", "The Rapture", "Liars", "Out Hud"],
              signatureTrack: { title: "House of Jealous Lovers", artist: "The Rapture" }
            },
            {
              id: "art-punk",
              name: "Art-punk revival",
              desc: "The smarter, weirder, less-danceable strand. Often Pavement-adjacent in attitude, post-punk in sound.",
              bands: ["Parquet Courts", "Protomartyr", "Iceage", "Ought", "Preoccupations"],
              signatureTrack: { title: "Stoned and Starving", artist: "Parquet Courts" }
            },
            {
              id: "windmill-scene",
              name: "Windmill scene",
              desc: "The 2018-onward UK wave centered on Brixton's Windmill pub. Long songs, art-school instincts, classical instrumentation, post-Brexit dread.",
              bands: ["Black Country, New Road", "Black Midi", "Squid", "Dry Cleaning", "Shame", "Goat Girl"],
              signatureTrack: { title: "Sunglasses", artist: "Black Midi" }
            },
            {
              id: "post-punk-pop",
              name: "Post-punk pop crossover",
              desc: "When post-punk's vocabulary — baritone vocals, driving basslines, dread — gets absorbed into pop production. The Yves Tumor / Phoebe-adjacent corners.",
              bands: ["Yves Tumor", "Geese", "Wet Leg", "Fontaines D.C. (later)"],
              signatureTrack: { title: "Chaise Longue", artist: "Wet Leg" }
            }
          ],
          mainstream: "The first wave hit charts — Franz Ferdinand and Bloc Party went gold, Interpol filled arenas. The second wave hasn't crossed over commercially in the same way, but Fontaines D.C. headlining festivals and Black Country, New Road getting Mercury nominations suggests the genre's prestige is at its highest point ever.",
          culturalNote: "Post-punk has now become alternative's default vocabulary in the 2020s — the way grunge was in the 90s, or jangle was in the 80s. Three full revival cycles deep, the sound keeps regenerating because its core grammar (basslines doing the melodic work, deadpan vocals, dread as affect) remains weirdly perfect for whatever decade it surfaces in."
        },
        {
          id: "indietronica",
          name: "Indietronica",
          origin: "2002–2012",
          summary: "Indie sensibility plus electronic production. Laptops meet guitars.",
          bands: ["LCD Soundsystem", "The Postal Service", "Phoenix", "Hot Chip", "MGMT"],
          signatureTrack: { title: "Such Great Heights", artist: "The Postal Service" }
        },
        {
          id: "bedroom-pop",
          name: "Bedroom pop",
          origin: "2015–",
          summary: "Self-recorded, self-released, GarageBand-native, streaming-first.",
          bands: ["Clairo", "Mac DeMarco", "Snail Mail", "Rex Orange County", "Beabadoobee"],
          signatureTrack: { title: "Pretty Girl", artist: "Clairo" }
        }
      ]
    }
  ]
};
