// Patent Site Interactive Dashboard JavaScript

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app...');
    initializeApp();
});

// Fallback initialization for cases where DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    console.log('DOM still loading, waiting for DOMContentLoaded...');
} else {
    // DOM is already loaded, initialize immediately
    console.log('DOM already loaded, initializing immediately...');
    initializeApp();
}

function initializeApp() {
    // Initialize performance optimizations first
    initializePerformanceOptimizations();
    
    // Initialize core features
    initializeTabNavigation();
    initializeProcessFiltering();
    initializeModalSystem();
    initializeAnimations();
    initializeResponsiveFeatures();
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-preload]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollElements() {
        // Batch DOM updates for better performance
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    // Use passive scroll listeners for better performance
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Optimize resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScrollElements, 100);
    }, { passive: true });
}

// Professional Tab Navigation System - No Blinking
function initializeTabNavigation() {
    console.log('Initializing tab navigation...');
    
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const navWrapper = document.querySelector('.nav-wrapper');
    const contentWrapper = document.querySelector('.content-wrapper');
    
    console.log(`Found ${navTabs.length} nav tabs and ${tabContents.length} tab contents`);
    
    if (navTabs.length === 0) {
        console.error('No nav tabs found!');
        return;
    }
    
    // Debounce rapid clicks to prevent animation conflicts
    let isTransitioning = false;
    
    // Professional crossfade tab change handler
    const handleTabChange = (tabId) => {
        console.log(`Switching to tab: ${tabId}`);
        
        if (isTransitioning) {
            console.log('Transition in progress, ignoring click');
            return;
        }
        
        const targetTab = document.querySelector(`[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);
        
        if (!targetTab || !targetContent) {
            console.warn(`Tab navigation: Could not find tab "${tabId}" or its content`);
            return;
        }
        
        // If already active, do nothing
        if (targetTab.classList.contains('active')) {
            console.log('Tab already active, ignoring');
            return;
        }
        
        isTransitioning = true;
        console.log('Starting tab transition...');
        
        // Update tab states immediately for responsive feel
        navTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        
        targetTab.classList.add('active');
        targetTab.setAttribute('aria-selected', 'true');
        targetTab.setAttribute('tabindex', '0');
        
        // Smooth crossfade between content
        const currentActive = document.querySelector('.tab-content.active');
        
        if (currentActive && currentActive !== targetContent) {
            // Fade out current content
            currentActive.style.transition = 'opacity 150ms ease-out, transform 150ms ease-out';
            currentActive.style.opacity = '0';
            currentActive.style.transform = 'translateY(-4px)';
            
            // After fade out, switch content and fade in
            setTimeout(() => {
                currentActive.classList.remove('active');
                targetContent.classList.add('active');
                
                // Fade in new content
                targetContent.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
                targetContent.style.opacity = '1';
                targetContent.style.transform = 'translateY(0)';
                
                // Reset transition after animation
                setTimeout(() => {
                    targetContent.style.transition = '';
                    targetContent.style.opacity = '';
                    targetContent.style.transform = '';
                    isTransitioning = false;
                    console.log('Tab transition completed');
                }, 200);
            }, 150);
        } else {
            // First load or same tab
            targetContent.classList.add('active');
            targetContent.style.transition = 'opacity 200ms ease-out, transform 200ms ease-out';
            targetContent.style.opacity = '1';
            targetContent.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                targetContent.style.transition = '';
                targetContent.style.opacity = '';
                targetContent.style.transform = '';
                isTransitioning = false;
                console.log('Tab transition completed');
            }, 200);
        }
    };
    
    // Add click handlers to all tabs with performance optimization
    navTabs.forEach((tab, index) => {
        console.log(`Setting up click handler for tab ${index}: ${tab.getAttribute('data-tab')}`);
        
        // Use passive listeners for better performance
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Tab clicked: ${this.getAttribute('data-tab')}`);
            const targetTab = this.getAttribute('data-tab');
            handleTabChange(targetTab);
        }, { passive: false });
        
        // Keyboard navigation
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                handleTabChange(targetTab);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                const currentIndex = Array.from(navTabs).indexOf(this);
                let nextIndex;

                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : navTabs.length - 1;
                } else {
                    nextIndex = currentIndex < navTabs.length - 1 ? currentIndex + 1 : 0;
                }

                const nextTab = navTabs[nextIndex];
                const nextTabId = nextTab.getAttribute('data-tab');
                handleTabChange(nextTabId);
                nextTab.focus();
            }
        });
    });
    
    // Sticky navigation behavior
    let isSticky = false;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isSticky) {
                        navWrapper.classList.remove('sticky');
                        isSticky = false;
                    }
                } else {
                    if (!isSticky) {
                        navWrapper.classList.add('sticky');
                        isSticky = true;
                    }
                }
            });
        },
        { threshold: 0 }
    );
    
    // Create a sentinel element to observe
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.left = '0';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    
    // Insert sentinel before the nav wrapper
    navWrapper.parentNode.insertBefore(sentinel, navWrapper);
    observer.observe(sentinel);
    
    // Verify all tabs are properly configured
    const expectedTabs = ['overview', 'process', 'matrix', 'data', 'architecture', 'claims', 'innovation'];
    const missingTabs = expectedTabs.filter(tabId => {
        const tab = document.querySelector(`[data-tab="${tabId}"]`);
        const content = document.getElementById(tabId);
        return !tab || !content;
    });
    
    if (missingTabs.length > 0) {
        console.warn('Tab navigation: Missing tabs or content:', missingTabs);
    } else {
        console.log('Tab navigation: All 7 tabs properly configured');
    }
}

