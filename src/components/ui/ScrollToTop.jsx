function ScrollToTop() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      <button
        className="fixed bottom-4 right-4 bg-black/20 z-50 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={scrollTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
  );
}

export default ScrollToTop;
