function sharePost() {
  const title = document.querySelector('.post-title').textContent;
  const url = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    })
    .catch(console.error);
  } else {
    window.open(`https://x.com/intent/post?text="${encodeURIComponent(title)}"&url=${encodeURIComponent(url)}&via=NamanyayG`);
  }
}

// Author link scroll functionality
function scrollToAuthor(event) {
  event.preventDefault();
  const authorSection = document.getElementById('author-callout');
  if (authorSection) {
    // Slow scroll to indicate user can manually scroll back
    const targetPosition = authorSection.offsetTop - 50;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 2000; // 2 seconds for slow scroll
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Ease-in-out function for smooth animation
      const easeInOut = progress => progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, startPosition + distance * easeInOut(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
}

// Subscribe button and other functionality
document.addEventListener('DOMContentLoaded', function() {
  // Subscribe button functionality
  const subscribeBtn = document.getElementById('subscribe-button');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (typeof showSubscribePopup === 'function') {
        showSubscribePopup();
      }
      return false;
    });
  }

  // Flippable figure functionality
  const flippables = document.querySelectorAll('.figure-flippable');

  flippables.forEach(function(flippable) {
    const container = flippable.querySelector('.figure-flippable__container');
    const buttons = flippable.querySelectorAll('.figure-flippable__toggle-button');

    if (container && buttons.length > 0) {
      buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
          e.stopPropagation();
          container.classList.toggle('figure-flippable__container--flipped');
          const isFlipped = container.classList.contains('figure-flippable__container--flipped');

          // Update all buttons in this flippable to keep them in sync
          buttons.forEach(function(btn) {
            btn.textContent = isFlipped ? 'Show Stylized' : 'Show Original';
          });
        });
      });
    }
  });
});