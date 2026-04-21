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
//
// Band fields:
//   name, years, location, note
//   isTouchstone?: boolean   — marks an era-defining band (★)
//
// SubGenre fields (basic):
//   id, name, origin, summary, bands: [string]
//
// SubGenre fields (detailed — set `detailed: true`):
//   sections: [{heading, text}]
//   firstWave, secondWave: {title, context?, bands: [{name, note}]}
//   offshoots: [{name, desc, bands: [string]}]
//   mainstream, culturalNote: string
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
      summary: "Where \u201calternative\u201d became a recognizable scene — indie labels, college radio, relentless touring.",
      narrative: "In the 80s, an underground network crystallized: indie labels (SST, Twin/Tone, 4AD, Rough Trade), college radio stations, and a circuit of small clubs. R.E.M. is the band usually credited as the first true alternative band in the modern sense — they built a career entirely outside the major-label system before crossing over. Around them, an entire American underground grew up.",
      isOrigin: true,
      originNote: "First alt scene",
      keyBands: [
        {
          name: "R.E.M.",
          years: "1980–2011",
          location: "Athens, GA",
          isTouchstone: true,
          note: "The archetype. Built a mainstream career on college radio, indie-label discipline, and endless touring. If there's a \u201cfirst alternative band\u201d in the modern sense, it's this one."
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
          sections: [
            {
              heading: "The origin moment",
              text: "Usually pinned to Bauhaus's \u201cBela Lugosi's Dead\u201d in 1979 — nine minutes of dub-influenced reverb, tribal drumming, and Peter Murphy doing a vampire impression. Almost every convention of goth is already in that one song: cavernous production, flanged guitar, elastic bassline, baritone vocal, horror references."
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
            { name: "Deathrock", desc: "The LA version — rawer, punkier, more horror-movie.", bands: ["Christian Death", "45 Grave"] },
            { name: "Ethereal wave", desc: "Goth's dreamy, shoegaze-adjacent sister. 4AD's house sound.", bands: ["Cocteau Twins", "Dead Can Dance", "This Mortal Coil"] },
            { name: "Gothic metal", desc: "90s metal bands borrowing goth's atmosphere.", bands: ["Paradise Lost", "Type O Negative", "My Dying Bride", "HIM"] },
            { name: "Darkwave", desc: "Goth fused with synthpop and cold electronics.", bands: ["Clan of Xymox", "later Sisters of Mercy"] }
          ],
          mainstream: "Crossed over through Nine Inch Nails (industrial with goth DNA), Marilyn Manson, and later Evanescence and AFI. The Cure became one of the biggest alternative bands in the world without ever leaving the genre behind.",
          culturalNote: "Uniquely durable: the only one of these sub-genres that became a permanent subculture, with its own fashion, literature, club nights, and annual festivals (Whitby Goth Weekend in the UK, Wave-Gotik-Treffen in Germany). Most musical genres fade; goth has kept going for 45 years."
        },
        {
          id: "new-wave",
          name: "New wave",
          origin: "UK / US, 1978–1984",
          summary: "Post-punk's pop-friendly side — arty, danceable, radio-ready, without surrendering intelligence.",
          bands: ["Talking Heads", "Blondie", "Devo", "Elvis Costello", "The B-52's"]
        },
        {
          id: "synthpop",
          name: "Synthpop",
          origin: "UK, 1979–1985",
          summary: "Synths in front, rhythm machines for a spine, melancholy disco at heart.",
          bands: ["Depeche Mode", "New Order", "The Human League", "Soft Cell", "Erasure"]
        },
        {
          id: "industrial",
          name: "Industrial",
          origin: "UK / Germany, 1977–",
          summary: "Machines, noise, found sound, transgression. Goth's menacing cousin.",
          bands: ["Throbbing Gristle", "Cabaret Voltaire", "Ministry", "Nine Inch Nails", "Einstürzende Neubauten"]
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
          bands: ["R.E.M.", "The Feelies", "The dB's", "The Smiths (UK counterpart)"]
        },
        {
          id: "hardcore",
          name: "Hardcore",
          origin: "US, 1980–1986",
          summary: "Punk sped up, stripped down, moved to the suburbs. Scene codes and DIY discipline.",
          bands: ["Black Flag", "Minor Threat", "Dead Kennedys", "Bad Brains", "Hüsker Dü"]
        },
        {
          id: "noise-rock",
          name: "Noise rock",
          origin: "US, 1981–1991",
          summary: "Post-hardcore with the volume knob set to menace. Feedback as melody.",
          bands: ["Sonic Youth", "Big Black", "Swans", "The Jesus Lizard"]
        },
        {
          id: "dream-pop",
          name: "Dream pop",
          origin: "UK, 1982–",
          summary: "Reverb-drenched atmospheres, breathy vocals, pop bones under the haze.",
          bands: ["Cocteau Twins", "Mazzy Star", "Galaxie 500", "Slowdive (later)"]
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
          bands: ["Nirvana", "Pearl Jam", "Soundgarden", "Alice in Chains", "Mudhoney"]
        },
        {
          id: "lo-fi-indie",
          name: "Lo-fi indie",
          origin: "US, 1990–1998",
          summary: "4-track recordings, deliberately unpolished, songwriterly. Indie's bedroom era.",
          bands: ["Pavement", "Guided by Voices", "Sebadoh", "Built to Spill", "Neutral Milk Hotel"]
        },
        {
          id: "emo",
          name: "Emo (90s)",
          origin: "US, 1985–1999",
          summary: "Post-hardcore's emotional wing. Confessional, intense, usually quiet-loud.",
          bands: ["Rites of Spring", "Sunny Day Real Estate", "Jawbreaker", "Cap'n Jazz", "American Football"]
        },
        {
          id: "post-rock",
          name: "Post-rock",
          origin: "UK / US, 1991–",
          summary: "Rock instruments used non-rock-ly. Textural, instrumental, cinematic.",
          bands: ["Mogwai", "Tortoise", "Slint", "Godspeed You! Black Emperor", "Sigur Rós"]
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
          bands: ["The Strokes", "The White Stripes", "Yeah Yeah Yeahs", "The Hives", "Arctic Monkeys"]
        },
        {
          id: "post-punk-revival",
          name: "Post-punk revival",
          origin: "2001–2009",
          summary: "Gang of Four and Wire rediscovered by a new generation of razor-sharp bands.",
          bands: ["Interpol", "Franz Ferdinand", "Bloc Party", "The Rapture", "Editors"]
        },
        {
          id: "indietronica",
          name: "Indietronica",
          origin: "2002–2012",
          summary: "Indie sensibility plus electronic production. Laptops meet guitars.",
          bands: ["LCD Soundsystem", "The Postal Service", "Phoenix", "Hot Chip", "MGMT"]
        },
        {
          id: "bedroom-pop",
          name: "Bedroom pop",
          origin: "2015–",
          summary: "Self-recorded, self-released, GarageBand-native, streaming-first.",
          bands: ["Clairo", "Mac DeMarco", "Snail Mail", "Rex Orange County", "Beabadoobee"]
        }
      ]
    }
  ]
};
