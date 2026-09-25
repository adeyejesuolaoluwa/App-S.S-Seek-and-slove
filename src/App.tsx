import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Layers3,
  Menu,
  Play,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { EmptyState } from './components/States'

type CreationPath = {
  icon: typeof Code2
  label: string
  detail: string
  color: string
}

type SearchResult = {
  category: string
  title: string
  detail: string
}

type Lesson = {
  title: string
  duration: string
  description: string
  status: string
}

type ServiceOption = {
  label: string
  description: string
}

type Plan = {
  name: string
  duration: string
  price: string
  description: string
}

const creationPaths: CreationPath[] = [
  { icon: Code2, label: 'Websites', detail: 'Shape a credible home for your next idea.', color: 'red' },
  { icon: Layers3, label: 'Web apps', detail: 'Turn a workflow into an experience people use.', color: 'purple' },
  { icon: Compass, label: 'Online businesses', detail: 'Build the system behind your ambition.', color: 'blue' },
]

const journey = [
  ['01', 'Discover', 'Find the right starting point for your idea.'],
  ['02', 'Learn', 'Get the context and skills to move with confidence.'],
  ['03', 'Create', 'Describe the product you want to bring into the world.'],
]

const searchResults: SearchResult[] = [
  { category: 'Service', title: 'Website making', detail: 'Plan and build a clear, credible website.' },
  { category: 'Service', title: 'Web application', detail: 'Turn a workflow into a product people use.' },
  { category: 'Lesson', title: 'Learn HTML & CSS', detail: 'Understand the building blocks of the web.' },
  { category: 'Lesson', title: 'Learn JavaScript', detail: 'Make your product respond and come alive.' },
  { category: 'Idea', title: 'Online store', detail: 'Explore an e-commerce project path.' },
  { category: 'Idea', title: 'Business dashboard', detail: 'Build a focused tool for better decisions.' },
]

const lessons: Lesson[] = [
  { title: 'How the web fits together', duration: '12 min', description: 'Get the mental model behind pages, interfaces, and the people who use them.', status: 'Complete' },
  { title: 'Give your idea a clear shape', duration: '18 min', description: 'Turn a loose thought into a useful product brief with a purpose and audience.', status: 'Next up' },
  { title: 'Choose your first build', duration: '15 min', description: 'Compare project paths and choose a first version you can actually finish.', status: 'Locked' },
]

const serviceOptions: ServiceOption[] = [
  { label: 'Website', description: 'A polished home for your idea or business.' },
  { label: 'Web app', description: 'A focused product that helps people do something.' },
  { label: 'Online store', description: 'A considered storefront for selling online.' },
  { label: 'Portfolio', description: 'A clear presentation of your work and point of view.' },
  { label: 'Business site', description: 'A trustworthy digital front door for your company.' },
  { label: 'Landing page', description: 'A sharp page built around one important action.' },
]

const plans: Plan[] = [
  { name: 'Beginner', duration: '4 days', price: '$100', description: 'A focused first version for a clear idea.' },
  { name: 'Professional', duration: '6 days', price: '$4,000', description: 'A polished digital product with a considered structure.' },
  { name: 'Pro-professional', duration: '12 days', price: '$5,000', description: 'A deeper build for ambitious online products.' },
]

