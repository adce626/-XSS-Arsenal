// XSS Arsenal - Main Application Script
class XSSArsenal {
    constructor() {
        this.payloads = window.xssPayloads || [];
        this.filteredPayloads = [...this.payloads];
        this.currentPage = 1;
        this.payloadsPerPage = 20;
        this.alertProtectionEnabled = true;
        
        this.init();
        this.setupAlertProtection();
    }

    init() {
        this.cacheDOMElements();
        this.setupEventListeners();
        this.populateFilters();
        this.updateStats();
        this.renderPayloads();
        this.showAlertProtectionModal();
    }

    cacheDOMElements() {
        this.elements = {
            searchInput: document.getElementById('searchInput'),
            clearSearch: document.getElementById('clearSearch'),
            eventFilter: document.getElementById('eventFilter'),
            tagFilter: document.getElementById('tagFilter'),
            browserFilter: document.getElementById('browserFilter'),
            categoryBtns: document.querySelectorAll('.category-btn'),
            payloadsContainer: document.getElementById('payloadsContainer'),
            loadMoreBtn: document.getElementById('loadMoreBtn'),
            totalPayloads: document.getElementById('totalPayloads'),
            filteredPayloads: document.getElementById('filteredPayloads'),
            uniqueEvents: document.getElementById('uniqueEvents'),
            copyToast: document.getElementById('copyToast'),
            alertProtectionModal: document.getElementById('alertProtectionModal'),
            alertProtectionBtn: document.getElementById('alertProtectionBtn'),
            alertProtectionToggle: document.getElementById('alertProtectionToggle'),
            closeModal: document.querySelector('.close'),
            themeToggle: document.getElementById('themeToggle')
        };
    }

    setupEventListeners() {
        // Search functionality
        this.elements.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        this.elements.clearSearch.addEventListener('click', this.clearSearch.bind(this));

        // Filter functionality
        this.elements.eventFilter.addEventListener('change', this.handleFilter.bind(this));
        this.elements.tagFilter.addEventListener('change', this.handleFilter.bind(this));
        this.elements.browserFilter.addEventListener('change', this.handleFilter.bind(this));

        // Category navigation
        this.elements.categoryBtns.forEach(btn => {
            btn.addEventListener('click', this.handleCategoryFilter.bind(this));
        });

        // Load more button
        this.elements.loadMoreBtn.addEventListener('click', this.loadMorePayloads.bind(this));

        // Alert protection modal
        this.elements.alertProtectionBtn.addEventListener('click', this.showAlertProtectionModal.bind(this));
        this.elements.closeModal.addEventListener('click', this.hideAlertProtectionModal.bind(this));
        this.elements.alertProtectionToggle.addEventListener('change', this.toggleAlertProtection.bind(this));

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', this.toggleTheme.bind(this));

        // Modal close on outside click
        this.elements.alertProtectionModal.addEventListener('click', (e) => {
            if (e.target === this.elements.alertProtectionModal) {
                this.hideAlertProtectionModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    setupAlertProtection() {
        if (this.alertProtectionEnabled) {
            // Override alert function to prevent unwanted popups
            const originalAlert = window.alert;
            const originalConfirm = window.confirm;
            const originalPrompt = window.prompt;

            window.alert = (message) => {
                console.log('Alert blocked:', message);
                this.showToast(`Alert blocked: ${message}`, 'warning');
                return;
            };

            window.confirm = (message) => {
                console.log('Confirm blocked:', message);
                this.showToast(`Confirm blocked: ${message}`, 'warning');
                return true;
            };

            window.prompt = (message, defaultValue) => {
                console.log('Prompt blocked:', message);
                this.showToast(`Prompt blocked: ${message}`, 'warning');
                return defaultValue || '';
            };

            // Store original functions for potential restoration
            window._originalAlert = originalAlert;
            window._originalConfirm = originalConfirm;
            window._originalPrompt = originalPrompt;
        }
    }

    toggleAlertProtection() {
        this.alertProtectionEnabled = this.elements.alertProtectionToggle.checked;
        
        if (this.alertProtectionEnabled) {
            this.setupAlertProtection();
            this.showToast('Alert protection enabled', 'success');
        } else {
            // Restore original functions
            if (window._originalAlert) {
                window.alert = window._originalAlert;
                window.confirm = window._originalConfirm;
                window.prompt = window._originalPrompt;
            }
            this.showToast('Alert protection disabled', 'warning');
        }
    }

    showAlertProtectionModal() {
        this.elements.alertProtectionModal.style.display = 'block';
        this.elements.alertProtectionToggle.checked = this.alertProtectionEnabled;
    }

    hideAlertProtectionModal() {
        this.elements.alertProtectionModal.style.display = 'none';
    }

    populateFilters() {
        // Populate event filter
        const events = [...new Set(this.payloads.map(p => p.event))].sort();
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event;
            option.textContent = event;
            this.elements.eventFilter.appendChild(option);
        });

        // Populate tag filter
        const tags = [...new Set(this.payloads.map(p => p.tag))].sort();
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            this.elements.tagFilter.appendChild(option);
        });
    }

