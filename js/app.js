/* ----------------------------------------------------
   A.K Properties Nashik - Application Logic
   Dynamic Filtering, Theme, Modals, Forms & Carousels
   ---------------------------------------------------- */

// --- PROPERTIES DATABASE ---
const propertiesData = [
    {
        id: 1,
        title: "Ekta Greenville - 2 Bhk",
        location: "Pathardi Phata, Nashik",
        locationSearch: "pathardi phata",
        type: "Apartment",
        typeSearch: "apartment",
        category: "for rent",
        priceVal: 12000,
        priceDisplay: "Rs. 12,000/mo",
        bhk: "2 BHK",
        baths: "2 Baths",
        size: "1,150 sqft",
        image: "images/p1.jpg",
        description: "Discover our latest listing at Ekta Greenville, Nashik. This spacious 2 BHK apartment offers well-ventilated rooms, dynamic sunlight exposure, modern bathrooms, and secure parking. Located in Pathardi Phata with prompt highway connectivity, it is perfect for working families."
    },
    {
        id: 2,
        title: "Shreeji Annex - 2 Bhk",
        location: "Pathardi Phata, Nashik",
        locationSearch: "pathardi phata",
        type: "Apartment",
        typeSearch: "apartment",
        category: "for rent",
        priceVal: 10000,
        priceDisplay: "Rs. 10,000/mo",
        bhk: "2 BHK",
        baths: "2 Baths",
        size: "1,050 sqft",
        image: "images/p2.jpg",
        description: "Superb 2 BHK flat for rent in Shreeji Annex, Nashik. The property features modular kitchen fittings, dedicated utilities area, security cameras, and proximity to schools and markets. The community is safe and highly maintained."
    },
    {
        id: 3,
        title: "2BHK Apartment",
        location: "Indira Nagar, Nashik",
        locationSearch: "indira nagar",
        type: "Apartment",
        typeSearch: "apartment",
        category: "for rent",
        priceVal: 10000,
        priceDisplay: "Rs. 10,000/mo",
        bhk: "2 BHK",
        baths: "2 Baths",
        size: "1,100 sqft",
        image: "images/p3.jpg",
        description: "Sleek and centrally-located 2 BHK residential apartment in Indira Nagar, Nashik. Offers uninterrupted water supply, elevator access, 24/7 security watch, and premium layout spaces. Excellent access to public transport networks."
    },
    {
        id: 4,
        title: "2 Bhk Row House",
        location: "Indira Nagar, Nashik",
        locationSearch: "indira nagar",
        type: "Row House",
        typeSearch: "row house",
        category: "for sale",
        priceVal: 11000,
        priceDisplay: "Rs. 11,000",
        bhk: "2 BHK",
        baths: "3 Baths",
        size: "1,500 sqft",
        image: "images/p4.jpg",
        description: "Luxury duplex row house available for sale in the premium sector of Indira Nagar, Nashik. Features an independent parking porch, small private garden space, modular wardrobes, and a large terrace. Ready to move in."
    },
    {
        id: 5,
        title: "1 Bhk Apartment",
        location: "Damodar Circle, Pathardi, Nashik",
        locationSearch: "damodar circle",
        type: "Apartment",
        typeSearch: "apartment",
        category: "for rent",
        priceVal: 6500,
        priceDisplay: "Rs. 6,500/mo",
        bhk: "1 BHK",
        baths: "1 Bath",
        size: "650 sqft",
        image: "images/p5.jpg",
        description: "Affordable and highly ventilated 1 BHK apartment situated near Damodar Circle, Pathardi Phata area in Nashik. Features modern bathroom layout, semi-furnished interiors, and low maintenance fees. Great value for young couples."
    },
    {
        id: 6,
        title: "2bhk Row House",
        location: "Pathardi Phata, Nashik",
        locationSearch: "pathardi phata",
        type: "Row House",
        typeSearch: "row house",
        category: "for rent",
        priceVal: 11000,
        priceDisplay: "Rs. 11,000/mo",
        bhk: "2 BHK",
        baths: "2 Baths",
        size: "1,300 sqft",
        image: "images/p6.jpg",
        description: "Premium duplex row house available for rent at Pathardi Phata, Nashik. Quiet gated community, direct security system, spacious hall layout, and modular kitchen units. Highly recommended for long term lease."
    }
];