const whatsappUrl = 'https://wa.me/2348120996497'
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL as string | undefined

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePath, setActivePath] = useState('Websites')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLesson, setActiveLesson] = useState(1)
  const [selectedService, setSelectedService] = useState('Website')
  const [serviceIdea, setServiceIdea] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectPurpose, setProjectPurpose] = useState('')
  const [projectAudience, setProjectAudience] = useState('')
  const [projectFeatures, setProjectFeatures] = useState('')
  const [projectSubmitted, setProjectSubmitted] = useState(false)
  const [workspaceTab, setWorkspaceTab] = useState('Projects')
  const [authOpen, setAuthOpen] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authSent, setAuthSent] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(['Your project brief is ready to review.', 'Lesson 2 is waiting in your learning path.'])
  const [openFaq, setOpenFaq] = useState(0)
  const [contactSent, setContactSent] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Professional')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutEmail, setCheckoutEmail] = useState('')
  const [checkoutSent, setCheckoutSent] = useState(false)
  const [customizationType, setCustomizationType] = useState('Branding')
  const [customizationDetails, setCustomizationDetails] = useState('')
  const [customizationSent, setCustomizationSent] = useState(false)
  const [adminStatus, setAdminStatus] = useState('Pending')

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('home')} aria-label="S.S. home">
          <span className="brand-mark">S.S.</span>
          <span className="brand-name">S.S.</span>
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <button className="nav-link active" onClick={() => scrollTo('home')}>Home</button>
          <button className="nav-link" onClick={() => scrollTo('paths')}>Services</button>
          <button className="nav-link" onClick={() => scrollTo('learning')}>Learn</button>
          <button className="nav-link" onClick={() => scrollTo('search')}>Search</button>
          <button className="nav-link" onClick={() => scrollTo('faq')}>FAQ</button>
          <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
        </nav>

        <div className="header-actions">
          <button className="notification-button" onClick={() => setNotificationsOpen((open) => !open)} aria-label="Open notifications"><Bell size={17} />{notifications.length > 0 && <span>{notifications.length}</span>}</button>
          <button className="text-button" onClick={() => setAuthOpen(true)}>Sign in</button>
          <button className="button button-dark" onClick={() => scrollTo('workspace')}>Start creating <ArrowRight size={16} /></button>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {notificationsOpen && <aside className="notification-panel" aria-label="Notifications"><div className="notification-header"><strong>Notifications</strong><button onClick={() => setNotifications([])}>Mark all read</button></div>{notifications.length > 0 ? notifications.map((notification) => <div className="notification-item" key={notification}><span className="notification-dot" /><span><strong>{notification}</strong><small>Just now</small></span></div>) : <div className="notification-empty"><Bell size={18} /><span>All caught up.</span></div>}</aside>}

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> A digital creation partner</div>
          <h1>Have an idea.<br /><em>Make it real.</em></h1>
          <p className="hero-description">S.S. helps you learn what you need, shape a clear direction, and turn your next idea into a digital product people can use.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo('workspace')}>Start creating <ArrowRight size={17} /></button>
            <button className="button button-quiet" onClick={() => scrollTo('learn')}><span className="play-icon"><Play size={12} fill="currentColor" /></span> See how it works</button>
          </div>
          <div className="hero-note"><span className="avatar-stack"><span>J</span><span>M</span><span>A</span></span><span>Built for curious people with somewhere to go.</span></div>
        </div>

        <div className="hero-visual" aria-label="S.S. project workspace preview">
          <div className="visual-glow" />
          <div className="workspace-window">
            <div className="window-topbar"><span className="window-dots"><i /><i /><i /></span><span className="window-title">New project / untitled</span><span className="window-menu"><span /> <span /> <span /></span></div>
            <div className="window-body">
              <aside className="window-sidebar"><span className="sidebar-logo">S</span><div className="sidebar-icon active"><Layers3 size={16} /></div><div className="sidebar-icon"><Compass size={16} /></div><div className="sidebar-icon"><Search size={16} /></div><div className="sidebar-bottom"><div className="sidebar-icon"><span className="tiny-avatar">A</span></div></div></aside>
              <div className="canvas-area">
                <div className="canvas-header"><div><span className="canvas-kicker">PROJECT BLUEPRINT</span><h3>Make learning feel possible</h3></div><span className="status-pill"><span /> In progress</span></div>
                <div className="progress-track"><span /></div>
                <div className="canvas-grid"><div className="blueprint-card large"><span className="card-number">01</span><strong>Purpose</strong><p>Help independent creators move from idea to a clear first version.</p><div className="mini-line short" /><div className="mini-line" /></div><div className="blueprint-card"><span className="card-number purple-number">02</span><strong>Audience</strong><p>Curious people building their first digital product.</p><div className="audience-row"><span>J</span><span>M</span><span>A</span><b>+12</b></div></div><div className="blueprint-card accent-card"><Sparkles size={18} /><strong>Next suggested step</strong><p>Choose a project path to start learning.</p><button onClick={() => scrollTo('paths')}>Explore paths <ArrowRight size={14} /></button></div></div>
              </div>
            </div>
          </div>
          <div className="floating-tag tag-top"><Sparkles size={14} /> Idea to blueprint</div>
          <div className="floating-tag tag-bottom"><span className="tag-check"><Check size={12} /></span> Your progress is saved</div>
        </div>
      </section>

      <section className="trust-row"><span>One place to move from thinking to doing.</span><div className="trust-line" /><span className="trust-caption">For makers, founders, and teams</span></section>

      <section className="paths-section section" id="paths">
        <div className="section-heading"><div><span className="section-label">START WHERE YOU ARE</span><h2>What are you here<br /><span>to create?</span></h2></div><p>Every meaningful product starts as a rough thought. Choose a direction, or bring your own.</p></div>
        <div className="path-grid">{creationPaths.map(({ icon: Icon, label, detail, color }) => <button key={label} className={`path-card ${activePath === label ? 'selected' : ''}`} onClick={() => setActivePath(label)}><span className={`path-icon ${color}`}><Icon size={22} /></span><span className="path-label">{label}</span><span className="path-detail">{detail}</span><span className="path-arrow"><ArrowRight size={16} /></span></button>)}<button className="path-card custom-path" onClick={() => scrollTo('workspace')}><span className="path-icon neutral"><Sparkles size={21} /></span><span className="path-label">Something else</span><span className="path-detail">Tell us what you have in mind.</span><span className="path-arrow"><ArrowRight size={16} /></span></button></div>
        <div className="service-discovery"><div><span className="section-label">OR DESCRIBE IT YOUR WAY</span><h3>I want to create a...</h3><p>Choose the closest starting point. You can refine the idea next.</p></div><div className="service-options">{serviceOptions.map((service) => <button key={service.label} className={selectedService === service.label ? 'active' : ''} onClick={() => setSelectedService(service.label)}>{service.label}<Check size={14} /></button>)}</div><div className="service-input"><Sparkles size={18} /><input value={serviceIdea} onChange={(event) => setServiceIdea(event.target.value)} placeholder="Or tell us what you have in mind..." aria-label="Describe your digital product idea" /><button onClick={() => scrollTo('workspace')}>Continue <ArrowRight size={15} /></button></div></div>
      </section>

      <section className="search-section section" id="search">
        <div className="search-heading"><div><span className="section-label">FIND YOUR NEXT MOVE</span><h2>Search the<br /><span>S.S. library.</span></h2></div><p>Look across creation paths, lessons, and project ideas. Start with a word or a question.</p></div>
        <div className="search-box"><Search size={19} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Try “learn JavaScript” or “online store”" aria-label="Search S.S. library" /><kbd>⌘ K</kbd></div>
        <div className="search-suggestions"><span>Popular:</span>{['Website making', 'Learn CSS', 'Portfolio', 'Web application'].map((suggestion) => <button key={suggestion} onClick={() => setSearchQuery(suggestion)}>{suggestion}</button>)}</div>
        <div className="result-grid">{searchResults.filter(({ title, detail }) => `${title} ${detail}`.toLowerCase().includes(searchQuery.toLowerCase())).map(({ category, title, detail }) => <button className="result-card" key={title} onClick={() => setActivePath(title)}><span className="result-category">{category}</span><strong>{title}</strong><p>{detail}</p><ArrowRight size={15} /></button>)}</div>
        {searchQuery && searchResults.filter(({ title, detail }) => `${title} ${detail}`.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && <div className="search-empty"><Search size={18} /><strong>No exact match yet.</strong><span>Try a broader phrase, or describe your idea in the workspace.</span></div>}
      </section>

      <section className="journey-section section" id="learn">
        <div className="journey-intro"><span className="section-label">A BETTER WAY FORWARD</span><h2>Less guessing.<br /><span>More making.</span></h2><p>Whether you are starting from zero or refining a working product, S.S. gives your next step a shape.</p><button className="button button-outline" onClick={() => scrollTo('workspace')}>Explore the workspace <ArrowRight size={16} /></button></div>
        <div className="journey-list">{journey.map(([number, title, copy], index) => <div className="journey-item" key={number}><div className="journey-index">{number}<span className={index === journey.length - 1 ? 'last' : ''} /></div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      </section>

      <section className="learning-section section" id="learning">
        <div className="learning-heading"><div><span className="section-label">LEARN BY DOING</span><h2>Your next lesson<br /><span>is waiting.</span></h2></div><div className="learning-progress"><div><strong>1 of 3</strong><span>lessons complete</span></div><div className="learning-progress-track"><span /></div></div></div>
        <div className="learning-layout"><div className="lesson-list">{lessons.map((lesson, index) => <button key={lesson.title} className={`lesson-item ${activeLesson === index ? 'active' : ''}`} onClick={() => setActiveLesson(index)}><span className={`lesson-status ${lesson.status.toLowerCase().replace(' ', '-')}`}>{lesson.status === 'Complete' ? <Check size={12} /> : index + 1}</span><span><strong>{lesson.title}</strong><small>{lesson.duration} · {lesson.status}</small></span><ChevronDown size={15} /></button>)}</div><article className="lesson-detail"><span className="lesson-kicker">LESSON {String(activeLesson + 1).padStart(2, '0')} · {lessons[activeLesson].duration}</span><h3>{lessons[activeLesson].title}</h3><p>{lessons[activeLesson].description}</p><div className="practice-block"><span className="practice-icon"><Sparkles size={16} /></span><div><strong>Practice task</strong><p>Write one sentence describing the person your product is for.</p></div></div><button className="button button-dark" onClick={() => setActiveLesson((activeLesson + 1) % lessons.length)}>Mark lesson complete <Check size={15} /></button></article></div>
      </section>

      <section className="project-workspace section" id="workspace"><div className="workspace-heading"><div><span className="section-label">PROJECT WORKSPACE</span><h2>Give your idea<br /><span>a first shape.</span></h2></div><p>Answer a few useful questions. S.S. will turn them into a starting brief you can build from.</p></div>{projectSubmitted ? <div className="project-success"><span className="success-mark"><Check size={20} /></span><div><span className="section-label">BRIEF CREATED</span><h3>{projectName || 'Untitled project'} is ready for its first step.</h3><p>Your starting point is saved in this session. Next, we’ll use it to recommend a build path.</p></div><button className="button button-outline" onClick={() => setProjectSubmitted(false)}>Edit brief</button></div> : <form className="project-form" onSubmit={(event) => { event.preventDefault(); setProjectSubmitted(true) }}><label>Project name<input value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="e.g. Northstar Studio" required /></label><label>What do you want to create?<textarea value={serviceIdea} onChange={(event) => setServiceIdea(event.target.value)} placeholder="Describe the digital product in your own words..." required /></label><label>What is its purpose?<textarea value={projectPurpose} onChange={(event) => setProjectPurpose(event.target.value)} placeholder="What should this help people do?" required /></label><label>Who is it for?<input value={projectAudience} onChange={(event) => setProjectAudience(event.target.value)} placeholder="e.g. Independent designers" required /></label><label>Features you already have in mind?<textarea value={projectFeatures} onChange={(event) => setProjectFeatures(event.target.value)} placeholder="Optional: accounts, bookings, payments..." /></label><div className="form-submit"><span><Sparkles size={15} /> Starting path: <strong>{selectedService}</strong></span><button className="button button-primary" type="submit">Create project brief <ArrowRight size={17} /></button></div></form>}</section>

      <section className="user-workspace section" id="account"><div className="account-heading"><div><span className="section-label">YOUR PRIVATE WORKSPACE</span><h2>Keep the work<br /><span>moving forward.</span></h2></div><div className="account-status"><span className="tiny-avatar">A</span><span><strong>Alex Morgan</strong><small>Creator account</small></span></div></div><div className="workspace-tabs">{['Projects', 'Learning', 'Purchases', 'Saved work'].map((tab) => <button key={tab} className={workspaceTab === tab ? 'active' : ''} onClick={() => setWorkspaceTab(tab)}>{tab}</button>)}</div><div className="workspace-dashboard"><div className="dashboard-main"><span className="section-label">{workspaceTab.toUpperCase()}</span><h3>{workspaceTab === 'Projects' ? 'Your projects' : workspaceTab === 'Learning' ? 'Learning in progress' : workspaceTab === 'Purchases' ? 'Your digital products' : 'Saved for later'}</h3>{workspaceTab === 'Saved work' ? <EmptyState title="No saved work yet" message="Save an idea or lesson to find it here later." /> : <><div className="dashboard-item"><span className="dashboard-icon purple"><Layers3 size={18} /></span><span><strong>{projectName || 'Northstar Studio'}</strong><small>{workspaceTab === 'Learning' ? '2 of 6 lessons complete' : 'Project brief · Updated just now'}</small></span><span className="dashboard-progress">33%</span></div><div className="dashboard-item muted"><span className="dashboard-icon red"><Sparkles size={18} /></span><span><strong>Restaurant booking concept</strong><small>Draft · Continue exploring</small></span><ArrowRight size={16} /></div></>}</div><aside className="dashboard-side"><span className="section-label">AT A GLANCE</span><div><strong>01</strong><span>active project</span></div><div><strong>02</strong><span>lessons complete</span></div><button className="button button-dark" onClick={() => scrollTo('workspace')}>Open project <ArrowRight size={15} /></button></aside></div></section>

      <section className="support-section section" id="faq"><div className="support-heading"><div><span className="section-label">HELP WHEN YOU NEED IT</span><h2>Good questions<br /><span>move things forward.</span></h2></div><p>Find a quick answer or send the team a note. We’ll help you find the next useful step.</p></div><div className="support-grid"><div className="faq-list">{[['What is S.S.?', 'S.S. is a digital creation partner that helps you learn, plan, and build online products.'], ['What can I create?', 'Websites, web applications, online stores, portfolios, business sites, and other digital products.'], ['How does the free trial work?', 'You can explore the core workspace for 2.5 days. Your account uses server time to keep the trial fair.'], ['Can I customize a purchased product?', 'Yes. Submit a customization request and you will see any additional cost before approval.']].map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><strong>{question}</strong><ChevronDown size={16} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div><div className="contact-card" id="contact"><span className="section-label">CONTACT S.S. SEEK & SOLVE</span><a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">Message us on WhatsApp <ArrowRight size={14} /></a>{contactEmail && <a className="email-link" href={`mailto:${contactEmail}`}>Email {contactEmail} <ArrowRight size={14} /></a>}{contactSent ? <div className="contact-success"><span className="success-mark"><Check size={18} /></span><h3>Message prepared.</h3><p>Your email app should open with the message ready to send.</p></div> : <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const subject = encodeURIComponent(`S.S. enquiry from ${form.get('name')}`); const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`); if (contactEmail) window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`; setContactSent(true) }}><h3>Tell us what you’re working on.</h3><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" required type="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" required placeholder="How can we help?" /></label><button className="button button-primary" type="submit">{contactEmail ? 'Open email draft' : 'Save message preview'} <ArrowRight size={15} /></button></form>}</div></div></section>

      <section className="products-section section" id="products"><div className="products-heading"><div><span className="section-label">PROFESSIONALLY CREATED PRODUCTS</span><h2>Choose the right<br /><span>pace to build.</span></h2></div><p>Every plan starts with a clear brief and ends with a digital product shaped around your needs.</p></div><div className="plan-grid">{plans.map((plan) => <button className={`plan-card ${selectedPlan === plan.name ? 'active' : ''}`} key={plan.name} onClick={() => setSelectedPlan(plan.name)}><span className="plan-name">{plan.name}</span><strong>{plan.price}</strong><span className="plan-duration">{plan.duration}</span><p>{plan.description}</p><span className="plan-select">{selectedPlan === plan.name ? 'Selected' : 'Choose plan'} {selectedPlan === plan.name && <Check size={14} />}</span></button>)}</div><div className="checkout-bar"><span><Sparkles size={16} /> Selected: <strong>{selectedPlan}</strong> · Secure checkout via payment provider</span><button className="button button-primary" onClick={() => setCheckoutOpen(true)}>Continue to checkout <ArrowRight size={16} /></button></div></section>

      <section className="customization-section section" id="customize"><div className="customization-heading"><div><span className="section-label">AFTER PURCHASE</span><h2>Make it feel<br /><span>like yours.</span></h2></div><p>Request changes to your purchased product. We’ll review the scope and show any additional cost before work begins.</p></div>{customizationSent ? <div className="project-success"><span className="success-mark"><Check size={20} /></span><div><span className="section-label">REQUEST RECEIVED</span><h3>Your customization request is under review.</h3><p>We’ll confirm scope and any additional cost before the request becomes active.</p></div><button className="button button-outline" onClick={() => setCustomizationSent(false)}>Submit another</button></div> : <form className="customization-form" onSubmit={(event) => { event.preventDefault(); setCustomizationSent(true) }}><div className="customization-types"><span>What would you like to change?</span>{['Branding', 'Content', 'Layout', 'Features'].map((type) => <button type="button" key={type} className={customizationType === type ? 'active' : ''} onClick={() => setCustomizationType(type)}>{type}</button>)}</div><label>Describe the change<textarea value={customizationDetails} onChange={(event) => setCustomizationDetails(event.target.value)} placeholder="Tell us what you would like adjusted..." required /></label><div className="customization-submit"><span><Sparkles size={15} /> Review first · payment required only if scope changes</span><button className="button button-primary" type="submit">Send customization request <ArrowRight size={15} /></button></div></form>}</section>

      <section className="admin-section section" id="admin"><div className="admin-heading"><div><span className="section-label">PRIVATE ADMIN ROUTE</span><h2>Operate the<br /><span>whole system.</span></h2></div><span className="role-badge">ADMIN ONLY</span></div><div className="admin-lock"><span className="lock-mark"><Layers3 size={18} /></span><div><strong>Role-based access required</strong><p>This dashboard is protected server-side. The current public session has the <b>USER</b> role, so operational data is not exposed here.</p></div></div><div className="admin-preview"><div className="admin-metrics"><div><span>Open requests</span><strong>12</strong></div><div><span>Paid orders</span><strong>08</strong></div><div><span>Learning activity</span><strong>34</strong></div><div><span>New messages</span><strong>05</strong></div></div><div className="admin-order"><div><span className="section-label">ORDER MANAGEMENT PREVIEW</span><h3>Recent order · SS-2048</h3><p>Northstar Studio · Professional plan · $4,000</p></div><select value={adminStatus} onChange={(event) => setAdminStatus(event.target.value)} aria-label="Order status"><option>Pending</option><option>In Progress</option><option>Completed</option></select></div></div></section>

      <footer className="footer" id="contact"><div className="footer-brand"><span className="brand-mark">S.S.</span><p>Learn what you need.<br />Create what comes next.</p></div><div className="footer-links"><div><span>Explore</span><button onClick={() => scrollTo('paths')}>Services</button><button onClick={() => scrollTo('learn')}>Learning</button></div><div><span>Company</span><button onClick={() => scrollTo('faq')}>FAQ</button><button onClick={() => scrollTo('contact')}>Contact</button></div></div><div className="footer-meta"><span>© 2026 S.S. Studio</span><span>Made for meaningful ideas.</span></div></footer>
      {authOpen && <div className="auth-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAuthOpen(false) }}><section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><button className="auth-close" onClick={() => setAuthOpen(false)} aria-label="Close sign in dialog"><X size={18} /></button><span className="brand-mark">S.S.</span>{authSent ? <div className="auth-success"><span className="success-mark"><Check size={19} /></span><h2>Check your inbox.</h2><p>We sent a secure sign-in link to <strong>{authEmail}</strong>.</p><button className="button button-outline" onClick={() => setAuthSent(false)}>Use another email</button></div> : <><span className="section-label">YOUR CREATOR ACCOUNT</span><h2 id="auth-title">Welcome back.</h2><p className="auth-copy">Sign in to continue your projects and learning progress.</p><button className="provider-button"><span>G</span> Continue with Google</button><div className="auth-divider"><span>or use email</span></div><form onSubmit={(event) => { event.preventDefault(); setAuthSent(true) }}><label>Email address<input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="you@example.com" required /></label><button className="button button-primary" type="submit">Send secure link <ArrowRight size={16} /></button></form><small className="auth-note">No password needed. Your sign-in link expires for your security.</small></>}</section></div>}
      {checkoutOpen && <div className="auth-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false) }}><section className="auth-modal checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><button className="auth-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout"><X size={18} /></button><span className="section-label">SECURE CHECKOUT</span>{checkoutSent ? <div className="auth-success"><span className="success-mark"><Check size={19} /></span><h2>Checkout started.</h2><p>Your order request for the <strong>{selectedPlan}</strong> plan is ready for payment-provider handoff.</p><button className="button button-outline" onClick={() => setCheckoutOpen(false)}>Return to products</button></div> : <><h2 id="checkout-title">Complete your order.</h2><div className="checkout-summary"><span>{selectedPlan}</span><strong>{plans.find((plan) => plan.name === selectedPlan)?.price}</strong></div><form onSubmit={(event) => { event.preventDefault(); setCheckoutSent(true) }}><label>Email for order updates<input type="email" value={checkoutEmail} onChange={(event) => setCheckoutEmail(event.target.value)} placeholder="you@example.com" required /></label><button className="button button-primary" type="submit">Create secure payment session <ArrowRight size={16} /></button></form><small className="auth-note">Card details are handled by the payment provider and never stored by S.S.</small></>}</section></div>}
    </main>
  )
}

export default App
