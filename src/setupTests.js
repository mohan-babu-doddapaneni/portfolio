// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver, which the scroll-reveal and
// count-up animations rely on. Provide a no-op mock so components render in tests.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = MockIntersectionObserver;
window.IntersectionObserver = MockIntersectionObserver;

// jsdom doesn't implement matchMedia, used by the cursor-spotlight hook to
// skip on touch devices. Mock it so it reports a non-touch pointer.
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    };
  };