// --- APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initStickyHeader();
    initMobileNav();
    
    // Page specific modules
    if (document.getElementById("featured-properties-grid")) {
        renderFeaturedProperties();
    }
    
    initSearchAndFilters();
    
    if (document.querySelector(".stats-section")) {
        initStatsCounter();
    }
    
    if (document.getElementById("testimonials-carousel")) {
        initTestimonials();
    }
    
    initScrollAnimations();
    initModals();
    
    if (document.getElementById("contact-form")) {
        initContactForm();
    }
});

// --- THEME MANAGEMENT ---
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    }
    
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// --- STICKY HEADER ---
function initStickyHeader() {
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// --- MOBILE MENU NAVIGATION ---
function initMobileNav() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    toggleBtn.addEventListener("click", () => {
        toggleBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleBtn.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// --- SEARCH ENGINE AND TABS FILTERS ---
let activeFilters = {
    location: "all",
    type: "all",
    category: "all",
    maxPrice: "all"
};

function initSearchAndFilters() {
    const searchForm = document.getElementById("search-form");
    const filterTabs = document.querySelectorAll(".filter-tab");
    const resetBtn = document.getElementById("reset-filters-btn");
    
    // Apply filters from URL search params if visiting properties page
    if (document.body.classList.contains("page-properties")) {
        parseUrlParameters();
    }
    
    // Reset Filters action
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            activeFilters = { location: "all", type: "all", category: "all", maxPrice: "all" };
            applyFilters();
            
            document.getElementById("search-location").value = "all";
            document.getElementById("search-type").value = "all";
            document.getElementById("search-category").value = "all";
            document.getElementById("search-price").value = "all";
            
            filterTabs.forEach(t => t.classList.remove("active"));
            const firstTab = document.querySelector('.filter-tab[data-filter="all"]');
            if (firstTab) firstTab.classList.add("active");
        });
    }

    // Tab buttons filter (All / Rent / Sale)
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const filterValue = tab.getAttribute("data-filter");
            activeFilters.category = filterValue;
            
            const catSelect = document.getElementById("search-category");
            if (catSelect) catSelect.value = filterValue;
            
            applyFilters();
        });
    });

    // Search submit action
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            // If we are on Home page, form submission redirects to properties.html automatically
            if (document.body.classList.contains("page-home")) {
                return; // Let form submit via GET with URL queries
            }
            
            e.preventDefault();
            
            activeFilters.location = document.getElementById("search-location").value.toLowerCase();
            activeFilters.type = document.getElementById("search-type").value.toLowerCase();
            activeFilters.category = document.getElementById("search-category").value.toLowerCase();
            activeFilters.maxPrice = document.getElementById("search-price").value;
            
            filterTabs.forEach(t => t.classList.remove("active"));
            const tabMatch = document.querySelector(`.filter-tab[data-filter="${activeFilters.category}"]`);
            if (tabMatch) {
                tabMatch.classList.add("active");
            }
            
            applyFilters();
            
            const grid = document.getElementById("properties-grid");
            if (grid) grid.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    let hasParams = false;
    
    if (params.has("location")) {
        const val = params.get("location");
        activeFilters.location = val.toLowerCase();
        const select = document.getElementById("search-location");
        if (select) select.value = val;
        hasParams = true;
    }
    if (params.has("type")) {
        const val = params.get("type");
        activeFilters.type = val.toLowerCase();
        const select = document.getElementById("search-type");
        if (select) select.value = val;
        hasParams = true;
    }
    if (params.has("category")) {
        const val = params.get("category");
        activeFilters.category = val.toLowerCase();
        const select = document.getElementById("search-category");
        if (select) select.value = val;
        hasParams = true;
    }
    if (params.has("price")) {
        const val = params.get("price");
        activeFilters.maxPrice = val;
        const select = document.getElementById("search-price");
        if (select) select.value = val;
        hasParams = true;
    }
    
    if (hasParams) {
        const filterTabs = document.querySelectorAll(".filter-tab");
        if (filterTabs.length > 0) {
            filterTabs.forEach(t => t.classList.remove("active"));
            const tabMatch = document.querySelector(`.filter-tab[data-filter="${activeFilters.category}"]`);
            if (tabMatch) tabMatch.classList.add("active");
        }
        // Run filter after browser parsing finishes
        setTimeout(applyFilters, 100);
    }
}

