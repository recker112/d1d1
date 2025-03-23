export const shakeText = (text) => {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="shake"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      {char}
    </span>
  ));
};
