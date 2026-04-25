(() => {
  'use strict';

  // ----- Mobile nav toggle -----
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // ----- Form validation + submission -----
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  const setError = (field, message) => {
    field.classList.toggle('invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    const errorEl = form.querySelector(`[data-error-for="${field.id}"]`);
    if (errorEl) errorEl.textContent = message || '';
  };

  const validators = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email.'),
    phone: (v) => {
      const digits = v.replace(/\D/g, '');
      return digits.length >= 10 ? '' : 'Please enter a valid phone number.';
    },
    service: (v) => (v ? '' : 'Please choose a service.'),
  };

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;
    const message = validator(field.value);
    setError(field, message);
    return !message;
  };

  ['name', 'email', 'phone', 'service'].forEach((id) => {
    const field = form.elements[id];
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const fieldsToCheck = ['name', 'email', 'phone', 'service'].map((id) => form.elements[id]);
    const allValid = fieldsToCheck.every(validateField);

    if (!allValid) {
      const firstInvalid = fieldsToCheck.find((f) => f.classList.contains('invalid'));
      if (firstInvalid) firstInvalid.focus();
      status.textContent = 'Please fix the errors above and try again.';
      status.classList.add('error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        status.textContent = 'Thanks! We’ll be in touch within one business day.';
        status.classList.add('success');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      status.textContent = 'Something went wrong. Please call 647-618-8264 or email info@yourtaxclinic.ca.';
      status.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
