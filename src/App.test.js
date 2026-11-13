import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
});

test("renders the name as the main heading", () => {
  render(<App />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Mohan Babu\s*Doddapaneni/);
});

test("primary navigation links to every section", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", { name: "Primary" });
  ["Work", "Field notes", "Stack", "Projects", "Contact"].forEach((label) => {
    expect(nav).toHaveTextContent(label);
  });
});

test("shows the updated phone number with a tel: link", () => {
  render(<App />);
  const links = screen.getAllByRole("link", { name: "+1 (774) 701-0382" });
  expect(links.length).toBeGreaterThan(0);
  links.forEach((a) => expect(a).toHaveAttribute("href", "tel:+17747010382"));
});

test("experience accordion toggles", () => {
  render(<App />);
  const adobe = screen.getByRole("button", { name: /Adobe/ });
  expect(adobe).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(adobe);
  expect(adobe).toHaveAttribute("aria-expanded", "true");
});

test("external links open safely", () => {
  render(<App />);
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    expect(a.getAttribute("rel")).toMatch(/noopener/);
    expect(a.getAttribute("rel")).toMatch(/noreferrer/);
  });
});
