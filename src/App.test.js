import { render, screen, fireEvent, within, act } from "@testing-library/react";
import App from "./App";
import NOTES from "./content/notes";
import { renderMarkdown } from "./lib/markdown";
import { render as rtlRender } from "@testing-library/react";

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
  window.scrollTo = () => {};
});

afterEach(() => {
  window.location.hash = "";
});

test("renders the name as the only h1 on the home page", () => {
  render(<App />);
  const h1s = screen.getAllByRole("heading", { level: 1 });
  expect(h1s).toHaveLength(1);
  expect(h1s[0]).toHaveTextContent(/Mohan Babu\s*Doddapaneni/);
});

test("primary navigation covers the personal-site sections", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", { name: "Primary" });
  ["About", "Built", "Journey", "Notes", "Connect"].forEach((label) =>
    expect(within(nav).getByRole("link", { name: new RegExp(label) })).toBeInTheDocument()
  );
});

test("no recruitment messaging", () => {
  render(<App />);
  expect(screen.queryByText(/hire me|available for|open to (senior|work|roles)|opportunit/i)).toBeNull();
});

test("phone links use the current number", () => {
  render(<App />);
  const links = screen.getAllByRole("link", { name: "+1 (774) 701-0382" });
  links.forEach((a) => expect(a).toHaveAttribute("href", "tel:+17747010382"));
});

test("journey details expand and collapse", () => {
  render(<App />);
  const btn = screen.getByRole("button", { name: /details.*for Adobe/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "false");
});

test("a note opens on its own route and links back", () => {
  render(<App />);
  act(() => {
    window.location.hash = `#/notes/${NOTES[0].slug}`;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(NOTES[0].title);
  expect(screen.getByRole("link", { name: /All notes/ })).toHaveAttribute("href", "#notes");
});

test("unknown note shows a friendly message", () => {
  render(<App />);
  act(() => {
    window.location.hash = "#/notes/does-not-exist";
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/doesn’t exist/);
});

test("markdown renderer drops unsafe links and never injects HTML", () => {
  rtlRender(
    <div data-testid="md">
      {renderMarkdown("## Hi\n\n[bad](javascript:alert(1)) and <img src=x onerror=alert(1)> **ok** `code`")}
    </div>
  );
  const md = within(screen.getByTestId("md"));
  expect(md.queryByRole("link")).toBeNull();
  expect(md.queryByRole("img")).toBeNull();
  expect(md.getByRole("heading", { level: 2 })).toHaveTextContent("Hi");
  expect(md.getByText("ok").tagName).toBe("STRONG");
});

test("external links open safely", () => {
  render(<App />);
  const external = screen.getAllByRole("link").filter((a) => a.getAttribute("target") === "_blank");
  expect(external.length).toBeGreaterThan(0);
  external.forEach((a) => {
    expect(a).toHaveAttribute("rel", expect.stringMatching(/noopener/));
    expect(a).toHaveAttribute("rel", expect.stringMatching(/noreferrer/));
  });
});
