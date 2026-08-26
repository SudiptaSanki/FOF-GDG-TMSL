import React from 'react';
import './BackgroundDecorations.css';

export default function BackgroundDecorations() {
  return (
    <div className="bg-decorations">
      {/* Flower 1 */}
      <svg className="anim-flower flower-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15C50 15 65 5 75 15C85 25 75 40 75 40C75 40 90 40 90 50C90 60 75 60 75 60C75 60 85 75 75 85C65 95 50 85 50 85C50 85 35 95 25 85C15 75 25 60 25 60C25 60 10 60 10 50C10 40 25 40 25 40C25 40 15 25 25 15C35 5 50 15 50 15Z" fill="#F3A7C8" stroke="#5C1B1B" strokeWidth="3"/>
        <circle cx="50" cy="50" r="10" fill="#E4EE86" stroke="#5C1B1B" strokeWidth="3"/>
      </svg>

      {/* Flower 2 */}
      <svg className="anim-flower flower-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15C50 15 65 5 75 15C85 25 75 40 75 40C75 40 90 40 90 50C90 60 75 60 75 60C75 60 85 75 75 85C65 95 50 85 50 85C50 85 35 95 25 85C15 75 25 60 25 60C25 60 10 60 10 50C10 40 25 40 25 40C25 40 15 25 25 15C35 5 50 15 50 15Z" fill="#F0ED9F" stroke="#5C1B1B" strokeWidth="3"/>
        <circle cx="50" cy="50" r="10" fill="#F3A7C8" stroke="#5C1B1B" strokeWidth="3"/>
      </svg>

      {/* Sparkle 1 */}
      <svg className="anim-sparkle sparkle-1" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10C50 10 55 40 85 50C55 60 50 90 50 90C50 90 45 60 15 50C45 40 50 10 50 10Z" fill="#E4EE86" stroke="#5C1B1B" strokeWidth="3" strokeLinejoin="round"/>
      </svg>

      {/* Sparkle 2 */}
      <svg className="anim-sparkle sparkle-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10C50 10 55 40 85 50C55 60 50 90 50 90C50 90 45 60 15 50C45 40 50 10 50 10Z" fill="#F3A7C8" stroke="#5C1B1B" strokeWidth="3" strokeLinejoin="round"/>
      </svg>

      {/* Abstract Blob */}
      <svg className="anim-blob blob-1" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 40C170 60 180 90 170 120C160 150 130 170 95 175C60 180 20 160 10 125C0 90 20 40 55 20C90 0 130 20 150 40Z" fill="#F0ED9F" opacity="0.4"/>
      </svg>

      <svg className="anim-blob blob-2" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 40C170 60 180 90 170 120C160 150 130 170 95 175C60 180 20 160 10 125C0 90 20 40 55 20C90 0 130 20 150 40Z" fill="#F3A7C8" opacity="0.4"/>
      </svg>
    </div>
  );
}
