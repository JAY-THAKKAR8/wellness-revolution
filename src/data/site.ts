import type { ImgKey } from "./images";

// ⚠️ Coach names, credentials, prices and equipment brands came from the Stitch mock-up.
// Replace with the gym's real details before going live.
export const GYM = {
  name: "The Wellness Revolution",
  address: "Prabhar Complex, Mujmahuda Rd, beside Mahindra showroom, Akota, Vadodara, Gujarat 390007",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=The+Wellness+Revolution+Gym+Akota+Vadodara",
  whatsapp: "919999999999", // TODO real number, country code, no +
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
};

export const wa = (msg: string) => `https://wa.me/${GYM.whatsapp}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: "Programs", id: "programs" },
  { label: "Coaches", id: "coaches" },
  { label: "Pricing", id: "pricing" },
  { label: "Schedule", id: "schedule" },
  { label: "Visit", id: "visit" },
];

export const MARQUEE = ["Strength", "HIIT", "Boxing", "Yoga", "Cardio", "Personal training", "Nutrition"];

export const STATS = [
  { n: 5000, suffix: "+", unit: "sq ft", note: "Premium workout space" },
  { n: 60, suffix: "+", unit: "machines", note: "Plate-loaded, cable & free weights" },
  { n: 25, suffix: "+", unit: "weekly classes", note: "High-energy group sessions" },
  { n: 16, suffix: " hrs", unit: "open daily", note: "6:00 AM to 10:00 PM" },
];

export const FEATURES = [
  { icon: "sanitizer", title: "Clean & hygienic", text: "Fresh air, spotless floors and continuous sanitization across the whole training floor." },
  { icon: "dumbbell", title: "Advanced machines", text: "Well-maintained strength rigs, racks, cables and free weights for every muscle group." },
  { icon: "users", title: "Group + 1:1 training", text: "Certified coaches with progressive plans and posture checks, in a group or one-to-one." },
  { icon: "smile", title: "Supportive vibe", text: "Zero intimidation. A community of driven people who show up for each other." },
] as const;

export const PROGRAMS: { title: string; tag: string; text: string; img: ImgKey }[] = [
  { title: "Iron Foundation", tag: "Hypertrophy", text: "Heavy compound lifts, progressive overload, barbell mastery.", img: "strength" },
  { title: "Burn Protocol", tag: "Conditioning", text: "High-intensity intervals designed for explosive metabolic conditioning.", img: "hiit" },
  { title: "Fight Fit", tag: "Combat", text: "Heavy bag drills, footwork, speed combinations and core endurance.", img: "boxing" },
  { title: "Flow & Recover", tag: "Mobility", text: "Vinyasa flow, deep fascia release, mobility and mental recharge.", img: "yoga" },
  { title: "Engine Room", tag: "Endurance", text: "Rowers, treadmills, air bikes and threshold pacing.", img: "cardio" },
];

export const METHOD = [
  { title: "Assess", text: "Body composition analysis, movement screening and baseline fitness metrics." },
  { title: "Plan", text: "Personal nutrition, training volume and a strength blueprint mapped to your schedule." },
  { title: "Train", text: "Intense coach-led sessions, technique correction and recorded loads." },
  { title: "Evolve", text: "Regular re-tests, progressive overload adjustments and sustained results." },
];

export const COACHES: { name: string; badge: string; role: string; img: ImgKey }[] = [
  { name: "Arjun Patel", badge: "CSCS Certified", role: "Head of Strength & Conditioning", img: "coach1" },
  { name: "Priya Sharma", badge: "Mobility Specialist", role: "Olympic Weightlifting & Mobility Coach", img: "coach2" },
  { name: "Rohan Mehta", badge: "Combat Conditioning", role: "Boxing & Metabolic Conditioning Coach", img: "coach3" },
];

export type Period = "monthly" | "quarterly" | "yearly";
export const PERIODS: { id: Period; label: string; months: number; discount: number }[] = [
  { id: "monthly", label: "Monthly", months: 1, discount: 0 },
  { id: "quarterly", label: "Quarterly", months: 3, discount: 0.1 },
  { id: "yearly", label: "Yearly (-20%)", months: 12, discount: 0.2 },
];

export const PLANS = [
  {
    kicker: "Essential Access", name: "Starter", monthly: 2499, hot: false, cta: "Choose Starter",
    text: "Designed for solo lifters looking for full equipment access.",
    perks: [["Full weights & cardio floor access", true], ["Locker & shower facilities", true], ["1 complimentary fitness assessment", true], ["Group studio sessions", false]],
  },
  {
    kicker: "Total System", name: "Revolution", monthly: 4499, hot: true, cta: "Join the Revolution",
    text: "Our flagship tier with unlimited group classes and monthly body scans.",
    perks: [["All-access facility privileges", true], ["Unlimited group classes (HIIT, Boxing, Yoga)", true], ["Monthly body composition scan", true], ["Nutrition & macro guidance", true], ["Recovery lounge access", true]],
  },
  {
    kicker: "Bespoke Protocol", name: "Elite 1:1", monthly: 8999, hot: false, cta: "Enquire for Elite",
    text: "Full personal coaching with daily accountability and technique work.",
    perks: [["Everything in Revolution", true], ["12 dedicated 1:1 coach sessions", true], ["Weekly custom meal planning", true], ["VIP locker & priority booking", true]],
  },
] as const;

export type Discipline = "strength" | "hiit" | "boxing" | "yoga" | "cardio";
export const DISCIPLINES: { id: Discipline | "all"; label: string }[] = [
  { id: "all", label: "All Disciplines" }, { id: "strength", label: "Strength" }, { id: "hiit", label: "HIIT" },
  { id: "boxing", label: "Boxing" }, { id: "yoga", label: "Yoga" }, { id: "cardio", label: "Cardio" },
];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
export type Day = (typeof DAYS)[number];
type Cls = { t: string; title: string; sub: string; tag: string; d: Discipline };
export const SCHEDULE: Record<Day, Cls[]> = {
  Mon: [
    { t: "06:30 AM", title: "Iron Foundation: Strength", sub: "Coach Arjun Patel · Heavy Compound Barbell", tag: "High Intensity", d: "strength" },
    { t: "08:00 AM", title: "Burn Protocol: HIIT", sub: "Coach Rohan Mehta · Metabolic Threshold", tag: "Max Cardio", d: "hiit" },
    { t: "11:30 AM", title: "Engine Room: Endurance", sub: "Coach Priya Sharma · Rowers & Treadmills", tag: "Aerobic Zone", d: "cardio" },
    { t: "05:30 PM", title: "Fight Fit: Heavy Bag Boxing", sub: "Coach Rohan Mehta · Strike Combinations", tag: "High Intensity", d: "boxing" },
    { t: "07:00 PM", title: "Flow & Fascial Recovery", sub: "Coach Priya Sharma · Deep Mobility & Breathwork", tag: "Regeneration", d: "yoga" },
  ],
  Tue: [
    { t: "06:30 AM", title: "Hypertrophy Protocols", sub: "Coach Arjun Patel · Upper Body Hypertrophy", tag: "Strength", d: "strength" },
    { t: "08:00 AM", title: "Engine Room: Threshold", sub: "Coach Arjun Patel · SkiErg & Air Bike Drills", tag: "Conditioning", d: "cardio" },
    { t: "05:30 PM", title: "Fight Fit: Technical Footwork", sub: "Coach Rohan Mehta · Defense Angles & Padwork", tag: "Combat", d: "boxing" },
    { t: "07:00 PM", title: "Kinetic Mobility & Joint Flow", sub: "Coach Priya Sharma · Thoracic & Hip Alignment", tag: "Mobility", d: "yoga" },
  ],
  Wed: [
    { t: "06:30 AM", title: "Iron Foundation: Posterior Chain", sub: "Coach Arjun Patel · Deadlift & Hinge Mechanics", tag: "Strength", d: "strength" },
    { t: "08:00 AM", title: "Burn Protocol: Tabata Overload", sub: "Coach Rohan Mehta · High Density Intervals", tag: "Max Cardio", d: "hiit" },
    { t: "05:30 PM", title: "Fight Fit: Heavy Bag Combos", sub: "Coach Rohan Mehta · Anaerobic Power Drills", tag: "High Intensity", d: "boxing" },
    { t: "07:00 PM", title: "Vinyasa Flow & Deep Relaxation", sub: "Coach Priya Sharma · Myofascial Release & Pranayama", tag: "Recovery", d: "yoga" },
  ],
  Thu: [
    { t: "06:30 AM", title: "Olympic Lifting Technique", sub: "Coach Priya Sharma · Snatch & Clean Complex", tag: "Technique", d: "strength" },
    { t: "08:00 AM", title: "Engine Room: VO2 Max Sprints", sub: "Coach Arjun Patel · Sled Pushes & Treadmill Pacing", tag: "Conditioning", d: "cardio" },
    { t: "05:30 PM", title: "Burn Protocol: Kettlebell & Core", sub: "Coach Rohan Mehta · Explosive Rotational Work", tag: "High Intensity", d: "hiit" },
    { t: "07:00 PM", title: "Boxing Bootcamp: Bag Circuit", sub: "Coach Rohan Mehta · Speed, Stamina & Endurance", tag: "Combat", d: "boxing" },
  ],
  Fri: [
    { t: "06:30 AM", title: "Iron Foundation: Squat Mastery", sub: "Coach Arjun Patel · Squat Racks & Pause Reps", tag: "High Intensity", d: "strength" },
    { t: "08:00 AM", title: "Burn Protocol: Friday Crucible", sub: "Coach Rohan Mehta · Battle Ropes & Plyometrics", tag: "Max Cardio", d: "hiit" },
    { t: "05:30 PM", title: "Fight Fit: Championship Rounds", sub: "Coach Rohan Mehta · 12×3 Minute Bag Rounds", tag: "High Intensity", d: "boxing" },
    { t: "07:00 PM", title: "Flow & Fascial Recovery", sub: "Coach Priya Sharma · Restorative Flow", tag: "Regeneration", d: "yoga" },
  ],
  Sat: [
    { t: "07:00 AM", title: "Weekend Strongman & Powerlifting", sub: "Coach Arjun Patel · Log Press, Trap Bar & Carries", tag: "Strength", d: "strength" },
    { t: "08:30 AM", title: "Engine Room: Hyrox Simulation", sub: "Coach Priya Sharma · Team Conditioning Challenge", tag: "Conditioning", d: "cardio" },
    { t: "10:00 AM", title: "Burn Protocol: Community Battle", sub: "Coach Rohan Mehta · Partner Circuits", tag: "High Intensity", d: "hiit" },
    { t: "11:30 AM", title: "Yin Yoga & Sound Bath Recovery", sub: "Coach Priya Sharma · Full Decompression", tag: "Regeneration", d: "yoga" },
  ],
};
