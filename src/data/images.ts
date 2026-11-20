// All photos are static files inside the project (public/collection, .jpg), from the Stitch designs.
// Hero, statement, trial and coaches are AI-upscaled 2x. Swap any file with a real gym photo, same name.
const keys = ["hero", "why", "strength", "hiit", "boxing", "yoga", "cardio", "statement", "coach1", "coach2", "coach3", "trial"] as const;

export type ImgKey = (typeof keys)[number];
export const IMG = Object.fromEntries(keys.map((k) => [k, `/collection/${k}.jpg`])) as Record<ImgKey, string>;
