/* Static HTML is authoritative. Every animation is a progressive enhancement. */
(() => {
  "use strict";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const track = (event, detail = {}) =>
    document.dispatchEvent(
      new CustomEvent("revenue-inbox:event", { detail: { event, ...detail } }),
    );
  const menu = document.querySelector(".mobile-menu");
  if (menu) {
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.open = false;
      }),
    );
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
  }
  document.querySelectorAll(".faq-list details").forEach((el) =>
    el.addEventListener("toggle", () => {
      if (el.open)
        track("faq_open", {
          question: el.querySelector("summary").textContent.trim(),
        });
    }),
  );
  document.querySelectorAll("[data-video]").forEach((facade) =>
    facade.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      track("video_play", { video: facade.dataset.video });
      const frame = document.createElement("iframe");
      frame.src = `https://player.vimeo.com/video/${facade.dataset.video}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=8A40EA`;
      frame.title = facade.getAttribute("aria-label");
      frame.allow = "autoplay; fullscreen; picture-in-picture";
      frame.allowFullscreen = true;
      const player = document.createElement("div");
      player.className = "video-player";
      player.append(frame);
      const fallback = document.createElement("a");
      fallback.href = facade.href;
      fallback.target = "_blank";
      fallback.rel = "noopener";
      fallback.className = "text-link";
      fallback.textContent = "Open video on Vimeo";
      facade.replaceWith(player, fallback);
      frame.focus();
      document.dispatchEvent(new Event("revenue-inbox:video-start"));
    }),
  );
  const model = document.querySelector("#pipeline-math");
  if (model)
    model.querySelectorAll('input[name="acv"]').forEach((input) =>
      input.addEventListener("change", () => {
        const value = Number(input.value),
          cost = 10500;
        model.querySelector("#break-even-value").textContent = String(
          Math.ceil(cost / value),
        );
        model.querySelector("#break-even-copy").textContent =
          `${currency.format(cost)} ÷ ${currency.format(value)} = ${(cost / value).toFixed(2)} contracts. You need one whole deal.`;
        model.querySelector("#roi-revenue").textContent = currency.format(
          3 * value,
        );
        track("roi_toggle", { contract_value: value });
        if (window.gsap && !reduced.matches) {
          gsap.fromTo(
            model.querySelectorAll(".funnel-row i"),
            { scaleX: 0.93 },
            {
              scaleX: 1,
              duration: 0.5,
              stagger: 0.07,
              ease: "power3.out",
              overwrite: true,
            },
          );
          gsap.fromTo(
            "#roi-revenue",
            { y: 8, opacity: 0.7 },
            { y: 0, opacity: 1, duration: 0.5, overwrite: true },
          );
        }
      }),
    );
  // No third-party request before booking intent. A native dialog handles focus trapping.
  const dialog = document.querySelector(".booking-dialog");
  let bookingTrigger = null;
  if (dialog) {
    dialog
      .querySelector(".dialog-close")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog.close();
      }
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("booking-open");
      bookingTrigger?.focus();
    });
  }
  document
    .querySelectorAll(
      'a[href="https://calendly.com/therevenueinboxagency/discovery"]',
    )
    .forEach((link) => {
      link.dataset.event = "cta_click";
      link.dataset.location ||= link.closest("section")?.id || "footer";
      link.addEventListener("click", (e) => {
        track("cta_click", { location: link.dataset.location });
        if (
          e.ctrlKey ||
          e.metaKey ||
          e.shiftKey ||
          e.altKey ||
          !dialog ||
          !dialog.showModal ||
          link.closest("dialog")
        )
          return;
        e.preventDefault();
        bookingTrigger = link;
        if (!dialog.querySelector("iframe")) {
          const frame = document.createElement("iframe");
          frame.src =
            "https://calendly.com/therevenueinboxagency/discovery?embed_domain=" +
            encodeURIComponent(location.hostname) +
            "&embed_type=Inline&primary_color=8a40ea&hide_gdpr_banner=0";
          frame.title = "Choose a time for your strategy call";
          dialog.querySelector(".booking-embed").append(frame);
        }
        document.body.classList.add("booking-open");
        dialog.showModal();
        dialog.querySelector(".dialog-close").focus();
      });
    });
  const mobileBar = document.querySelector(".mobile-booking"),
    hero = document.querySelector(".alive-hero"),
    final = document.querySelector("#contact");
  let heroVisible = true,
    finalVisible = false;
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === final) finalVisible = e.isIntersecting;
        });
        if (mobileBar) mobileBar.hidden = heroVisible || finalVisible || !hero;
      },
      { threshold: 0 },
    );
    if (hero) observer.observe(hero);
    if (final) observer.observe(final);
  }
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  let inboxLoop = null,
    logoLoop = null,
    userPaused = false,
    videoPlaying = false;
  const motionButton = document.querySelector("[data-motion-toggle]");
  const syncLoop = () => {
    const r = document.querySelector(".inbox-scene")?.getBoundingClientRect();
    const sceneVisible = !!r && r.bottom > 100 && r.top < innerHeight;
    const disabled = userPaused || videoPlaying || document.hidden;
    inboxLoop?.paused(disabled || !sceneVisible);
    const l = document.querySelector(".clients")?.getBoundingClientRect();
    logoLoop?.paused(
      disabled || sceneVisible || !l || l.bottom < 100 || l.top > innerHeight,
    );
  };
  motionButton?.removeAttribute("hidden");
  motionButton?.addEventListener("click", () => {
    userPaused = !userPaused;
    if (!userPaused) videoPlaying = false;
    motionButton.setAttribute("aria-pressed", String(userPaused));
    motionButton.textContent = userPaused ? "Resume motion" : "Pause motion";
    syncLoop();
  });
  document.addEventListener("visibilitychange", syncLoop);
  document.addEventListener("revenue-inbox:video-start", () => {
    videoPlaying = true;
    userPaused = true;
    if (motionButton) {
      motionButton.setAttribute("aria-pressed", "true");
      motionButton.textContent = "Resume motion";
    }
    syncLoop();
  });
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      ".alive-hero h1 span",
      { y: 14 },
      { y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    );
    document
      .querySelectorAll("section:not(.alive-hero) h2")
      .forEach((h) =>
        gsap.fromTo(
          h,
          { y: 12 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 92%", once: true },
          },
        ),
      );
    const count = document.querySelector("[data-count]");
    if (count) {
      const v = { n: 970 };
      gsap.to(v, {
        n: 1000,
        duration: 0.9,
        delay: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          count.textContent = Math.round(v.n).toLocaleString("en-US") + "+";
        },
        onComplete: () => {
          count.textContent = "1,000+";
        },
      });
    }
    if (hero) {
      inboxLoop = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        delay: 1.5,
        paused: true,
      });
      inboxLoop
        .fromTo(
          ".reply-arrival",
          { x: 14, opacity: 0.55 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        )
        .to(
          ".reply-arrival .tag",
          {
            scale: 1.05,
            duration: 0.35,
            repeat: 1,
            yoyo: true,
            ease: "power2.inOut",
          },
          "+=.7",
        )
        .fromTo(
          ".calendar-slip",
          { y: 14, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "+=.5",
        )
        .to({}, { duration: 3 });
      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom 100px",
        onToggle: syncLoop,
      });
      syncLoop();
    }
    document.querySelectorAll(".case-art").forEach((art) => {
      gsap.fromTo(
        art,
        { y: 16 },
        {
          y: -8,
          ease: "none",
          scrollTrigger: {
            trigger: art,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.fromTo(
        art.querySelectorAll("i"),
        { scale: 0.85 },
        {
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: { amount: 0.25 },
          scrollTrigger: { trigger: art, start: "top 80%", once: true },
        },
      );
    });
    return () => {
      inboxLoop?.kill();
      inboxLoop = null;
      if (count) count.textContent = "1,000+";
      gsap.set(".reply-arrival,.calendar-slip", { clearProps: "all" });
    };
  });
  mm.add(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    () => {
      const track = document.querySelector(".logo-track"),
        strip = track?.querySelector(".logo-strip");
      if (!strip) return;
      const clone = strip.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("img").forEach((img) => (img.alt = ""));
      track.append(clone);
      track.classList.add("marquee-ready");
      logoLoop = gsap.to(track, {
        x: () => -(strip.getBoundingClientRect().width + 32),
        duration: 32,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      ScrollTrigger.create({
        trigger: ".clients",
        start: "top bottom",
        end: "bottom 100px",
        onToggle: syncLoop,
      });
      syncLoop();
      return () => {
        logoLoop?.kill();
        logoLoop = null;
        clone.remove();
        track.classList.remove("marquee-ready");
        gsap.set(track, { clearProps: "transform" });
      };
    },
  );
  mm.add(
    "(min-width: 1024px) and (min-height: 900px) and (prefers-reduced-motion: no-preference)",
    () => {
      const stage = document.querySelector(".system-stage");
      if (!stage) return;
      document.body.classList.add("motion-enabled");
      const steps = [...stage.querySelectorAll("[data-step]")],
        stops = [...stage.querySelectorAll("[data-route]")],
        traveler = stage.querySelector(".travelling-lead"),
        destination = stage.querySelector(".lead-destination"),
        status = destination.querySelector(".tag");
      let current = -1;
      const tr = traveler.getBoundingClientRect(),
        dr = destination
          .querySelector(".calendar-icon")
          .getBoundingClientRect();
      const landing = {
        x: dr.left + dr.width / 2 - tr.left - tr.width / 2,
        y: dr.top + dr.height / 2 - tr.top - tr.height / 2,
      };
      const activate = (index) => {
        if (index === current) return;
        current = index;
        steps.forEach((el, i) => el.classList.toggle("is-active", i === index));
        stops.forEach((el, i) => el.classList.toggle("is-active", i <= index));
      };
      gsap.set(steps.slice(1), { autoAlpha: 0 });
      status.textContent = "Not booked yet";
      let tl;
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top 112px",
          end: "+=1100",
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          onUpdate: (self) => {
            const time = self.progress * 5.6;
            activate(Math.min(4, Math.max(0, Math.floor(time - 0.4))));
            status.textContent = time >= 5.35 ? "Booked" : "Not booked yet";
          },
        },
      });
      steps.forEach((step, i) => {
        if (i > 0) {
          tl.to(steps[i - 1], { autoAlpha: 0, y: -12, duration: 0.18 }, i);
          tl.fromTo(
            step,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.25 },
            i + 0.4,
          );
        }
        tl.to(traveler, { y: i * 68, duration: 0.4, ease: "power2.inOut" }, i);
      });
      tl.to(
        traveler,
        { x: landing.x, y: landing.y, duration: 0.55, ease: "power2.inOut" },
        4.8,
      )
        .to(traveler, { autoAlpha: 0, duration: 0.15 }, 5.35)
        .to({}, { duration: 0.1 }, 5.5);
      activate(0);
      return () => {
        document.body.classList.remove("motion-enabled");
        status.textContent = "Booked";
        gsap.set([...steps, traveler, destination], { clearProps: "all" });
        steps.forEach((e) => e.classList.remove("is-active"));
      };
    },
  );
  mm.add(
    "(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 899px) and (prefers-reduced-motion: no-preference)",
    () => {
      const board = document.querySelector(".system-board");
      if (board)
        gsap.fromTo(
          ".lead-destination",
          { y: 12 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: board,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          },
        );
    },
  );
  mm.add(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    () => {
      const handlers = [];
      document.querySelectorAll(".button.primary").forEach((button) => {
        const move = (e) => {
          const r = button.getBoundingClientRect();
          gsap.to(button, {
            x: (e.clientX - r.left - r.width / 2) * 0.07,
            y: (e.clientY - r.top - r.height / 2) * 0.1,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });
        };
        const leave = () =>
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", leave);
        handlers.push(() => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", leave);
          gsap.set(button, { clearProps: "transform" });
        });
      });
      document.querySelectorAll(".case-row").forEach((card) => {
        const move = (e) => {
          const r = card.getBoundingClientRect();
          gsap.to(card, {
            rotationX: -(e.clientY - r.top - r.height / 2) / r.height,
            rotationY: (e.clientX - r.left - r.width / 2) / r.width,
            transformPerspective: 1400,
            duration: 0.4,
            overwrite: true,
          });
        };
        const leave = () =>
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            overwrite: true,
          });
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        handlers.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          gsap.set(card, { clearProps: "transform" });
        });
      });
      return () => handlers.forEach((clean) => clean());
    },
  );
  document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