    handleSearch() {
        const query = this.elements.searchInput.value.toLowerCase();
        this.filterPayloads({ search: query });
    }

    clearSearch() {
        this.elements.searchInput.value = '';
        this.handleSearch();
    }

    handleFilter() {
        this.filterPayloads();
    }

    handleCategoryFilter(e) {
        // Remove active class from all buttons
        this.elements.categoryBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        
        const category = e.target.dataset.category;
        this.filterPayloads({ category });
    }

    filterPayloads(options = {}) {
        const {
            search = this.elements.searchInput.value.toLowerCase(),
            category = document.querySelector('.category-btn.active')?.dataset.category || 'all'
        } = options;

        this.filteredPayloads = this.payloads.filter(payload => {
            // Search filter
            if (search) {
                const searchableText = `${payload.event} ${payload.description} ${payload.tag} ${payload.code}`.toLowerCase();
                if (!searchableText.includes(search)) return false;
            }

            // Category filter
            if (category !== 'all' && payload.category !== category) return false;

            // Event filter
            const eventFilter = this.elements.eventFilter.value;
            if (eventFilter && payload.event !== eventFilter) return false;

            // Tag filter
            const tagFilter = this.elements.tagFilter.value;
            if (tagFilter && payload.tag !== tagFilter) return false;

            // Browser filter
            const browserFilter = this.elements.browserFilter.value;
            if (browserFilter) {
                if (!payload.compatibility[browserFilter]) return false;
            }

            return true;
        });

        this.currentPage = 1;
        this.updateStats();
        this.renderPayloads();
    }

    updateStats() {
        this.elements.totalPayloads.textContent = this.payloads.length;
        this.elements.filteredPayloads.textContent = this.filteredPayloads.length;
        
        const uniqueEvents = new Set(this.payloads.map(p => p.event)).size;
        this.elements.uniqueEvents.textContent = uniqueEvents;
    }

    renderPayloads() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.payloadsPerPage;
        const payloadsToShow = this.filteredPayloads.slice(startIndex, endIndex);

        this.elements.payloadsContainer.innerHTML = '';

        if (payloadsToShow.length === 0) {
            this.elements.payloadsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No payloads found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            this.elements.loadMoreBtn.style.display = 'none';
            return;
        }

        payloadsToShow.forEach((payload, index) => {
            const payloadCard = this.createPayloadCard(payload, index);
            this.elements.payloadsContainer.appendChild(payloadCard);
        });

