document.addEventListener("DOMContentLoaded", function () {
  // UpdateLogoImages();
  async function UpdateGalleryImages() {
    const imageFolder = "LavisGallaryImages/Gallery/";

    // Fetch images from imageFolder and store in imageList Array
    fetchImages(imageFolder)
      .then((imageList) => {
        const gallery = document.querySelector(".masonry__brick");

        imageList.forEach((imageData) => {
          const itemFolio = document.createElement("div");
          itemFolio.classList.add("item-folio");

          const itemFolioThumb = document.createElement("div");
          itemFolioThumb.classList.add("item-folio__thumb");

          const thumbLink = document.createElement("a");
          thumbLink.href = imageData.fileName;
          thumbLink.classList.add("thumb-link");
          thumbLink.title = imageData.title;
          thumbLink.dataset.size = "1050x700";

          const img = document.createElement("img");
          img.src = imageData.fileName;
          img.srcset = `${imageData.fileName} 1x, ${imageData.fileName.replace(
            ".jpg",
            "@2x.jpg"
          )} 2x`;
          img.alt = "";

          thumbLink.appendChild(img);
          itemFolioThumb.appendChild(thumbLink);
          itemFolio.appendChild(itemFolioThumb);
          gallery.appendChild(itemFolio);
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }

  async function fetchImages(folder) {
    try {
      const response = await fetch(folder);
      const data = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const links = doc.querySelectorAll("a");

      // Filter out non-image files (e.g., subdirectories, etc.)
      const imageFiles = Array.from(links)
        .map((link) => link.getAttribute("href"))
        .filter((link) => /\.(jpg|jpeg|png|gif)$/i.test(link));

      // Create imageList array with image data
      const imageList = imageFiles.map((fileName) => {
        return {
          title: fileName.replace(/\.[^/.]+$/, ""), // Remove file extension
          category: "Category", // Adjust as needed
          link: "https://www.behance.net/", // Adjust as needed
          caption: "Image caption", // Adjust as needed
          fileName: fileName,
        };
      });

      return imageList;
    } catch (error) {
      throw new Error("Error fetching images: " + error.message);
    }
  }

  UpdateGalleryImages();
});
