(function () {
  var form = document.getElementById('form');
  var input = document.getElementById('email');
  var msg = document.getElementById('msg');
  var btn = document.getElementById('submit');
  var label = btn.textContent;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function show(text, type) {
    msg.textContent = text;
    msg.className = 'msg' + (type ? ' ' + type : '');
  }
  function validate(value) {
    if (!value) return 'Please enter your email address.';
    if (value.length > 254 || !EMAIL_RE.test(value)) return 'Please enter a valid email address, like name@example.com.';
    return '';
  }

  input.addEventListener('input', function () {
    if (input.getAttribute('aria-invalid') === 'true') {
      var err = validate(input.value.trim());
      if (!err) { input.removeAttribute('aria-invalid'); show('', ''); }
    }
  });
  input.addEventListener('blur', function () {
    var v = input.value.trim();
    if (v) {
      var err = validate(v);
      if (err) { input.setAttribute('aria-invalid', 'true'); show(err, 'error'); }
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();
    var err = validate(value);
    if (err) {
      input.setAttribute('aria-invalid', 'true');
      show(err, 'error');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    show('', '');
    btn.disabled = true;
    btn.textContent = 'Subscribing…';

    // Replace this timeout with a real request, e.g.:
    // fetch('/api/subscribe', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email: value }) })
    setTimeout(function () {
      btn.disabled = false;
      btn.textContent = label;
      form.reset();
      show('Thanks for subscribing! Check your inbox to confirm.', 'success');
    }, 900);
  });
})();
