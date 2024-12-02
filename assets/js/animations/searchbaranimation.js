export function initializeSearchBarAnimation(id) {
  const $container = $(`#${id}`); // Select the container using jQuery

  if ($container.length === 0) {
    console.error(`Element with ID "${id}" not found.`);
    return;
  }

  // Apply initial border styles using jQuery's .css() method
  $container.css({
    border: "6px solid transparent", // Transparent base
    borderRadius: "8px", // Rounded corners (optional)
    boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
    borderImageSource:
      "linear-gradient(45deg, rgba(255, 0, 0, 0.6), rgba(0, 255, 0, 0.6), rgba(0, 0, 255, 0.6), rgba(255, 255, 0, 0.6), rgba(255, 0, 255, 0.6))",
    borderImageSlice: "1",
  });

  // Animate the gradient with GSAP (GSAP remains the same as it's external to jQuery)
  gsap.to($container[0], {
    duration: 8, // Slower animation
    borderImageSource:
      "linear-gradient(225deg, rgba(255, 255, 0, 0.6), rgba(255, 0, 0, 0.6), rgba(0, 255, 0, 0.6), rgba(0, 0, 255, 0.6), rgba(255, 0, 255, 0.6))",
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}
