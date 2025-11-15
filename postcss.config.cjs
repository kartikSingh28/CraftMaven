const plugins = [];

try {
  // prefer to load tailwind when available
  plugins.push(require("tailwindcss"));
} catch (err) {
  // tailwind not installed — skip it to avoid breaking the build
  console.warn("postcss: tailwindcss not found, skipping Tailwind plugin.");
}

try {
  plugins.push(require("autoprefixer"));
} catch (err) {
  console.warn("postcss: autoprefixer not found, skipping Autoprefixer plugin.");
}

module.exports = { plugins };
