// Hand-drawn line icons for the Bytes section. Sparkles (.bytes-icon__sparkle) twinkle on hover.

export const bytesIcons = {
  book: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <path
        className="bytes-icon__fill"
        d="M32 22C26 17 16 16 8 18L8 48C16 46 26 47 32 52Z"
      />
      <path d="M32 22C38 17 48 16 56 18L56 48C48 46 38 47 32 52Z" />
      <path d="M32 22V52" />
      <path d="M38 27C42 25 47 25 51 26M38 33C42 31 47 31 51 32M38 39C41 37 45 37 48 38" />
      <path d="M14 25C18 24 22 24 26 26" />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(36.5 1.5) scale(0.458)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(20.0 7.0) scale(0.250)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <circle className="bytes-icon__solid" cx="31" cy="6" r="1.3" />
      <circle className="bytes-icon__solid" cx="51" cy="14" r="1" />
    </svg>
  ),
  palette: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <path d="M30 12C15 12 6 23 7 35C8 47 20 55 32 54C39 53 40 47 36 43C33 40 35 35 40 36C47 37 55 36 56 27C57 18 45 12 30 12Z" />
      <circle className="bytes-icon__fill" cx="19" cy="26" r="4" />
      <circle className="bytes-icon__solid" cx="30" cy="20" r="3.4" />
      <circle className="bytes-icon__fill" cx="43" cy="23" r="3.6" />
      <circle className="bytes-icon__solid" cx="17" cy="39" r="3.4" />
      <path d="M45 61L59 45" />
      <path
        className="bytes-icon__solid"
        d="M46 57C42 58 38 61 38 61C38 61 39 56 42 54C44 53 46 54 46 57Z"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(48.0 3.0) scale(0.417)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <circle className="bytes-icon__solid" cx="45" cy="4" r="1.3" />
      <circle className="bytes-icon__solid" cx="60" cy="16" r="1" />
    </svg>
  ),
  bag: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <path
        className="bytes-icon__fill"
        d="M14 25C26 24 38 24 50 25L53 57C39 58 25 58 11 57Z"
      />
      <path d="M23 25C22 13 41 13 41 25" />
      <circle className="bytes-icon__solid" cx="23" cy="25" r="1.6" />
      <circle className="bytes-icon__solid" cx="41" cy="25" r="1.6" />
      <path className="bytes-icon__dots" d="M17 50C27 51 37 51 47 50" />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(25.0 31.0) scale(0.583)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(47.5 4.5) scale(0.375)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <circle className="bytes-icon__solid" cx="44" cy="5" r="1.3" />
      <circle className="bytes-icon__solid" cx="58" cy="17" r="1" />
    </svg>
  ),
  plane: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <path className="bytes-icon__fill" d="M57 9L24 35L29 51L34 39Z" />
      <path d="M57 9L7 28L24 35Z" />
      <path d="M57 9L24 35L29 51L34 39L49 46Z" />
      <path
        className="bytes-icon__dots"
        d="M22 40C15 42 13 48 8 52C5 54 3 57 2 60"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(9.0 3.0) scale(0.417)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <circle className="bytes-icon__solid" cx="25" cy="5" r="1.3" />
      <circle className="bytes-icon__solid" cx="62" cy="22" r="1" />
    </svg>
  ),
  tv: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <path d="M27 21L19 8M35 21L44 6" />
      <circle className="bytes-icon__solid" cx="19" cy="8" r="1.9" />
      <circle className="bytes-icon__solid" cx="44" cy="6" r="1.9" />
      <rect x="7" y="21" width="50" height="33" rx="9" />
      <rect
        className="bytes-icon__fill"
        x="12"
        y="26"
        width="31"
        height="23"
        rx="6"
      />
      <path
        className="bytes-icon__solid"
        d="M30 31A7 7 0 1 0 33 43A5.6 5.6 0 1 1 30 31Z"
      />
      <circle cx="50" cy="31" r="2.4" />
      <circle cx="50" cy="39" r="2.4" />
      <path d="M47 45H53M47 48H53" />
      <path d="M16 54L13 60M48 54L51 60" />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(34.0 28.0) scale(0.250)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(51.0 6.0) scale(0.333)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
    </svg>
  ),
  music: (
    <svg className="bytes-icon" aria-hidden="true" viewBox="0 0 64 64">
      <ellipse
        className="bytes-icon__solid"
        cx="18"
        cy="47"
        rx="6"
        ry="4.5"
        transform="rotate(-20 18 47)"
      />
      <ellipse
        className="bytes-icon__fill"
        cx="44"
        cy="41"
        rx="6"
        ry="4.5"
        transform="rotate(-20 44 41)"
      />
      <path d="M23.5 45V14M49.5 39V8" />
      <path d="M23.5 14C31 10 41 12 49.5 8M23.5 21C31 17 41 19 49.5 15" />
      <path
        className="bytes-icon__dots"
        d="M3 59C13 53 21 63 32 57C43 51 51 61 61 55"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(4.5 17.5) scale(0.375)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <path
        className="bytes-icon__solid bytes-icon__sparkle"
        transform="translate(54.5 22.5) scale(0.292)"
        d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
      />
      <circle className="bytes-icon__solid" cx="36" cy="30" r="1.1" />
    </svg>
  ),
}
