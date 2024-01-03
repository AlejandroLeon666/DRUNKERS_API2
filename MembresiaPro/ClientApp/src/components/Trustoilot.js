import React, { useEffect } from 'react';

const TrustpilotWidget = () => {
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(document.getElementById('trustpilot-widget'), true);
    }
  }, []);

  return (
    <div
      id="trustpilot-widget"
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="5419b6a8b0d04a076446a9ad"
      data-businessunit-id="5c75d0567d965f000116f0fc"
      data-style-height="50"
      data-style-width="100%"
      data-theme="dark"
      data-style-alignment="center"
    >
      <a
        href="https://www.trustpilot.com/review/drunkers.com.mx"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotWidget;


// @media (max-width: 640px) {
//   .text-media {
//     font-sizew: 20vh; /* Adjusted width for mobile screens */
//   }
// }

// <div class="container-trustpilot-height"  style="background-color: #000; height: 12vh; width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: center;" class="container-trustpilot">
//     <div style="padding-left: 2.5rem; color: #fff; display: flex; justify-content: center; align-items: center;" class="container-Fast">
//         <IoCloudDownloadSharp style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class="text-white-item" />
//         <div>
//             <p style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class="text-white-item">Super fast</p>
//             <p style="color: #ccc;" class="text-gray-400">Instant digital download</p>
//         </div>
//     </div>
//     <div style="padding-left: 2.5rem; color: #fff; display: flex; justify-content: center; align-items: center;" class="container-Fast">
//         <SiAdguard style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class="text-white-item" />
//         <div>
//             <p style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class='text-white-item'>Reliable & safe</p>
//             <p style="color: #ccc;" class="text-gray-400">Over 10 000 games</p>
//         </div>
//     </div>
//     <div style="padding-left: 2.5rem; color: #fff; display: flex; justify-content: center; align-items: center;" class="container-Fast">
//         <IoLogoWechat style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class="text-white-item" />
//         <div>
//             <p style="color: #fff; font-size: 1.875rem; margin: 0.75rem;" class='text-white-item'>Customer support</p>
//             <p style="color: #ccc;" class="text-gray-400">Human support 24/7</p>
//         </div>
//     </div>
//     <div style="padding-left: 2.5rem; color: #fff; text-align: center; display: flex; justify-content: center; align-items: center;" class="container-Fast">
//         <TrustpilotWidget />
//     </div>
// </div>
