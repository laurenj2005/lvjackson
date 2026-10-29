/*
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i + tabs.length - 1) % tabs.length];
      if (n) { e.preventDefault(); select(n); n.focus(); }
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
  const tabList = document.querySelector('[role="tablist"]');

  if (!tabList) return;

  const tabs = Array.from(
    tabList.querySelectorAll('[role="tab"]')
  );

  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute("aria-controls"))
  );

  // Make sure every tab has a corresponding panel.
  if (tabs.length === 0 || panels.some((panel) => !panel)) {
    console.error("A work tab is missing its corresponding panel.");
    return;
  }

  function activateTab(activeTab, moveFocus = false) {
    tabs.forEach((tab, index) => {
      const isActive = tab === activeTab;

      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      panels[index].hidden = !isActive;
    });

    if (moveFocus) {
      activeTab.focus();
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
    });

    tab.addEventListener("keydown", (event) => {
      let nextIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;

        case "ArrowLeft":
          nextIndex = (index - 1 + tabs.length) % tabs.length;
          break;

        case "Home":
          nextIndex = 0;
          break;

        case "End":
          nextIndex = tabs.length - 1;
          break;

        default:
          return;
      }

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  // Respect the initially selected tab in the HTML.
  const initialTab =
    tabs.find((tab) => tab.getAttribute("aria-selected") === "true")
    || tabs[0];

  activateTab(initialTab);
});
// del later 

const photoButtons = document.querySelectorAll(".photo-item");
const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");

let lastFocusedPhoto = null;

function openLightbox(button) {
  const image = button.querySelector("img");

  lastFocusedPhoto = button;
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = image.alt;

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";

  if (lastFocusedPhoto) {
    lastFocusedPhoto.focus();
  }
}

photoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(button);
  });
});

closeButton.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.hidden && event.key === "Escape") {
    closeLightbox();
  }
});

})();
*/ 



"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. PORTFOLIO TABS
  // ==========================================

  const tabList = document.querySelector('[role="tablist"]');
  const tabs = Array.from(
    document.querySelectorAll('[role="tab"]')
  );

  const panels = tabs
    .map((tab) => {
      const panelId = tab.getAttribute("aria-controls");
      return panelId ? document.getElementById(panelId) : null;
    })
    .filter(Boolean);

  function activateTab(selectedTab, moveFocus = false) {
    if (!selectedTab) return;

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;

      tab.setAttribute("aria-selected", String(isSelected));
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isActive =
        panel.id === selectedTab.getAttribute("aria-controls");

      panel.hidden = !isActive;
    });

    if (moveFocus) {
      selectedTab.focus();
    }
  }

  if (tabs.length > 0) {
    const initialTab =
      tabs.find(
        (tab) => tab.getAttribute("aria-selected") === "true"
      ) || tabs[0];

    activateTab(initialTab);

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        activateTab(tab);
      });

      tab.addEventListener("keydown", (event) => {
        let nextIndex = index;

        switch (event.key) {
          case "ArrowRight":
            nextIndex = (index + 1) % tabs.length;
            break;

          case "ArrowLeft":
            nextIndex = (index - 1 + tabs.length) % tabs.length;
            break;

          case "Home":
            nextIndex = 0;
            break;

          case "End":
            nextIndex = tabs.length - 1;
            break;

          default:
            return;
        }

        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });
  }

  // ==========================================
  // 2. PHOTOGRAPHY LIGHTBOX
  // ==========================================

  const lightbox = document.getElementById("photo-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = lightbox?.querySelector(".lightbox-close");
  const photoButtons = Array.from(
    document.querySelectorAll(".photo-item")
  );

  let previousFocus = null;
  let currentPhotoIndex = -1;

  if (!lightbox || !lightboxImage) return;

  function getPhotoSource(button) {
    const image = button.querySelector("img");

    return (
      button.dataset.full ||
      image?.dataset.full ||
      image?.currentSrc ||
      image?.src ||
      ""
    );
  }

  function getPhotoAlt(button) {
    const image = button.querySelector("img");

    return image?.alt || "Expanded portfolio photograph";
  }

  function openLightbox(button) {
    const source = getPhotoSource(button);

    if (!source) return;

    previousFocus = button;
    currentPhotoIndex = photoButtons.indexOf(button);

    lightboxImage.src = source;
    lightboxImage.alt = getPhotoAlt(button);

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    closeButton?.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    document.body.classList.remove("lightbox-open");

    if (previousFocus?.isConnected) {
      previousFocus.focus();
    }

    previousFocus = null;
    currentPhotoIndex = -1;
  }

  function showPhoto(index) {
    if (photoButtons.length === 0) return;

    const total = photoButtons.length;
    currentPhotoIndex = (index + total) % total;

    const button = photoButtons[currentPhotoIndex];
    const source = getPhotoSource(button);

    if (!source) return;

    lightboxImage.src = source;
    lightboxImage.alt = getPhotoAlt(button);
  }

  photoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button);
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  // Close when the user clicks the dark backdrop.
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls for the open lightbox.
  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        closeLightbox();
        break;

      case "ArrowRight":
        event.preventDefault();
        showPhoto(currentPhotoIndex + 1);
        break;

      case "ArrowLeft":
        event.preventDefault();
        showPhoto(currentPhotoIndex - 1);
        break;

      case "Tab": {
        // Keep keyboard focus inside the lightbox.
        const focusableElements = Array.from(
          lightbox.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => element.getClientRects().length > 0);

        if (focusableElements.length === 0) {
          event.preventDefault();
          lightbox.focus();
          break;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first.focus();
        }

        break;
      }

      default:
        break;
    }
  });


  // CONTACT FORM: OPEN THE VISITOR'S EMAIL APP

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      
      const recipient = "laurenjackson958@gmail.com";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const mailto =
        `mailto:${recipient}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${body}`;

      if (formStatus) {
        formStatus.textContent =
          "Your email application is opening. Click Send in your email app to submit your message.";
      }

      window.location.href = mailto;
    });
  }

});
