<?php
// Simple Contact Form Logic
$message_sent = false;
if(isset($_POST['email']) && $_POST['email'] != ''){
    if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
        // In a real scenario, use mail() or PHPMailer
        // $userName = $_POST['name'];
        // $userEmail = $_POST['email'];
        // $messageSubject = $_POST['subject'];
        // $message = $_POST['message'];
        // mail($to, $subject, $body, $headers);
        $message_sent = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalaiarasu S | Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        body { margin: 0; overflow-x: hidden; background-color: #050510; }
        canvas { display: block; position: fixed; top: 0; left: 0; z-index: 1; }
        #ui-layer { position: relative; z-index: 2; pointer-events: none; }
        .interactive { pointer-events: auto; }
    </style>
</head>
<body>
    <!-- Preloader -->
    <div id="loader">
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>System Initializing...</p>
        </div>
    </div>

    <!-- Custom Cursor -->
    <div class="cursor-dot"></div>
    <div class="cursor-outline"></div>

    <!-- 3D Canvas Container -->
    <div id="canvas-container"></div>

    <!-- UI Overlay -->
    <div id="ui-layer">
        <nav>
            <div class="logo">
                <div class="logo-icon">K</div>
                <span>Kalaiarasu S | Developer</span>
            </div>
            <ul class="nav-links interactive">
                <li><a href="#about">About</a></li>
                <li><a href="#work">Work</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#source" class="btn-source">Source Code</a></li>
            </ul>
        </nav>

        <header class="hero">
            <div class="hero-content">
                <h1 class="interactive">Hi, I'm <span class="highlight">Kalaiarasu</span></h1>
                <p class="subtitle">Creative Developer & 3D Enthusiast. <br>Crafting digital experiences that exist on the edge of reality.</p>
                <a href="#work" class="cta-button interactive">View My Work</a>
            </div>
            
            <div class="scroll-indicator">
                <span class="scroll-text">Scroll to Explore</span>
                <div class="mouse">
                    <div class="wheel"></div>
                </div>
            </div>
        </header>

        <section id="about">
            <h2 class="section-title">About Me</h2>
            <div class="about-container">
                <div class="glass-card interactive">
                    <h3>Who I Am</h3>
                    <p>I'm a passionate developer who bridges the gap between design and engineering. I specialize in building immersive web applications using modern technologies like **Three.js**, **React**, and **PHP**.</p>
                    <br>
                    <p>My goal is to create websites that are not just functional, but also memorable experiences.</p>
                </div>
                <div class="skills-grid">
                    <div class="skill-item glass-card interactive"><span>PHP / Laravel</span></div>
                    <div class="skill-item glass-card interactive"><span>JavaScript (ES6+)</span></div>
                    <div class="skill-item glass-card interactive"><span>Three.js / WebGL</span></div>
                    <div class="skill-item glass-card interactive"><span>React / Vue</span></div>
                    <div class="skill-item glass-card interactive"><span>UI/UX Design</span></div>
                    <div class="skill-item glass-card interactive"><span>Git / DevOps</span></div>
                </div>
            </div>
        </section>

        <section id="work">
            <h2 class="section-title">Selected Work</h2>
            <div class="card-grid">
                <!-- Project 1 -->
                <div class="project-card glass-card interactive">
                    <div class="project-image" style="background: linear-gradient(45deg, #8a5cf5, #222);"></div>
                    <div class="project-info">
                        <h3>Neon Dashboard</h3>
                        <p>A futuristic analytics dashboard with real-time data visualization.</p>
                        <div class="tags">
                            <span>React</span><span>D3.js</span>
                        </div>
                    </div>
                </div>
                <!-- Project 2 -->
                <div class="project-card glass-card interactive">
                    <div class="project-image" style="background: linear-gradient(45deg, #ff0055, #222);"></div>
                    <div class="project-info">
                        <h3>3D E-Commerce</h3>
                        <p>Interactive product configurator allowing users to customize items in 3D.</p>
                        <div class="tags">
                            <span>Three.js</span><span>Shopify</span>
                        </div>
                    </div>
                </div>
                <!-- Project 3 -->
                <div class="project-card glass-card interactive">
                    <div class="project-image" style="background: linear-gradient(45deg, #00ffaa, #222);"></div>
                    <div class="project-info">
                        <h3>AI Chat Interface</h3>
                        <p>A clean, minimal interface for interacting with LLMs.</p>
                        <div class="tags">
                            <span>Vue.js</span><span>OpenAI API</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact">
            <h2 class="section-title">Get In Touch</h2>
            <div class="contact-container glass-card interactive">
                <?php if($message_sent): ?>
                    <div class="success-message">
                        <h3>Thanks for reaching out!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                    </div>
                <?php else: ?>
                    <form action="index.php#contact" method="POST" class="contact-form">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Let's build something together..."></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Send Message</button>
                    </form>
                    <div style="margin-top: 20px; text-align: center; color: rgba(255,255,255,0.6);">
                        <p>Or contact me directly:</p>
                        <p>Phone: 9025488266</p>
                        <p>Email: skalaiarasu3@gmail.com</p>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <footer>
            <p>&copy; <?php echo date("Y"); ?> Kalaiarasu S. All rights reserved.</p>
            <div class="socials interactive">
                <a href="#">GitHub</a>
                <a href="#">LinkedIn</a>
                <a href="#">Twitter</a>
            </div>
        </footer>
    </div>

    <!-- Three.js -->
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
    <script type="module" src="js/main.js"></script>
    <script>
        // Custom Cursor Logic
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Smooth follow
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    </script>
</body>
</html>
