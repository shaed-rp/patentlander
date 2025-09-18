// Patent Site Interactive Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeTabNavigation();
    initializeProcessFiltering();
    initializeModalSystem();
    initializeAnimations();
    initializeResponsiveFeatures();
}

// Tab Navigation System
function initializeTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add smooth transition effect
            setTimeout(() => {
                targetContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        });
    });
}

// Process Stage Filtering
function initializeProcessFiltering() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    const processCards = document.querySelectorAll('.process-card');

    stageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetStage = this.getAttribute('data-stage');
            
            // Remove active class from all stage buttons
            stageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter process cards
            processCards.forEach(card => {
                const cardStage = card.getAttribute('data-stage');
                
                if (targetStage === 'all' || cardStage === targetStage) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal System
function initializeModalSystem() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    
    // Process cards click handlers
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.process-title').textContent;
            const description = this.querySelector('.process-description').textContent;
            const features = Array.from(this.querySelectorAll('.process-features li')).map(li => li.textContent);
            
            showModal(title, generateProcessModalContent(description, features));
        });
    });
    
    // Matrix cards click handlers
    const matrixCards = document.querySelectorAll('.matrix-card');
    matrixCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.matrix-title').textContent;
            const content = this.querySelector('.matrix-content').textContent;
            const features = Array.from(this.querySelectorAll('.matrix-list li')).map(li => li.textContent);
            
            showModal(title, generateMatrixModalContent(content, features));
        });
    });
    
    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function showModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function generateProcessModalContent(description, features) {
        return `
            <div class="modal-section">
                <h3>Description</h3>
                <p>${description}</p>
            </div>
            <div class="modal-section">
                <h3>Key Features</h3>
                <ul class="modal-list">
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h3>Technical Implementation</h3>
                <p>This process utilizes advanced AI algorithms and real-time data processing to ensure optimal performance and accuracy. The system is designed for scalability and can handle high-volume data streams while maintaining low latency.</p>
            </div>
        `;
    }
    
    function generateMatrixModalContent(content, features) {
        return `
            <div class="modal-section">
                <h3>Overview</h3>
                <p>${content}</p>
            </div>
            <div class="modal-section">
                <h3>Capabilities</h3>
                <ul class="modal-list">
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h3>Benefits</h3>
                <p>This feature provides significant value through automation, improved accuracy, and enhanced user experience. It integrates seamlessly with other platform components to deliver comprehensive solutions.</p>
            </div>
        `;
    }
}

// Animation and Interaction Effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll animations
    const cards = document.querySelectorAll('.process-card, .matrix-card, .stat-card, .detail-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.process-card, .matrix-card, .tech-item, .flow-step');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Responsive Features
function initializeResponsiveFeatures() {
    // Mobile navigation handling
    const navTabs = document.querySelector('.nav-tabs');
    let isScrolling = false;
    
    // Add touch scrolling indicators for mobile
    if (window.innerWidth <= 768) {
        navTabs.style.scrollbarWidth = 'none';
        navTabs.style.msOverflowStyle = 'none';
        navTabs.style.webkitScrollbar = 'none';
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        // Recalculate layouts on resize
        const cards = document.querySelectorAll('.process-card, .matrix-card');
        cards.forEach(card => {
            card.style.transition = 'none';
            setTimeout(() => {
                card.style.transition = '';
            }, 100);
        });
    }, 250));
    
    // Add loading states
    const loadingElements = document.querySelectorAll('.stat-card, .process-card, .matrix-card');
    loadingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('fade-in-up');
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-tabs::-webkit-scrollbar {
        height: 4px;
    }
    
    .nav-tabs::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }
    
    .nav-tabs::-webkit-scrollbar-thumb {
        background: var(--primary);
        border-radius: 2px;
    }
    
    .nav-tabs::-webkit-scrollbar-thumb:hover {
        background: var(--primary-dark);
    }
`;
document.head.appendChild(style);

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    }
}

// Initialize performance monitoring
window.addEventListener('load', logPerformance);

// Add error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Export functions for potential external use
window.PatentDashboard = {
    initializeApp,
    initializeTabNavigation,
    initializeProcessFiltering,
    initializeModalSystem,
    initializeAnimations,
    initializeResponsiveFeatures
};
