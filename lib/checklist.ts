export type AreaId = "kitchen" | "bath" | "living" | "bedroom";

export type RitualTask = {
  id: string;
  title: string;
  detail: string;
};

export type RitualArea = {
  id: AreaId;
  label: string;
  summary: string;
  tasks: RitualTask[];
};

function tasks(prefix: string, rows: [string, string][]): RitualTask[] {
  return rows.map(([title, detail], index) => ({
    id: `${prefix}-${index + 1}`,
    title,
    detail,
  }));
}

export const RITUAL: RitualArea[] = [
  {
    id: "kitchen",
    label: "Kitchen",
    summary: "Grease, grout, and the places hands actually touch.",
    tasks: tasks("kitchen", [
      ["Degrease the cooktop", "Polymerized oil is lifted without scratching glass or enamel."],
      ["Soak and brush burner grates", "Grates are soaked, detailed, and dried so the flame sits even."],
      ["Release carbon from oven-door glass", "The brown haze on the interior glass is loosened and cleared."],
      ["Enzyme-treat backsplash grout", "A plant enzyme dwells in the grout, then is lifted and rinsed."],
      ["Sanitize food-contact counters", "Stone or laminate is cleaned and dried without a chemical film."],
      ["Scrub the sink basin and rim", "Basin, overflow, and the lip under the rim are restored."],
      ["Descale the faucet and aerator", "Mineral at the spout and base is dissolved and polished away."],
      ["Wipe cabinet fronts and pulls", "Doors, edges, and the lip above each pull are detailed."],
      ["Steam-clean the microwave interior", "Splatter is loosened and the turntable is washed."],
      ["Degrease the range-hood face", "The exterior and the filter face are cleared of film."],
      ["Lift splash marks beside the hob", "Wall freckles of oil are treated and blended back."],
      ["Sanitize the trash zone", "The bin exterior and the floor beneath it are disinfected."],
      ["Polish small-appliance exteriors", "Kettle, toaster, and mixer housings are wiped and dried."],
      ["Detail the toe-kicks", "The recessed kickboard is dusted, then wiped clean."],
      ["Dust and wipe baseboards", "Both faces of the kitchen baseboard are detailed."],
      ["Sanitize switches and outlet plates", "High-touch plates are cleaned without soaking the switch."],
      ["Clear the sink window and track", "Glass, sill, and the track that holds crumbs are vacuumed."],
      ["HEPA-edge and botanical-mop the floor", "Edges are vacuumed, then the floor is mopped and dried."],
      ["Spot-finish the hardware", "Pulls are finished so they dry without water spots."],
    ]),
  },
  {
    id: "bath",
    label: "Bathrooms",
    summary: "Mineral, glass, and the quiet details of a hotel bath.",
    tasks: tasks("bath", [
      ["Descale shower heads", "Mineral film is soaked free so the spray opens evenly again."],
      ["Lift mineral from the glass enclosure", "Glass is treated, squeegeed, and left without streaks."],
      ["Steam tile and grout lines", "Grout is steamed, then finished with a botanical rinse."],
      ["Restore the shower floor", "Soap film and hair traps at the drain edge are cleared."],
      ["Clean the tub surround", "The waterline and corners are lifted back to the original tone."],
      ["Sanitize the toilet bowl", "Bowl, seat, and the hinge line are cleaned and dried."],
      ["Detail the toilet base and hinges", "The footprint behind the pedestal is included, not skipped."],
      ["Polish the vanity top", "The deck, including around the faucet, is dried spot-free."],
      ["Shine the faucet and drain", "Chrome or matte hardware is polished and the drain rim cleared."],
      ["Streak-free mirror finish", "Mirror glass is finished so the edges do not haze."],
      ["Sanitize switchboards", "Plates and dimmers are wiped with a barely damp cloth."],
      ["Dust the exhaust grille", "The vent face is vacuumed so dust does not fall back."],
      ["Clear door and window tracks", "Tracks are vacuumed, then wiped so they slide quietly."],
      ["Shine bars and hardware", "Towel bars, hooks, and knobs are detailed."],
      ["Reset niches and bottles", "Shelves are cleaned and bottles returned in a straight line."],
      ["Wipe baseboards", "Bathroom baseboards are dusted and wiped on both faces."],
      ["Sanitize the bin exterior", "The bin and the floor it sits on are disinfected."],
      ["Clear the windowsill", "Sill dust and splash spots are removed."],
      ["Mop corners and the floor", "Corners first, then a full botanical mop to a dry finish."],
    ]),
  },
  {
    id: "living",
    label: "Living Area",
    summary: "Air, glass, textiles, and every high-touch surface.",
    tasks: tasks("living", [
      ["HEPA floor pass", "Floors and edges are filtered for dust and pet dander."],
      ["Baseboard dusting", "The full run of baseboard is dusted, including behind doors."],
      ["Switchboard sanitization", "Switches, plates, and nearby wall marks are cleaned."],
      ["Sanitize remotes and high-touch points", "Remotes, handles, and rails are wiped and dried."],
      ["Polish glass and mirrors", "Glass is finished without the blue haze of harsh glass chemicals."],
      ["Vacuum upholstery", "Cushions, arms, and the crease underneath are vacuumed."],
      ["Align and plump cushions", "Cushions are shaken, turned, and set back to a quiet line."],
      ["Spot-lift sofa arms", "Arm wear and marks are treated within the fabric's limit."],
      ["Reset tables and consoles", "Surfaces are cleared, cleaned, and objects returned with intention."],
      ["Detail the media unit", "Shelves, the screen bezel, and the stand are dusted."],
      ["Dust lamps and shades", "Shades are dusted so the evening light stays even."],
      ["Dust frames and ledges", "Art, shelves, and the tops of door casings are included."],
      ["Vacuum window tracks", "Tracks and the sill are vacuumed before the glass is polished."],
      ["Wipe door frames and handles", "Frames, edges, and handles are detailed."],
      ["Clean vent and AC grilles", "Supply and return faces are vacuumed and wiped."],
      ["Vacuum under furniture edges", "The visible perimeter under sofas and consoles is reached."],
      ["Reset throws and textiles", "Throws are folded and textiles set back to a composed plane."],
      ["Botanical scent diffusion", "A pet-safe botanical mist is diffused, never a heavy perfume."],
      ["Final floor sheen", "A last pass leaves the floor even, not wet."],
    ]),
  },
  {
    id: "bedroom",
    label: "Bedrooms",
    summary: "Linens, quiet surfaces, and a hotel-grade turn-down.",
    tasks: tasks("bedroom", [
      ["Hotel fold and bed dress", "The bed is stripped of clutter and dressed to a sharp fold."],
      ["Smooth or refresh linens", "Linens are smoothed, or refreshed when a change is in the visit."],
      ["Vacuum the mattress surface", "The exposed mattress or protector is vacuumed for dust."],
      ["Align the pillows", "Pillows are shaken and stacked to a single horizon."],
      ["Dust the headboard", "The headboard face and top edge are detailed."],
      ["Reset both nightstands", "Surfaces are cleaned and objects returned to a calm order."],
      ["Sanitize lamps and switches", "Lamp bases, pulls, and switches are wiped."],
      ["Polish the mirror", "Bedroom mirrors are finished streak-free."],
      ["Wipe wardrobe exteriors", "Doors, handles, and the top lip if reachable are cleaned."],
      ["Vacuum the under-bed perimeter", "The visible edge under the bed is vacuumed, not ignored."],
      ["Dust baseboards", "Bedroom baseboards are dusted along the full run."],
      ["Clear window glass", "Glass is polished and the sill wiped."],
      ["Vacuum window tracks", "Tracks are vacuumed so the sash moves cleanly."],
      ["Sanitize door handles", "Handles and the plate around them are disinfected."],
      ["Botanical linen mist", "A light, pet-safe mist is set over the made bed."],
      ["Dust reachable fan blades", "Blades within a safe reach are dusted so they do not rain silt."],
      ["Clear surfaces to a quiet plane", "Dressers and open shelves are edited back to calm."],
      ["Final HEPA pass", "A last filtration pass closes the room."],
    ]),
  },
];

export const RITUAL_COUNT = RITUAL.reduce((sum, area) => sum + area.tasks.length, 0);
