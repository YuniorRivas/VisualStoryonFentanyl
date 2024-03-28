document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('background-video');
    if (video) {
        video.playbackRate = 1.25;
    }

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 200;

            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 9);
            } else {
                counter.innerText = target.toString();
            }
        };
        updateCounter();
    });

    // Title animation with prevention for repeating and ensuring decipher effect
    const titleElement = document.querySelector('.title-container h1');
    if (!titleElement.getAttribute('data-animated')) { // Use a custom data attribute to track animation state
        titleElement.setAttribute('data-animated', 'true'); // Mark as animated
        let displayedText = '';
        const titleText = 'FENTANYL IN NEW YORK';
        let index = 0;

        const decipherTitle = () => {
            if (index < titleText.length) {
                displayedText += titleText[index++];
                titleElement.textContent = displayedText;
                setTimeout(decipherTitle, 100);
            }
        };
        decipherTitle();
    }

    // Drag to scroll functionality for the timeline
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    timelineWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        timelineWrapper.classList.add('active');
        startX = e.pageX - timelineWrapper.offsetLeft;
        scrollLeft = timelineWrapper.scrollLeft;
    });

    timelineWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        timelineWrapper.classList.remove('active');
    });

    timelineWrapper.addEventListener('mouseup', () => {
        isDown = false;
        timelineWrapper.classList.remove('active');
    });

    timelineWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timelineWrapper.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the scroll sensitivity
        timelineWrapper.scrollLeft = scrollLeft - walk;
    });
});

