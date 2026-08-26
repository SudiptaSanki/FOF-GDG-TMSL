/**
 * StarShape — Decorative interlocking 4-pointed star
 * Matches the Make-a-Thon Figma design: lime green fill
 * with dark maroon strokes, two overlapping curved paths
 * that weave over/under each other.
 */
export default function StarShape({ size = 100, className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lime glow / outer shape */}
      <g>
        {/* Vertical ellipse path (goes top-bottom) */}
        <path
          d="M100 8 C120 60, 150 80, 192 100 C150 120, 120 140, 100 192 C80 140, 50 120, 8 100 C50 80, 80 60, 100 8 Z"
          fill="#E4EE86"
          stroke="#E4EE86"
          strokeWidth="12"
          strokeLinejoin="round"
        />
      </g>

      {/* Maroon interlocking strokes — two paths that weave */}
      {/* Path A: top-left to bottom-right curve */}
      <path
        d="M100 18 C108 55, 130 72, 145 80 
           C160 88, 178 94, 185 100 
           C178 106, 160 112, 145 120 
           C130 128, 108 145, 100 182"
        stroke="#5C1B1B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Path B: bottom-left to top-right curve (underneath) */}
      <path
        d="M100 182 C92 145, 70 128, 55 120 
           C40 112, 22 106, 15 100 
           C22 94, 40 88, 55 80 
           C70 72, 92 55, 100 18"
        stroke="#5C1B1B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Horizontal crossing paths */}
      {/* Path C: left to right (over the top) */}
      <path
        d="M18 100 C55 92, 72 70, 80 55 
           C88 40, 94 22, 100 15 
           C106 22, 112 40, 120 55 
           C128 70, 145 92, 182 100"
        stroke="#5C1B1B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Path D: right to left (underneath) */}
      <path
        d="M182 100 C145 108, 128 130, 120 145 
           C112 160, 106 178, 100 185 
           C94 178, 88 160, 80 145 
           C72 130, 55 108, 18 100"
        stroke="#5C1B1B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Overlapping center illusion — small lime patches where paths cross */}
      {/* Top-left crossing */}
      <ellipse cx="78" cy="78" rx="8" ry="8" fill="#E4EE86" />
      <path
        d="M72 72 C76 68, 82 72, 84 76"
        stroke="#5C1B1B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Top-right crossing */}
      <ellipse cx="122" cy="78" rx="8" ry="8" fill="#E4EE86" />
      <path
        d="M128 72 C124 68, 118 72, 116 76"
        stroke="#5C1B1B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom-left crossing */}
      <ellipse cx="78" cy="122" rx="8" ry="8" fill="#E4EE86" />
      <path
        d="M72 128 C76 132, 82 128, 84 124"
        stroke="#5C1B1B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bottom-right crossing */}
      <ellipse cx="122" cy="122" rx="8" ry="8" fill="#E4EE86" />
      <path
        d="M128 128 C124 132, 118 128, 116 124"
        stroke="#5C1B1B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
