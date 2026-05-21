// Mobile nav toggle
  function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }
  // Close nav on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
  });

  // Scroll reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));

  // Skill bar animation on scroll
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('#skills').forEach(s => barObs.observe(s));

  // Active nav highlight on scroll
  const sectionEls = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sectionEls.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // Contact form — validate + open mailto
  function submitForm() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg   = document.getElementById('fmessage').value.trim();
    let valid = true;

    const showErr = (id, show) => { document.getElementById(id).style.display = show ? 'block' : 'none'; };
    showErr('fnameErr', !fname); if (!fname) valid = false;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    showErr('femailErr', !emailOk); if (!emailOk) valid = false;
    showErr('fmsgErr', !msg); if (!msg) valid = false;
    if (!valid) return;

    const btn     = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');
    const btnText = document.getElementById('btnText');
    btn.disabled = true;
    spinner.style.display = 'block';
    btnText.textContent = 'Sending...';

    const lname   = document.getElementById('lname').value.trim();
    const subject = document.getElementById('fsubject').value || 'Portfolio Inquiry';
    const body    = encodeURIComponent('Name: ' + fname + ' ' + lname + '\nEmail: ' + email + '\n\n' + msg);

    setTimeout(() => {
      window.location.href = 'mailto:muhammadbehjat2008@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, 1000);
  }