function applyFilters() {
    const cards = document.querySelectorAll(".property-card");
    const noResultsMsg = document.getElementById("no-properties-message");
    let matchCount = 0;
    
    cards.forEach(card => {
        const cLocation = card.getAttribute("data-location").toLowerCase();
        const cType = card.getAttribute("data-type").toLowerCase();
        const cCategory = card.getAttribute("data-category").toLowerCase();
        const cPrice = parseInt(card.getAttribute("data-price"));
        
        let show = true;
        
        if (activeFilters.location !== "all" && !cLocation.includes(activeFilters.location)) {
            show = false;
        }
        if (activeFilters.type !== "all" && cType !== activeFilters.type) {
            show = false;
        }
        if (activeFilters.category !== "all" && cCategory !== activeFilters.category) {
            show = false;
        }
        if (activeFilters.maxPrice !== "all") {
            const maxVal = parseInt(activeFilters.maxPrice);
            if (cPrice > maxVal) {
                show = false;
            }
        }
        
        if (show) {
            card.style.display = "block";
            card.style.animation = "fadeInUp 0.6s ease forwards";
            matchCount++;
        } else {
            card.style.display = "none";
        }
    });
    
    if (noResultsMsg) {
        if (matchCount === 0) {
            noResultsMsg.classList.remove("hidden");
        } else {
            noResultsMsg.classList.add("hidden");
        }
    }
}

// --- RENDER DYNAMIC LISTINGS ON LANDING PAGE ---
function renderFeaturedProperties() {
    const grid = document.getElementById("featured-properties-grid");
    if (!grid) return;
    
    // Load first 3 property items
    const featured = propertiesData.slice(0, 3);
    
    let html = "";
    featured.forEach(prop => {
        const badgeClass = prop.category === "for rent" ? "for-rent" : "for-sale";
        const badgeText = prop.category === "for rent" ? "For Rent" : "For Sale";
        const priceLabel = prop.category === "for rent" ? "/mo" : "/total";
        
        html += `
            <div class="property-card" data-id="${prop.id}" data-location="${prop.locationSearch}" data-type="${prop.typeSearch}" data-category="${prop.category}" data-price="${prop.priceVal}">
                <div class="property-image-wrapper">
                    <img src="${prop.image}" alt="${prop.title}" loading="lazy" class="property-image">
                    <span class="property-badge ${badgeClass}">${badgeText}</span>
                </div>
                <div class="property-info">
                    <div class="property-type-tag">${prop.type}</div>
                    <h3 class="property-title">${prop.title}</h3>
                    <div class="property-location">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>${prop.location}</span>
                    </div>
                    <div class="property-features">
                        <span class="feature-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M22 4v16M2 8h20M2 14h20M6 8v6M10 8v6M14 8v6M18 8v6"/></svg> ${prop.bhk}</span>
                        <span class="feature-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0l-.88.88a1.5 1.5 0 0 0 0 2.12L6 9M2 12h20M7 21h10M12 12v9"/></svg> ${prop.baths}</span>
                        <span class="feature-item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg> ${prop.size}</span>
                    </div>
                    <div class="property-footer">
                        <div class="property-price">Rs. ${prop.priceVal.toLocaleString()}<small>${priceLabel}</small></div>
                        <div class="property-actions">
                            <button class="btn btn-secondary view-details-btn">View Details</button>
                            <a href="https://wa.me/918169633015?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(prop.title)}" target="_blank" rel="noopener" class="whatsapp-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436.002 9.858-4.417 9.86-9.856.002-2.63-1.023-5.105-2.883-6.97C16.59 1.939 14.113.91c-5.44.004-9.858 4.425-9.863 9.864-.001 1.734.461 3.426 1.393 4.926l-.998 3.648 3.73-.977c1.475.804 3.013 1.229 4.897 1.233zM18.23 15.02c-.34-.17-2.01-.99-2.32-1.1-.31-.11-.53-.17-.75.17-.22.34-.85 1.1-1.04 1.3-.19.22-.38.25-.72.08-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.69-2.02-1.89-2.35-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.23-.34.34-.56.11-.22.06-.42-.03-.59-.08-.17-.75-1.8-.1.03-1.43-.28-1.85-.31-2.22 0-.37.11-1.01.44-1.39.75-.38.72-.99 2.22.9 4.39 1.13.9 2.01 1.7 3.08 2.51.81.6 1.56 1.07 2.15 1.18.66.13 1.36.07 1.86-.01.56-.08 1.7-.69 1.94-1.37.24-.67.24-1.25.17-1.37-.08-.11-.27-.22-.61-.39z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// --- STATS COUNT ANIMATION ---
function initStatsCounter() {
    const statsSection = document.querySelector(".stats-section");
    if (!statsSection) return;
    
    let animated = false;
    
    const countUp = () => {
        const counters = document.querySelectorAll(".stat-number");
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"));
            let count = 0;
            const speed = target > 100 ? Math.ceil(target / 40) : 1;
            
            const updateCount = () => {
                count += speed;
                if (count >= target) {
                    counter.innerText = target + "+";
                } else {
                    counter.innerText = count + "+";
                    setTimeout(updateCount, 25);
                }
            };
            updateCount();
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !animated) {
            countUp();
            animated = true;
        }
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

// --- TESTIMONIALS SLIDER ---
function initTestimonials() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let timer;
    
    const showSlide = (idx) => {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        
        slides[idx].classList.add("active");
        dots[idx].classList.add("active");
        currentSlide = idx;
    };
    
    const nextSlide = () => {
        let nextIdx = currentSlide + 1;
        if (nextIdx >= slides.length) nextIdx = 0;
        showSlide(nextIdx);
    };
    
    const resetTimer = () => {
        clearInterval(timer);
        timer = setInterval(nextSlide, 5000);
    };
    
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetTimer();
        });
    });
    
    resetTimer();
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => observer.observe(el));
}

// --- PROPERTIES DETAILS MODAL ---
function initModals() {
    const modal = document.getElementById("details-modal");
    if (!modal) return;
    
    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("modal-close-btn");
    
    const openModal = (id) => {
        const data = propertiesData.find(item => item.id === parseInt(id));
        if (!data) return;
        
        document.getElementById("modal-title").innerText = data.title;
        document.getElementById("modal-location").querySelector("span").innerText = data.location;
        document.getElementById("modal-price").innerText = data.priceDisplay;
        document.getElementById("modal-type").innerText = data.type;
        document.getElementById("modal-bhk").innerText = data.bhk;
        document.getElementById("modal-size").innerText = data.size;
        document.getElementById("modal-description").innerText = data.description;
        
        const mImage = document.getElementById("modal-image");
        mImage.src = data.image;
        mImage.alt = data.title;
        
        const mBadge = document.getElementById("modal-badge");
        mBadge.innerText = data.category === "for rent" ? "For Rent" : "For Sale";
        mBadge.className = `modal-badge ${data.category.replace(" ", "-")}`;
        
        const message = `Hi, I am interested in inquiring about ${data.title} located at ${data.location}. Please share availability and visit schedules.`;
        const whatsappUrl = `https://wa.me/918169633015?text=${encodeURIComponent(message)}`;
        document.getElementById("modal-whatsapp-btn").href = whatsappUrl;
        
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };
    
    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };
    
    // Delegation for dynamic or static cards
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".view-details-btn");
        if (btn) {
            const card = btn.closest(".property-card");
            if (card) {
                const id = card.getAttribute("data-id");
                openModal(id);
            }
        }
    });
    
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

