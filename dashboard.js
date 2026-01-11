// Sidebar toggle for mobile
const hamburgerMenu = document.getElementById('hamburgerMenu');
const sidebar = document.getElementById('sidebar');
let sidebarOverlay = null;

function createSidebarOverlay() {
    if (window.innerWidth <= 768) {
        if (!sidebarOverlay) {
            sidebarOverlay = document.createElement('div');
            sidebarOverlay.className = 'sidebar-overlay';
            sidebarOverlay.addEventListener('click', closeSidebar);
            document.body.appendChild(sidebarOverlay);
        }
    }
}

function openSidebar() {
    sidebar.classList.add('open');
    createSidebarOverlay();
    if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

hamburgerMenu.addEventListener('click', function() {
    if (sidebar.classList.contains('open')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
});

// Navigation handling
const navButtons = document.querySelectorAll('.nav-button');
const contentViews = document.querySelectorAll('.content-view');

navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const viewName = this.getAttribute('data-view');
        
        // Update active state
        navButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding view
        contentViews.forEach(view => {
            view.style.display = 'none';
        });
        
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.style.display = 'block';
        }
        
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
});

// Resource form handling
const resourceForm = document.getElementById('resourceForm');
if (resourceForm) {
    resourceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const experience = document.getElementById('experience').value;
        const jd = document.getElementById('jd').value;
        const submitButton = this.querySelector('.submit-button');
        
        // Disable button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Resource search:', { experience, jd });
            
            // Here you would typically:
            // 1. Make an API call to search/filter resources
            // 2. Update the table with filtered results
            // 3. Show success/error message
            
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            
            // Show success message (you can replace this with a toast notification)
            alert('Resource search submitted! Results will be filtered in the table.');
        }, 1000);
    });
}

// Initialize - show find-resource view by default
document.addEventListener('DOMContentLoaded', function() {
    const findResourceView = document.getElementById('find-resource-view');
    if (findResourceView) {
        findResourceView.style.display = 'block';
    }
});
