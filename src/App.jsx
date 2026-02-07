import { useState, useEffect, useRef } from 'react'
import './index.css'

// Scroll reveal hook
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isVisible]
}

// Animated counter hook
function useCounter(end, duration = 2000, startWhen = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startWhen) return

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, startWhen])

  return count
}

// ========== NAVBAR ==========
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="navbar-logo">KAMIL</a>
        <ul className="navbar-links">
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About me</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Services</a></li>
          <li><a href="https://kamilpvr.in/blog/" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq') }}>FAQ</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
        </ul>
        <div className="navbar-cta">
          <a href="https://call.whatsapp.com/video/R6tUJSbl9VNZCxWCCXaLYE" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Let's Talk →
          </a>
        </div>
        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

// ========== HERO ==========
function Hero() {
  const [statsRef, statsVisible] = useScrollReveal(0.3)
  const projectCount = useCounter(150, 2000, statsVisible)
  const clientCount = useCounter(50, 2000, statsVisible)
  const reachCount = useCounter(500, 2000, statsVisible)

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="accent">THE BEST</span>
              <span>DIGITAL MARKETING</span>
              <span>EXPERT IN KERALA</span>
            </h1>
            <p className="hero-subtitle">
              I work as the Best Digital Marketing Expert in Malappuram, Kerala, partnering with businesses to design smart digital marketing strategies that increase reach, strengthen engagement, and support long-term business growth.
            </p>
            <div className="hero-buttons">
              <a href="https://call.whatsapp.com/video/R6tUJSbl9VNZCxWCCXaLYE" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Let's Talk →
              </a>
              <a href="#services" className="btn btn-outline">View My Work</a>
            </div>
            <div className="hero-stats" ref={statsRef}>
              <div className="stat-item">
                <div className="stat-number">{projectCount}+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{clientCount}+</div>
                <div className="stat-label">Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{reachCount}K+</div>
                <div className="stat-label">Reach</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5★</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img src="/1.png" alt="Kamil - Digital Marketing Expert" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ========== ABOUT ==========
function About() {
  const [ref, isVisible] = useScrollReveal(0.2)

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid" ref={ref}>
          <div className={`about-image reveal-left ${isVisible ? 'visible' : ''}`}>
            <div className="about-image-wrapper">
              <img src="/kamil.webp" alt="Kamil - Digital Marketing Expert" className="about-image-photo" />
            </div>
          </div>
          <div className={`about-content reveal-right ${isVisible ? 'visible' : ''}`}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">Who am I?</h2>
            <h3>The Best Digital Marketing Expert in Malappuram, Kerala</h3>
            <p>
              I am Kamil, the best digital marketing expert based in Malappuram, Kerala, specializing in building credible, high-impact online presences for businesses seeking sustainable growth. With a professional qualification in marketing from <a href="https://studytrack.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-secondary)' }}>Studytrack</a>, I bring a strong foundation in both digital and traditional marketing, supported by a deep understanding of consumer behavior and strategic market positioning.
            </p>
            <p>
              My expertise spans SEO, social media marketing, and performance-driven online advertising, enabling brands to reach the right audience with precision and purpose. Every strategy I develop is informed by data, guided by insight, and continuously optimized to deliver measurable business outcomes.
            </p>
            <p>
              I collaborate closely with small and growing businesses, offering structured strategies, transparent execution, and performance-focused campaigns. My goal is clear: to convert digital visibility into qualified leads, long-term customer relationships, and consistent business growth.
            </p>
            <div className="about-skills">
              <div className="skill-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                SEO Expert
              </div>
              <div className="skill-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Social Media Marketing
              </div>
              <div className="skill-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Performance Advertising
              </div>
              <div className="skill-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Data-Driven Strategies
              </div>
            </div>
            <div className="about-buttons">
              <a href="#contact" className="btn btn-outline">Download Resume</a>
              <a href="#contact" className="btn btn-primary">Connect →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ========== SERVICES ==========
// SVG Icons as components
const SearchIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const ShareIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
)

const TargetIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const PenIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
)

const FileTextIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
)

const CodeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const services = [
  {
    icon: <SearchIcon />,
    title: 'SEO',
    description: 'Maximize your search visibility with technical audits, on-page optimization, and authority building strategies tailored to your niche.',
  },
  {
    icon: <ShareIcon />,
    title: 'SMM',
    description: 'Build a loyal community and drive engagement through strategic social media campaigns across Instagram, LinkedIn, and Facebook.',
  },
  {
    icon: <TargetIcon />,
    title: 'SEM',
    description: 'Accelerate growth with high-ROI PPC campaigns. Targeted Google Ads and display network strategies that convert clicks into customers.',
  },
  {
    icon: <PenIcon />,
    title: 'Content Marketing',
    description: 'Tell your brand story with compelling narratives. We create valuable content ecosystems that educate, entertain, and retain audiences.',
  },
  {
    icon: <FileTextIcon />,
    title: 'SEO Copywriting',
    description: 'Persuasive copy that ranks. Blend psychological triggers with keyword precision to drive organic traffic and boost sales.',
  },
  {
    icon: <CodeIcon />,
    title: 'Web Development',
    description: 'Building fast, secure, and scalable websites. From landing pages to complex web apps, ensuring a seamless user experience.',
  },
]

function Services() {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section id="services" className="services">
      <div className="container">
        <div className={`services-header reveal ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-label">What I Do</span>
          <h2 className="section-title">Comprehensive Digital Marketing Solutions</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tailored strategies for your business growth</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <div
      className={`service-card reveal ${isVisible ? 'visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <a href="#contact" className="service-link">
        Learn More →
      </a>
    </div>
  )
}

// ========== STATS BANNER ==========
function StatsBanner() {
  const [ref, isVisible] = useScrollReveal(0.3)
  const projects = useCounter(150, 2000, isVisible)
  const clients = useCounter(50, 2000, isVisible)
  const reach = useCounter(500, 2000, isVisible)
  const retention = useCounter(100, 2000, isVisible)

  return (
    <section className="stats-banner" ref={ref}>
      <div className="container">
        <div className="stats-banner-grid">
          <div className="stats-banner-item">
            <div className="number">{projects}+</div>
            <div className="label">Projects Completed</div>
          </div>
          <div className="stats-banner-item">
            <div className="number">{clients}+</div>
            <div className="label">Happy Clients</div>
          </div>
          <div className="stats-banner-item">
            <div className="number">{reach}K+</div>
            <div className="label">Reach Generated</div>
          </div>
          <div className="stats-banner-item">
            <div className="number">{retention}%</div>
            <div className="label">Client Retention</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ========== CERTIFICATES ==========
const certificates = [
  {
    image: '/cer1.webp',
    title: 'SEO Essential with Semrush',
    issuer: 'Semrush Academy',
  },
  {
    image: '/cer2.webp',
    title: 'Inbound Marketing Certification',
    issuer: 'Hubspot Academy',
  },
  {
    image: '/cer3.webp',
    title: 'Content Marketing Certification',
    issuer: 'Hubspot Certified',
  },
]

function Certificates() {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section id="certificates" className="certificates">
      <div className="container">
        <div className={`certificates-header reveal ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-label">Accreditations</span>
          <h2 className="section-title">Certifications & Achievements</h2>
        </div>
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificateCard({ cert, index }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <div
      className={`certificate-card reveal ${isVisible ? 'visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="certificate-image">
        <img src={cert.image} alt={cert.title} />
      </div>
      <div className="certificate-info">
        <h3>{cert.title}</h3>
        <p>{cert.issuer}</p>
      </div>
    </div>
  )
}

// ========== TESTIMONIALS ==========
const testimonials = [
  {
    name: 'Mubarak K.',
    title: 'Entrepreneur',
    website: 'mubarakk.in',
    text: 'Working with Kamil has been an excellent experience! As a digital marketing expert in Malappuram, her strategies significantly enhanced our online presence and drove real business growth.',
    initial: 'M',
  },
  {
    name: 'Aflah T.',
    title: 'Digital Marketing',
    website: 'aflaht.in',
    text: "As a digital marketing expert in Malappuram, Kamil's strategic approach and prompt execution have greatly boosted our business growth and online presence.",
    initial: 'A',
  },
  {
    name: 'Rinsha',
    title: 'Entrepreneur',
    website: 'rinshaa.in',
    text: 'Working with Kamil significantly boosted our clothing brand\'s online presence. Our engagement, reach, and website traffic increased, allowing us to connect with our audience more effectively and drive real results.',
    initial: 'R',
  },
  {
    name: 'Roopesh',
    title: 'Digital Marketer',
    website: 'roopeshh.in',
    text: 'Their expertise in SEO, social media marketing, and targeted online advertising delivered impressive results for our brand. I was particularly impressed by their data-driven approach, analyzing performance metrics and transforming insights into strategies.',
    initial: 'R',
  },
]

function Testimonials() {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className={`testimonials-header reveal ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-label">What Clients Say</span>
          <h2 className="section-title">Trusted by Businesses</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <div
      className={`testimonial-card reveal ${isVisible ? 'visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="testimonial-quote-icon">"</div>
      <p className="testimonial-text">{testimonial.text}</p>
      <div className="testimonial-divider"></div>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{testimonial.initial}</div>
        <div className="testimonial-info">
          <h4>{testimonial.name}</h4>
          <p>{testimonial.title} · {testimonial.website}</p>
        </div>
      </div>
      <div className="testimonial-stars">★★★★★</div>
    </div>
  )
}

// ========== FAQ ==========
const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I offer comprehensive digital marketing services including SEO (Search Engine Optimization), Social Media Marketing (SMM), Search Engine Marketing (paid ads), Content Marketing, SEO Copywriting, and Web Development. Each service is tailored to meet your specific business needs and goals.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Results vary by service. SEO typically shows significant improvement in 3-6 months, while paid advertising campaigns can deliver immediate results. I provide regular progress reports and performance updates so you can track the impact of our strategies.',
  },
  {
    question: 'What makes you different from other marketers?',
    answer: 'I focus on data-driven strategies with transparent execution. Every decision is backed by analytics, and I provide clear performance reports so you always know exactly what you\'re getting. My personalized approach ensures strategies are tailored specifically for your business.',
  },
  {
    question: 'Do you work with small businesses?',
    answer: 'Yes! I specialize in helping small and growing businesses build their online presence. I offer structured strategies and performance-focused campaigns tailored to your specific needs and budgets. No business is too small to benefit from professional digital marketing.',
  },
  {
    question: 'How can I get started?',
    answer: 'Simply fill out the contact form below or reach out via WhatsApp. We\'ll schedule a free consultation to discuss your goals, challenges, and how I can help grow your business online. There\'s no obligation - let\'s just have a conversation!',
  },
]

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [ref, isVisible] = useScrollReveal(0.1)

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className={`faq-header reveal ${isVisible ? 'visible' : ''}`} ref={ref}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Everything You Need to Know</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isActive={activeIndex === index}
              onClick={() => toggleFaq(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq, isActive, onClick, index }) {
  const [ref, isVisible] = useScrollReveal(0.1)

  return (
    <div
      className={`faq-item ${isActive ? 'active' : ''} reveal ${isVisible ? 'visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <button className="faq-question" onClick={onClick}>
        <span>{faq.question}</span>
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-content">{faq.answer}</div>
      </div>
    </div>
  )
}

// ========== CONTACT ==========
function Contact() {
  const [ref, isVisible] = useScrollReveal(0.1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid" ref={ref}>
          <div className={`contact-form reveal-left ${isVisible ? 'visible' : ''}`}>
            <h2>Let's Grow Your Business Together!</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <div className="form-submit">
                <button type="submit" className="btn btn-primary">
                  Send Message →
                </button>
              </div>
            </form>
          </div>
          <div className={`contact-info reveal-right ${isVisible ? 'visible' : ''}`}>
            <h3>Get in Touch</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <h4>Email</h4>
                  <p><a href="mailto:kamilpoovallur@gmail.com">kamilpoovallur@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <h4>Location</h4>
                  <p>Malappuram, Padaparamba, Kerala</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-item-text">
                  <h4>Phone</h4>
                  <p><a href="tel:9037272350">9037272350</a></p>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/kamil_digital_marketer" target="_blank" rel="noopener noreferrer" className="social-link"><InstagramIcon /></a>
                <a href="https://www.facebook.com/share/1BLCoY3vQJ/" target="_blank" rel="noopener noreferrer" className="social-link"><FacebookIcon /></a>
                <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-link"><LinkedinIcon /></a>
                <a href="https://call.whatsapp.com/video/R6tUJSbl9VNZCxWCCXaLYE" target="_blank" rel="noopener noreferrer" className="social-link"><WhatsappIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Social Icon Components
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

// ========== FOOTER ===================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">KAMIL</div>
          <p className="footer-tagline">Digital Marketing Expert · Malappuram, Kerala</p>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="https://kamilpvr.in/blog/" target="_blank" rel="noopener noreferrer">Blog</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="footer-social">
            <a href="https://www.instagram.com/kamil_digital_marketer" target="_blank" rel="noopener noreferrer" className="social-link"><InstagramIcon /></a>
            <a href="https://www.facebook.com/share/1BLCoY3vQJ/" target="_blank" rel="noopener noreferrer" className="social-link"><FacebookIcon /></a>
            <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-link"><LinkedinIcon /></a>
            <a href="https://call.whatsapp.com/video/R6tUJSbl9VNZCxWCCXaLYE" target="_blank" rel="noopener noreferrer" className="social-link"><WhatsappIcon /></a>
          </div>
          <div className="footer-copyright">
            © 2026 Kamil. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

// ========== MAIN APP ==========
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <StatsBanner />
      <Certificates />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}

export default App
