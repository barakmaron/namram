/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'forest-green': {
          '50': '#f1fcf1',
          '100': '#ddfbdf',
          '200': '#bef4c3',
          '300': '#8bea95',
          '400': '#51d760',
          '500': '#29be3b',
          '600': '#1c9d2c',
          '700': '#187223',
          '800': '#1a6123',
          '900': '#175020',
        }
      },
      backgroundImage: {
        'home': "url('/src/images/home_pic.webp')",
        'rent': "url('/src/images/RentPic.webp')",
        'shop': "url('/src/images/ShopPic.webp')",
        'cut': "url('/src/images/CutPic.webp')",
        'cut-2': "url('/src/images/CutPic2.webp')",
        'cut-video-image': "url('/src/images/CutPicVideo.webp')",
        'cut-3': "url('/src/images/CutPic3.webp')",
        "drill": "url('/src/images/DrillPic.webp')",
        "drill-2": "url('/src/images/DrillPic2.webp')",
        "drill-3": "url('/src/images/DrillPic3.webp')",
        'drill-video-image': "url('/src/images/DrillPicVideo.webp')",
        'project': "url('/src/images/ProjectsPic.webp')",
        'project-2': "url('/src/images/ProjectsPic2.webp')",
        'cable': "url('/src/images/CablePic.webp')",
        "cable-video-image": "url('/src/images/CableVideoPic.webp')",
        "cable-2": "url('/src/images/CablePic2.webp')",
        "cable-3": "url('/src/images/CablePic3.webp')"
      }
    },
  },
  plugins: [require("daisyui")],
}
