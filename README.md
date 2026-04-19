# Framify (formerly PoseGuru) 📸✨

> **Your personal photography assistant.** Master every shot with a rich library of categorized poses and live camera guidance.

![Framify App](/public/poses/preview-placeholder.png) <!-- Remember to update this path once you add screenshots later -->

## 🌟 About The Project

**Framify** is an innovative, responsive, Progressive Web App (PWA) that acts as your personal photography director. Taking professional photos and directing subjects can often feel awkward or difficult. Framify removes the guesswork by providing a **real-time camera feed** with **semi-transparent pose overlays**. 

Whether you're shooting portraits, casual moments, or fashion shots, you can browse through a beautifully categorized library of poses, align your subject with the on-screen overlay, and capture the perfect shot every time. All without your photos ever leaving your device!

## 🚀 Key Features

- **Live Camera Overlays:** Easy-to-follow, semi-transparent visual guides over your live camera feed to align your subjects perfectly.
- **Extensive Pose Library:** Browse through a highly-categorized collection of poses suited for any style or mood.
- **Integrated Secure Gallery:** Snap and save your best shots to your personalized gallery via IndexedDB without needing a backend server!
- **Progressive Web App (PWA):** Install it directly to your home screen for a fast, native-like experience. Completely installable from your mobile browser.
- **Privacy First:** 100% of the image processing and storage happens on your local device.

## 🛠️ Tech Stack

This project is built using modern web development technologies to ensure a fast, robust, and delightful user experience:

- **Framework:** [Next.js 16](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling:** [TailwindCSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Client Storage:** [`idb-keyval`](https://www.npmjs.com/package/idb-keyval) for robust IndexedDB interactions
- **Language:** TypeScript

## 🚦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/mrcoffeebean14/Framify.git
   ```
2. **Navigate to the project directory**
   ```sh
   cd Framify
   ```
3. **Install NPM packages**
   ```sh
   npm install
   ```
4. **Run the development server**
   ```sh
   npm run dev
   ```
5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.  
   *(Note: Browsers restrict camera APIs to secure contexts. If you are testing on an external mobile device, you will need to serve it over HTTPS using tools like `localtunnel` or `ngrok`.)*

## 📸 How to Use

1. **Allow Permissions:** When you first load the app, accept the browser's request for camera access.
2. **Pick a Pose:** Hit the Pose Library and select the style or category of photo you wish to capture.
3. **Align & Shoot:** A semi-transparent overlay will appear on your live camera feed. Direct your subject to match the outline, and hit the capture button!
4. **Review:** Head over to the Gallery screen to review, download, or manage all your perfectly aligned shots.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Developed by mrcoffeebean14.*
