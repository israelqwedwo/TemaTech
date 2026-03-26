// ===== SHARED JAVASCRIPT FOR ALL PAGES =====

// Mobile Menu Toggle - Fixed for iOS Safari + Android
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        
        // Use both click and touchstart for better iOS support
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault();     // Prevents issues on iOS
            toggleMenu();
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

// Image Slider (for homepage)
function initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(nextSlide, 5000);
}

// Course Data (for course modals)
const coursesData = [
    {
        id: 1,
        title: "Electrical Engineering Technology",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Comprehensive training in electrical systems, wiring, installation, and maintenance for residential and industrial applications. Students learn to interpret electrical diagrams, install wiring systems, troubleshoot faults, and maintain electrical equipment."
    },
    {
        id: 2,
        title: "Electronics Engineering Technology",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Master analog and digital circuits, microcontrollers, and electronic device repair and maintenance. Includes hands-on training with modern diagnostic equipment and soldering techniques."
    },
    {
        id: 3,
        title: "Mechanical Engineering Technology",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Hands-on training in mechanical systems, fabrication, machine operation, and maintenance. Covers lathe work, milling, welding, and mechanical drawing."
    },
    {
        id: 4,
        title: "Industrial Mechanics Engineering",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Learn industrial machinery installation, troubleshooting, and preventive maintenance. Focus on hydraulic and pneumatic systems, power transmission, and industrial safety."
    },
    {
        id: 5,
        title: "Automobile Engineering Technology",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Comprehensive training in vehicle repair, diagnostics, engine systems, and modern automotive technology. Includes both petrol and diesel engines."
    },
    {
        id: 6,
        title: "Welding & Fabrication",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Master modern welding techniques including arc, MIG, TIG welding, and metal fabrication. Learn blueprint reading and quality control."
    },
    {
        id: 7,
        title: "Plumbing & Gas Fitting",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Learn plumbing systems, pipe fitting, gas installation, and water supply systems. Includes both residential and commercial applications."
    },
    {
        id: 8,
        title: "Building Construction",
        duration: "3 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Comprehensive training in construction techniques, blueprint reading, and project management. Covers foundations, framing, finishing, and site management."
    },
    {
        id: 9,
        title: "Wood Construction",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Master carpentry, furniture making, and woodworking techniques for construction and design. Learn to use both hand tools and power tools."
    },
    {
        id: 10,
        title: "Printing Craft",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Learn modern printing techniques, digital and offset printing, and print finishing. Includes color theory and desktop publishing."
    },
    {
        id: 11,
        title: "Hospitality & Catering",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Comprehensive training in food preparation, catering services, and hospitality management. Includes kitchen management and customer service."
    },
    {
        id: 12,
        title: "Fashion Design Technology",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Master pattern making, garment construction, and fashion design techniques. Learn to create both traditional and contemporary designs."
    },
    {
        id: 13,
        title: "Accounting Option",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Learn financial accounting, bookkeeping, and business management skills. Includes computerized accounting software training."
    },
    {
        id: 14,
        title: "Secretarial Option",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Master office management, administrative skills, and professional communication. Includes document processing and office technology."
    },
    {
        id: 15,
        title: "General Tailoring",
        duration: "2 Years",
        certificate: "NABPTEX Certificate I & II",
        description: "Learn garment construction, alterations, and tailoring techniques for men's and women's wear. Includes both traditional and modern styles."
    },
    {
        id: 16,
        title: "Advanced Photography",
        duration: "1 Year",
        certificate: "Professional Certificate",
        description: "Master photography techniques, digital editing, and professional photography skills. Includes studio lighting and composition."
    }
];

// Show Course Details Modal
function showCourseDetails(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: var(--shadow-lg);
        ">
            <button onclick="closeModal()" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: var(--light-gray);
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <h2 style="color: var(--primary-dark); margin-bottom: 1rem;">${course.title}</h2>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <span style="background: var(--sky-light); padding: 0.3rem 1rem; border-radius: 50px;">
                    <i class="far fa-clock"></i> ${course.duration}
                </span>
                <span style="background: var(--sky-light); padding: 0.3rem 1rem; border-radius: 50px;">
                    <i class="fas fa-certificate"></i> ${course.certificate}
                </span>
            </div>
            
            <p style="line-height: 1.8; color: var(--text-medium);">${course.description}</p>
            
            <div style="margin-top: 2rem;">
                <h3 style="margin-bottom: 1rem;">Career Opportunities</h3>
                <p>Graduates can work as technicians, supervisors, or start their own businesses. Our career services team provides job placement assistance.</p>
            </div>
            
            <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                <button onclick="window.location.href='contact.html'" class="btn btn-primary" style="flex: 1;">Apply Now</button>
                <button onclick="closeModal()" class="btn btn-secondary" style="flex: 1;">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}



// Close Modal
function closeModal() {
    const modal = document.querySelector('.course-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    initImageSlider();
    
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});