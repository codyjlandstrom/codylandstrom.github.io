document.addEventListener('DOMContentLoaded', function() {
    // Active Navigation Link
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Homepage Image Gallery (only if gallery elements exist)
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        const mainImage = document.getElementById('galleryMainImage');
        const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
        const prevButton = document.querySelector('.gallery-nav .prev');
        const nextButton = document.querySelector('.gallery-nav .next');

        // --- IMPORTANT: Define your gallery images here ---
        // The 'src' is the path to the large image
        // The 'thumb' is the path to the thumbnail image
        // The 'alt' is the alternative text for the image
        const galleryImages = [
            {
        src: 'images/gallery/1-very-southern-colorado.jpg',
        thumb: 'images/gallery/thumbs/1-very-southern-colorado.jpg',
        alt: 'Cody in Southern Colorado'
    },
    {
        src: 'images/gallery/2-cody-magic-flyer.jpg',
        thumb: 'images/gallery/thumbs/2-cody-magic-flyer.jpg',
        alt: 'Cody Landstrom Magic Flyer'
    },
    {
        src: 'images/gallery/3-cody-lincoln-center.jpg',
        thumb: 'images/gallery/thumbs/3-cody-lincoln-center.jpg',
        alt: 'Cody at Lincoln Center'
    },
    {
        src: 'images/gallery/4-cody-lincoln-center2.jpg',
        thumb: 'images/gallery/thumbs/4-cody-lincoln-center2.jpg',
        alt: 'Cody at Lincoln Center (Alternate View)'
    },
    {
        src: 'images/gallery/5-cody-close-up-magic.jpg',
        thumb: 'images/gallery/thumbs/5-cody-close-up-magic.jpg',
        alt: 'Cody performing close-up magic'
    },
    {
        src: 'images/gallery/6-cody-juggling-bw.jpg',
        thumb: 'images/gallery/thumbs/6-cody-juggling-bw.jpg',
        alt: 'Cody juggling (Black and White)'
    },
    {
        src: 'images/gallery/7-1880-train-hill-city.jpg',
        thumb: 'images/gallery/thumbs/7-1880-train-hill-city.jpg',
        alt: '1880 Train in Hill City'
    },
    {
        src: 'images/gallery/8-rapid-city.jpg',
        thumb: 'images/gallery/thumbs/8-rapid-city.jpg',
        alt: 'Cody in Rapid City'
    },
    {
        src: 'images/gallery/9-card-in-glass.jpg',
        thumb: 'images/gallery/thumbs/9-card-in-glass.jpg',
        alt: 'Card in glass magic trick'
    },
    {
        src: 'images/gallery/10-cody-on-the-road-chama.jpg',
        thumb: 'images/gallery/thumbs/10-cody-on-the-road-chama.jpg',
        alt: 'Cody on the road in Chama'
    },
    {
        src: 'images/gallery/11-cody-card-spread.jpg',
        thumb: 'images/gallery/thumbs/11-cody-card-spread.jpg',
        alt: 'Cody with a card spread'
    },
    {
        src: 'images/gallery/12-cody-old-west-flyer.jpg',
        thumb: 'images/gallery/thumbs/12-cody-old-west-flyer.jpg',
        alt: 'Cody Old West style flyer'
    },
    {
        src: 'images/gallery/13-cody-front-page-pioneer.jpg',
        thumb: 'images/gallery/thumbs/13-cody-front-page-pioneer.jpg',
        alt: 'Cody on the front page of the Pioneer'
    },
    {
        src: 'images/gallery/14-cody-baloon.jpg', // Note: "baloon" - typo in filename?
        thumb: 'images/gallery/thumbs/14-cody-baloon.jpg',
        alt: 'Cody with a balloon'
    },
    {
        src: 'images/gallery/15-cody-vondonners.jpg',
        thumb: 'images/gallery/thumbs/15-cody-vondonners.jpg',
        alt: 'Cody at Vondonners'
    },
    {
        src: 'images/gallery/16-cody-juggling-fire.jpg',
        thumb: 'images/gallery/thumbs/16-cody-juggling-fire.jpg',
        alt: 'Cody juggling fire'
    },
    {
        src: 'images/gallery/17-cody-juggle.jpg',
        thumb: 'images/gallery/thumbs/17-cody-juggle.jpg',
        alt: 'Cody juggling'
    },
    {
        src: 'images/gallery/18-cody-card-catch.jpg',
        thumb: 'images/gallery/thumbs/18-cody-card-catch.jpg',
        alt: 'Cody performing a card catch'
    },
    {
        src: 'images/gallery/19-cody-flyer.jpg',
        thumb: 'images/gallery/thumbs/19-cody-flyer.jpg',
        alt: 'Cody Landstrom flyer'
    },
    {
        src: 'images/gallery/20-cody-front-cover.jpg',
        thumb: 'images/gallery/thumbs/20-cody-front-cover.jpg',
        alt: 'Cody on a front cover'
    },
    {
        src: 'images/gallery/21-mcsorleys-card-on-celing.jpg', // Note: "celing" - typo in filename?
        thumb: 'images/gallery/thumbs/21-mcsorleys-card-on-celing.jpg',
        alt: 'McSorleys card on ceiling trick'
    },
    {
        src: 'images/gallery/22-street-show-early-days.jpg',
        thumb: 'images/gallery/thumbs/22-street-show-early-days.jpg',
        alt: 'Street show from early days'
    },
    {
        src: 'images/gallery/23-Cody-on-the-1880-train.jpg',
        thumb: 'images/gallery/thumbs/23-Cody-on-the-1880-train.jpg',
        alt: 'Cody on the 1880 train'
    }
        ];
        // --- End of image definitions ---


        let currentImageIndex = 0;

        function showImage(index) {
            if (index < 0 || index >= galleryImages.length) return;
            currentImageIndex = index;
            mainImage.src = galleryImages[index].src;
            mainImage.alt = galleryImages[index].alt;

            // Update active thumbnail
            const allThumbnails = thumbnailsContainer.querySelectorAll('img');
            allThumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }

        function populateThumbnails() {
            galleryImages.forEach((image, index) => {
                const thumbImg = document.createElement('img');
                thumbImg.src = image.thumb;
                thumbImg.alt = `Thumbnail for ${image.alt}`;
                thumbImg.dataset.index = index;
                thumbImg.addEventListener('click', () => showImage(index));
                thumbnailsContainer.appendChild(thumbImg);
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let newIndex = currentImageIndex - 1;
                if (newIndex < 0) newIndex = galleryImages.length - 1;
                showImage(newIndex);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let newIndex = currentImageIndex + 1;
                if (newIndex >= galleryImages.length) newIndex = 0;
                showImage(newIndex);
            });
        }
        
        if (galleryImages.length > 0) {
            populateThumbnails();
            showImage(0); // Show the first image initially
        } else {
            console.warn("No images defined for the gallery in script.js");
            if(mainImage) mainImage.alt = "Gallery image placeholder - configure images in script.js";
        }
    }
});