        // Show/hide load more button
        if (endIndex < this.filteredPayloads.length) {
            this.elements.loadMoreBtn.style.display = 'block';
            this.elements.loadMoreBtn.disabled = false;
        } else {
            this.elements.loadMoreBtn.style.display = 'none';
        }
    }

    createPayloadCard(payload, index) {
        const card = document.createElement('div');
        card.className = 'payload-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const compatibilityHTML = this.createCompatibilityHTML(payload.compatibility);
        const variationsHTML = this.createVariationsHTML(payload.variations || []);

        card.innerHTML = `
            <div class="payload-header">
                <h3 class="payload-event">${this.escapeHtml(payload.event)}</h3>
                <span class="payload-tag">${this.escapeHtml(payload.tag)}</span>
            </div>
            
            <p class="payload-description">${this.escapeHtml(payload.description)}</p>
            
            <div class="payload-code-container">
                <button class="copy-btn" onclick="app.copyToClipboard(\`${this.escapeForJs(payload.code)}\`)">
                    <i class="fas fa-copy"></i>
                    Copy
                </button>
                <div class="payload-code">${this.escapeHtml(payload.code)}</div>
            </div>
            
            <div class="payload-compatibility">
                <strong>Browser Compatibility:</strong>
                ${compatibilityHTML}
            </div>
            
            ${variationsHTML}
        `;

        return card;
    }

    createCompatibilityHTML(compatibility) {
        return Object.entries(compatibility).map(([browser, compatible]) => {
            const icon = compatible ? 'fas fa-check-circle' : 'fas fa-times-circle';
            const className = compatible ? 'compatible' : 'incompatible';
            const capitalizedBrowser = browser.charAt(0).toUpperCase() + browser.slice(1);
            
            return `
                <span class="browser-compat ${className}">
                    <i class="${icon}"></i>
                    ${capitalizedBrowser}
                </span>
            `;
        }).join('');
    }

    createVariationsHTML(variations) {
        if (!variations || variations.length === 0) return '';
        
        return `
            <div class="payload-variations">
                <h4><i class="fas fa-layer-group"></i> Payload Variations:</h4>
                ${variations.map((variation, index) => `
                    <div class="variation-item">
                        <div class="payload-code-container">
                            <button class="copy-btn" onclick="app.copyToClipboard(\`${this.escapeForJs(variation)}\`)">
                                <i class="fas fa-copy"></i>
                                Copy
                            </button>
                            <div class="payload-code">${this.escapeHtml(variation)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadMorePayloads() {
        this.currentPage++;
        this.renderPayloads();
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Payload copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                this.showToast('Payload copied to clipboard!', 'success');
            } catch (err) {
                this.showToast('Failed to copy payload', 'error');
            }
            
            document.body.removeChild(textArea);
        }
    }

    showToast(message, type = 'success') {
        this.elements.copyToast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-times-circle'}"></i>
            ${message}
        `;
        
        this.elements.copyToast.classList.add('show');
        
        setTimeout(() => {
            this.elements.copyToast.classList.remove('show');
        }, 3000);
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        this.elements.themeToggle.innerHTML = `
            <i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}"></i>
        `;
        
        // Save preference
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    handleKeyboardNavigation(e) {
        // Ctrl/Cmd + F for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            this.elements.searchInput.focus();
        }
        
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === this.elements.searchInput) {
            this.clearSearch();
            this.elements.searchInput.blur();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    escapeForJs(text) {
        return text.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    }

    debounce(func, wait) {
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new XSSArsenal();
    
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Add some additional CSS for no results and variations
const additionalCSS = `
.no-results {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
    grid-column: 1 / -1;
}

.no-results i {
    font-size: 4rem;
    color: var(--primary-green);
    margin-bottom: 20px;
    opacity: 0.5;
}

.no-results h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: var(--text-primary);
}

.payload-variations {
    margin-top: 20px;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
}

.payload-variations h4 {
    color: var(--primary-green);
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
}

.variation-item {
    margin-bottom: 15px;
}

.variation-item:last-child {
    margin-bottom: 0;
}

/* Light theme support */
.light-theme {
    --primary-green: #00aa2e;
    --secondary-green: #008825;
    --dark-green: #e6f7ea;
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #e9ecef;
    --text-primary: #212529;
    --text-secondary: #495057;
    --text-muted: #6c757d;
    --border-color: #dee2e6;
    --shadow-green: 0 0 20px rgba(0, 170, 46, 0.2);
    --shadow-green-intense: 0 0 30px rgba(0, 170, 46, 0.3);
}

.light-theme .payload-code {
    background: var(--bg-primary);
    color: var(--primary-green);
    border: 1px solid var(--border-color);
}

.light-theme .modal {
    background-color: rgba(255, 255, 255, 0.9);
}

/* Responsive improvements */
@media (max-width: 600px) {
    .payload-variations h4 {
        font-size: 0.9rem;
    }
    
    .variation-item .payload-code {
        font-size: 0.8rem;
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