// Enhanced Process Stage Filtering with Professional Animations
function initializeProcessFiltering() {
    const stageButtons = document.querySelectorAll('.stage-btn');
    const processCards = document.querySelectorAll('.process-card');
    const processGrid = document.querySelector('.process-grid');
    const processOverview = document.querySelector('.process-overview');

    stageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetStage = this.getAttribute('data-stage');
            
            // Prevent rapid clicking
            if (processGrid.classList.contains('filtering')) return;
            
            // Remove active class from all stage buttons with smooth transition
            stageButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'translateY(0)';
            });
            
            // Add active class with enhanced styling
            this.classList.add('active');
            
            // Add loading state to grid with spinner
            processGrid.classList.add('filtering');
            
            // Update overview stats with animation
            if (processOverview) {
                processOverview.style.opacity = '0.7';
                processOverview.style.transform = 'translateY(-10px)';
            }
            
            // Enhanced filtering with sophisticated animations
            requestAnimationFrame(() => {
                const visibleCards = Array.from(processCards).filter(card => {
                    const cardStage = card.getAttribute('data-stage');
                    return targetStage === 'all' || cardStage === targetStage;
                });
                
                // Phase 1: Exit animations for cards that will be hidden
                processCards.forEach((card, index) => {
                    const cardStage = card.getAttribute('data-stage');
                    const shouldShow = targetStage === 'all' || cardStage === targetStage;
                    
                    if (!shouldShow) {
                        // Enhanced exit animation
                        card.classList.add('exiting');
                        setTimeout(() => {
                            card.style.display = 'none';
                            card.classList.remove('exiting');
                        }, 300);
                    }
                });
                
                // Phase 2: Entrance animations for visible cards
                setTimeout(() => {
                    visibleCards.forEach((card, index) => {
                        card.style.display = 'block';
                        card.classList.add('entering');
                        
                        // Staggered entrance with sophisticated timing
                        setTimeout(() => {
                            card.classList.remove('entering');
                        }, 500);
                    }, index * 80); // Increased stagger for better effect
                }, 200);
                
                // Phase 3: Cleanup and final state
                setTimeout(() => {
                    processGrid.classList.remove('filtering');
                    
                    // Restore overview stats
                    if (processOverview) {
                        processOverview.style.opacity = '1';
                        processOverview.style.transform = 'translateY(0)';
                    }
                    
                    // Add subtle pulse to active button
                    const activeButton = document.querySelector('.stage-btn.active');
                    if (activeButton) {
                        activeButton.style.animation = 'pulse 0.6s ease-out';
                        setTimeout(() => {
                            activeButton.style.animation = '';
                        }, 600);
                    }
                }, 800);
            });
        });
    });
    
    // Enhanced smooth scroll with offset for better UX
    stageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const processSection = document.querySelector('#process');
            if (processSection) {
                // Add slight delay for better visual flow
                setTimeout(() => {
                    processSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start',
                        inline: 'nearest'
                    });
                }, 100);
            }
        });
    });
}

// Add pulse animation for active button feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-2px) scale(1); }
        50% { transform: translateY(-4px) scale(1.05); }
        100% { transform: translateY(-2px) scale(1); }
    }
`;
document.head.appendChild(style);

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
const animationStyle = document.createElement('style');
animationStyle.textContent = `
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
document.head.appendChild(animationStyle);

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
// Test function to verify tab functionality
function testTabNavigation() {
    console.log('Testing tab navigation...');
    const tabs = document.querySelectorAll('.nav-tab');
    console.log(`Found ${tabs.length} tabs`);
    
    tabs.forEach((tab, index) => {
        const tabId = tab.getAttribute('data-tab');
        const content = document.getElementById(tabId);
        console.log(`Tab ${index}: ${tabId} - Content exists: ${!!content}`);
    });
    
    // Test clicking the first non-active tab
    const nonActiveTabs = Array.from(tabs).filter(tab => !tab.classList.contains('active'));
    if (nonActiveTabs.length > 0) {
        console.log('Testing click on:', nonActiveTabs[0].getAttribute('data-tab'));
        nonActiveTabs[0].click();
    }
}

window.PatentDashboard = {
    initializeApp,
    initializeTabNavigation,
    initializeProcessFiltering,
    initializeModalSystem,
    initializeAnimations,
    initializeResponsiveFeatures,
    testTabNavigation
};
