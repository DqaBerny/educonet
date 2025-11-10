document.addEventListener('DOMContentLoaded', function() {
  const toggles = Array.from(document.querySelectorAll('.nav-toggle'))

  function getNavById(id){
    if(!id) return null
    return document.getElementById(id)
  }

  toggles.forEach(btn => {
    // ensure aria-expanded attribute exists
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false')
    btn.addEventListener('click', function (e) {
      const isExpanded = this.getAttribute('aria-expanded') === 'true'
      const navId = this.getAttribute('aria-controls')
      const nav = getNavById(navId) || document.querySelector('.main-nav')

      // toggle
      const willOpen = !isExpanded
      this.setAttribute('aria-expanded', String(willOpen))
      if (nav) nav.classList.toggle('open', willOpen)

      // when opening, move focus into the nav for keyboard users
      if (willOpen && nav) {
        // focus first focusable item, or the nav itself
        const first = nav.querySelector('a, button, [tabindex]:not([tabindex="-1"])')
        ;(first || nav).focus()
      }
    })
  })

  // Close nav when clicking outside on small screens
  document.addEventListener('click', function(e){
    var openNav = document.querySelector('.main-nav.open');
    if(!openNav) return;
    var toggle = document.querySelector('.nav-toggle[aria-expanded="true"]');
    if(!toggle) return;
    if(!openNav.contains(e.target) && !toggle.contains(e.target)){
      openNav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }
  });
  
  // keyboard: Esc closes open nav
  document.addEventListener('keydown', function (e) {
    // Escape closes
    if (e.key === 'Escape' || e.key === 'Esc') {
      const openNav = document.querySelector('.main-nav.open')
      const openBtn = document.querySelector('.nav-toggle[aria-expanded="true"]')
      if (openNav && openBtn) {
        openNav.classList.remove('open')
        openBtn.setAttribute('aria-expanded', 'false')
        openBtn.focus()
      }
    }

    // Focus trap: when nav is open, trap Tab focus inside it
    if (e.key === 'Tab') {
      const openNav = document.querySelector('.main-nav.open')
      if (!openNav) return

      const focusable = Array.from(openNav.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      // If focus currently is not inside the nav, move it to first
      if (!openNav.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
        return
      }

      // If Shift+Tab on first, move to last
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
        return
      }

      // If Tab on last, move to first
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
        return
      }
    }
  })
});