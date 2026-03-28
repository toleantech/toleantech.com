class ToleanNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
                background: white;
                border-bottom: 4px solid black;
            }

            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 900;
                font-size: 1.5rem;
                text-decoration: none;
                color: black;
                text-transform: uppercase;
            }

            .logo-mark {
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .logo-mark img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }

            .nav-links {
                display: flex;
                gap: 2rem;
            }

            .nav-links a {
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 700;
                text-decoration: none;
                color: black;
                text-transform: uppercase;
                font-size: 1rem;
                transition: transform 0.1s;
            }

            .nav-links a:hover {
                transform: skewX(-10deg);
                color: #003300;
            }

            .menu-toggle {
                display: none;
                background: black;
                color: white;
                border: none;
                padding: 1rem;
                font-family: 'Roboto Condensed', sans-serif;
                font-weight: 900;
                text-transform: uppercase;
                cursor: pointer;
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                box-shadow: 4px 4px 0 #003300;
                z-index: 1001;
            }

            @media (max-width: 768px) {
                :host {
                    border-bottom: none;
                    background: transparent;
                }
                
                nav {
                    background: white;
                    border-bottom: 4px solid black;
                }

                .nav-links {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 999;
                }

                .nav-links.active {
                    display: flex;
                }

                .nav-links a {
                    font-size: 2rem;
                    margin: 1rem 0;
                }

                .menu-toggle {
                    display: block;
                }
            }
        </style>
        <nav>
            <a href="#" class="logo">
                <div class="logo-mark">
                    <img src="assets/img/logo.svg" alt="Tolean Tech Logo">
                </div>
                <span>TOLEAN TECH</span>
            </a>
            <div class="nav-links">
                <a href="#hero">HOME</a>
                <a href="#about">ABOUT</a>
                <a href="#services">SERVICES</a>
                <a href="#contact">CONTACT</a>
                <a href="#" data-modal="impressum">LEGAL</a>
            </div>
        </nav>
        <button class="menu-toggle">MENU</button>
        `;

        const toggle = this.shadowRoot.querySelector('.menu-toggle');
        const links = this.shadowRoot.querySelector('.nav-links');
        const navItems = this.shadowRoot.querySelectorAll('.nav-links a');

        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.textContent = links.classList.contains('active') ? 'CLOSE' : 'MENU';
        });

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const modalId = item.getAttribute('data-modal');
                if (modalId) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('open-modal', { detail: modalId }));
                }
                links.classList.remove('active');
                toggle.textContent = 'MENU';
            });
        });
    }
}

customElements.define('tolean-navbar', ToleanNavbar);
