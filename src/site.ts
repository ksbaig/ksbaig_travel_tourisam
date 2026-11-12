export const contactUrl = "https://ksb-journeys-green-portal.lovable.app/contact";

export const publicAsset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

export function showSection(id: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
  section?.focus({ preventScroll: true });
}
