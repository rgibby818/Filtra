<template>
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="100%" style="stop-color:#8b5cf6"/>
    </linearGradient>
    <linearGradient id="filterOverlay" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.6"/>
      <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.6"/>
    </linearGradient>
  </defs>
  
  <!-- Main container circle -->
  <circle cx="60" cy="60" r="50" fill="url(#modernGrad)"/>
  
  <!-- Image representation -->
  <rect x="35" y="40" width="50" height="40" rx="8" fill="white" opacity="0.95"/>
  
  <!-- Simple mountain/landscape inside -->
  <polygon points="38,70 48,58 55,62 68,52 82,75 82,77 38,77" fill="url(#modernGrad)" opacity="0.3"/>
  
  <!-- Simple circle for sun/moon -->
  <circle cx="70" cy="52" r="4" fill="url(#modernGrad)" opacity="0.4"/>
  
  <!-- Filter overlay effect -->
  <rect x="40" y="45" width="40" height="30" rx="6" fill="url(#filterOverlay)" mix-blend-mode="multiply"/>
  
  <!-- Three simple adjustment dots -->
  <g>
    <circle cx="25" cy="60" r="3" fill="white" opacity="0.9"/>
    <circle cx="95" cy="50" r="3" fill="white" opacity="0.9"/>
    <circle cx="95" cy="70" r="3" fill="white" opacity="0.9"/>
  </g>
</svg>
</template>