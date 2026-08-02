const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const formatNumber = (value, decimals) => {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const animateCount = (element) => {
  const target = Number(element.dataset.target);
  const decimals = Number(element.dataset.decimals || 0);
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    element.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
    }
  };

  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll(".count").forEach((element) => countObserver.observe(element));

const pipelineMathSection = document.querySelector(".pipeline-math-section");

if (pipelineMathSection) {
  const modelData = {
    15000: {
      revenues: { conservative: 45000, expected: 105000, strong: 195000 },
      breakEven: "1.2",
      breakEvenCopy:
        "At a $15,000 contract value, 1.2 closed deals cover the full 90-day program. The conservative scenario returns three.",
    },
    25000: {
      revenues: { conservative: 75000, expected: 175000, strong: 325000 },
      breakEven: "0.72",
      breakEvenCopy:
        "At a $25,000 contract value, less than one closed deal covers the full 90-day program. The conservative scenario returns three.",
    },
    50000: {
      revenues: { conservative: 150000, expected: 350000, strong: 650000 },
      breakEven: "0.36",
      breakEvenCopy:
        "At a $50,000 contract value, less than one closed deal covers the full 90-day program. The conservative scenario returns three.",
    },
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const changeTimers = new WeakMap();
  const crossfadeText = (element, text) => {
    if (!element || element.textContent === text) return;
    window.clearTimeout(changeTimers.get(element));
    element.classList.add("is-changing");
    const timer = window.setTimeout(() => {
      element.textContent = text;
      element.classList.remove("is-changing");
      changeTimers.delete(element);
    }, 110);
    changeTimers.set(element, timer);
  };

  const dealSizeOptions = Array.from(
    pipelineMathSection.querySelectorAll(".deal-size-option")
  );
  const acvAssumption = pipelineMathSection.querySelector("#acv-assumption");
  const breakEvenValue = pipelineMathSection.querySelector("#break-even-value");
  const breakEvenCopy = pipelineMathSection.querySelector("#break-even-copy");

  const selectDealSize = (option) => {
    const acv = Number(option.dataset.acv);
    const selectedModel = modelData[acv];

    dealSizeOptions.forEach((button) => {
      const isSelected = button === option;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-checked", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });

    Object.entries(selectedModel.revenues).forEach(([scenario, revenue]) => {
      const revenueElement = pipelineMathSection.querySelector(
        `.revenue-value[data-scenario="${scenario}"]`
      );
      crossfadeText(revenueElement, currencyFormatter.format(revenue));
    });

    crossfadeText(acvAssumption, `${currencyFormatter.format(acv)} average contract value`);
    crossfadeText(breakEvenValue, selectedModel.breakEven);
    crossfadeText(breakEvenCopy, selectedModel.breakEvenCopy);
  };

  dealSizeOptions.forEach((option, index) => {
    option.tabIndex = option.classList.contains("active") ? 0 : -1;
    option.addEventListener("click", () => selectDealSize(option));
    option.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const nextOption = dealSizeOptions[(index + direction + dealSizeOptions.length) % dealSizeOptions.length];
      nextOption.focus();
      selectDealSize(nextOption);
    });
  });

  const scenarioTabs = Array.from(
    pipelineMathSection.querySelectorAll(".scenario-switcher [role='tab']")
  );

  const selectScenario = (tab) => {
    pipelineMathSection.classList.remove(
      "scenario-conservative",
      "scenario-expected",
      "scenario-strong"
    );
    pipelineMathSection.classList.add(`scenario-${tab.dataset.scenario}`);
    scenarioTabs.forEach((button) => {
      const isSelected = button === tab;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-selected", String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });
  };

  scenarioTabs.forEach((tab, index) => {
    tab.tabIndex = tab.classList.contains("active") ? 0 : -1;
    tab.addEventListener("click", () => selectScenario(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = scenarioTabs.length - 1;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + scenarioTabs.length) % scenarioTabs.length;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % scenarioTabs.length;
      const nextTab = scenarioTabs[nextIndex];
      nextTab.focus();
      selectScenario(nextTab);
    });
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
