import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the developer name in the hero", () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Mohan Babu Doddapaneni/i);
  expect(nameElements.length).toBeGreaterThan(0);
});

test("renders the main navigation links", () => {
  render(<App />);
  expect(screen.getByRole("link", { name: /^Projects$/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /^Contact$/i })).toBeInTheDocument();
});