// --- CONTACT FORM HANDLING ---
function initContactForm() {
    const form = document.getElementById("contact-form");
    const statusBox = document.getElementById("form-status");
    if (!form) return;
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(i => i.parentElement.classList.remove("invalid"));
        statusBox.className = "form-status";
        statusBox.style.display = "none";
        
        let isValid = true;
        
        const name = document.getElementById("form-name");
        if (!name.value.trim()) {
            name.parentElement.classList.add("invalid");
            isValid = false;
        }
        
        const email = document.getElementById("form-email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.parentElement.classList.add("invalid");
            isValid = false;
        }
        
        const phone = document.getElementById("form-phone");
        const phoneRegex = /^\+?([0-9\s-]{8,15})$/;
        if (!phone.value.trim() || !phoneRegex.test(phone.value.replace(/\s+/g, ''))) {
            phone.parentElement.classList.add("invalid");
            isValid = false;
        }
        
        const subject = document.getElementById("form-subject");
        if (!subject.value.trim()) {
            subject.parentElement.classList.add("invalid");
            isValid = false;
        }
        
        const message = document.getElementById("form-message");
        if (!message.value.trim()) {
            message.parentElement.classList.add("invalid");
            isValid = false;
        }
        
        if (!isValid) return;
        
        const submitBtn = document.getElementById("submit-btn");
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Submitting Inquiry...</span>`;
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            statusBox.innerHTML = `Thank you, ${name.value}! Your inquiry has been submitted successfully. A.K Properties Nashik will contact you shortly.`;
            statusBox.classList.add("success");
            statusBox.style.display = "block";
            
            form.reset();
        }, 1500);
    });
}
