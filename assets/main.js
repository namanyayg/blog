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

// Initialize footnote hover tooltips
function initializeFootnotes() {
  // Remove the hr kramdown generates before footnotes section
  const footnotesSection = document.querySelector('.footnotes');
  if (footnotesSection && footnotesSection.previousElementSibling && footnotesSection.previousElementSibling.tagName === 'HR') {
    footnotesSection.previousElementSibling.remove();
  }

  // Match kramdown's output: <sup id="fnref:X"><a href="#fn:X" class="footnote">X</a></sup>
  const footnoteSups = document.querySelectorAll('sup[id^="fnref:"]');

  footnoteSups.forEach(function(sup) {
    const link = sup.querySelector('a.footnote, a[href^="#fn:"]');
    if (!link) return;

    // Add class for styling
    sup.classList.add('footnote-ref');

    // Get the footnote ID from the href
    const footnoteId = link.getAttribute('href');
    if (!footnoteId) return;

    // Find the corresponding footnote content
    // Escape the colon in the ID selector (kramdown uses fn:1 format)
    const escapedId = footnoteId.replace(/:/g, '\\:');
    const footnoteContent = document.querySelector(escapedId);
    if (!footnoteContent) return;

    // Clone the footnote content (excluding the back reference)
    const content = footnoteContent.cloneNode(true);
    const backrefs = content.querySelectorAll('.reversefootnote, a[href^="#fnref"]');
    backrefs.forEach(function(ref) { ref.remove(); });

    // Create tooltip element - append to body to avoid inheriting sup styles
    const tooltip = document.createElement('div');
    tooltip.className = 'footnote-tooltip';
    tooltip.innerHTML = content.innerHTML;
    document.body.appendChild(tooltip);

    // Position and show tooltip on mouseenter
    sup.addEventListener('mouseenter', function() {
      var supRect = sup.getBoundingClientRect();
      var tooltipWidth = tooltip.offsetWidth || 350;
      var viewportWidth = window.innerWidth;

      // Mobile: fixed at bottom
      if (viewportWidth <= 640) {
        tooltip.style.position = 'fixed';
        tooltip.style.left = '1rem';
        tooltip.style.right = '1rem';
        tooltip.style.bottom = '1rem';
        tooltip.style.top = 'auto';
      } else {
        // Desktop: position next to footnote
        tooltip.style.position = 'fixed';
        tooltip.style.top = supRect.top + 'px';
        tooltip.style.bottom = 'auto';

        // Check if tooltip would go off the right edge
        if (supRect.right + tooltipWidth + 20 > viewportWidth) {
          // Position on left
          tooltip.style.left = 'auto';
          tooltip.style.right = (viewportWidth - supRect.left + 8) + 'px';
        } else {
          // Position on right
          tooltip.style.left = (supRect.right + 8) + 'px';
          tooltip.style.right = 'auto';
        }
      }

      tooltip.classList.add('footnote-tooltip--visible');
    });

    sup.addEventListener('mouseleave', function(e) {
      // Don't hide if moving to the tooltip itself
      if (e.relatedTarget === tooltip || tooltip.contains(e.relatedTarget)) return;
      tooltip.classList.remove('footnote-tooltip--visible');
    });

    tooltip.addEventListener('mouseleave', function(e) {
      // Don't hide if moving back to the sup
      if (e.relatedTarget === sup || sup.contains(e.relatedTarget)) return;
      tooltip.classList.remove('footnote-tooltip--visible');
    });

    // Prevent default link behavior when clicking on mobile
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 640) {
        e.preventDefault();
        tooltip.classList.toggle('footnote-tooltip--visible');
      }
    });
  });

  // Close mobile tooltips when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.footnote-ref') && !e.target.closest('.footnote-tooltip')) {
      document.querySelectorAll('.footnote-tooltip').forEach(function(tooltip) {
        if (window.innerWidth <= 640) {
          tooltip.classList.remove('footnote-tooltip--visible');
        }
      });
    }
  });
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

  // Footnote hover tooltips
  initializeFootnotes();

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