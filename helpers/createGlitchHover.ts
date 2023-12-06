import anime from "animejs";

export default function createGlitchHover(wrapper: HTMLElement) {
  if (!wrapper?.children) return null;
  const timeline = anime.timeline({ autoplay: false });

  const lettersArray = Array.from(wrapper.children);
  const exemptLetterAmount =
    lettersArray.length <= 3
      ? lettersArray.length - 1
      : Math.ceil((lettersArray.length - 3) / 2);

  const animateAbleLetters = lettersArray.slice(exemptLetterAmount);

  animateAbleLetters.forEach((letter, i) => {
    if (letter instanceof HTMLElement) {
      const originalLetter = letter.dataset.original || "a";
      const possibleCharacters =
        `abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*-=+[]';/~`.split("");
      const letterIndex = possibleCharacters.findIndex(
        (v) => v === originalLetter
      );
      possibleCharacters.splice(letterIndex, 1);

      for (let j = 0; j < 3 + i; j++) {
        timeline.add(
          {
            targets: letter,
            duration: 50,
            opacity: 1,
            begin: () => {
              const randomLetter =
                possibleCharacters[
                  Math.floor(Math.random() * possibleCharacters.length)
                ];
              letter.innerHTML = `${randomLetter}`;
            },
          },
          j * 50
        );
      }
      timeline.add({
        targets: letter,
        duration: 50,
        opacity: 1,
        begin: () => {
          letter.innerHTML = `${originalLetter}`;
        },
      });
    }
  });
  return timeline;
}
