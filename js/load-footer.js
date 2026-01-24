// Robust footer include loader
// Tries fragment `inc/footer.inc` first (avoids Live Server injection warnings), falls back to `inc/footer.html`, and finally injects a minimal fallback.
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('site-footer');
  if (!el) return;

  console.log('[load-footer] starting on', location.pathname);

  var fallbackHtml = '<div class="footer-fallback" style="padding:20px;text-align:center;background:#f7f7f7;border-top:1px solid #eaeaea;">' +
    '<div><strong>Lumis</strong> — footer temporarily unavailable. <a href="/inc/footer.inc">View footer fragment</a></div>' +
    '</div>';

  function insertHtml(text, source) {
    el.innerHTML = text;
    el.setAttribute('data-footer-source', source || 'unknown');
    el.classList.add('footer-loaded');
    console.log('[load-footer] inserted footer from', source || 'unknown');
  }

  function fetchPath(path) {
    return fetch(path, {cache: 'no-store'}).then(function (resp) {
      if (!resp.ok) throw new Error('Fetch failed: ' + path + ' (' + resp.status + ')');
      return resp.text().then(function (t) { return {text: t, path: path}; });
    });
  }

  // Try .inc first to avoid Live Server trying to inject live-reload into an HTML fragment
  fetchPath('inc/footer.inc')
    .then(function (res) {
      insertHtml(res.text, res.path);
      // successful load; end chain by returning a resolved value that downstream handlers will ignore
      return Promise.resolve({loaded: true});
    })
    .catch(function (err1) {
      console.warn('[load-footer] inc/footer.inc failed, trying inc/footer.html', err1);
      // try legacy path
      return fetchPath('inc/footer.html')
        .then(function (res) {
          insertHtml(res.text, res.path);
          return Promise.resolve({loaded: true});
        });
    })
    .then(function (res) {
      // If we get here and res is the sentinel ({loaded:true}), do nothing further.
      if (res && res.loaded) return;
      // Otherwise, if no footer was loaded, insert fallback
      insertHtml(fallbackHtml, 'fallback');
    })
    .catch(function (err2) {
      console.error('[load-footer] All footer include fetches failed:', err2);
      insertHtml(fallbackHtml, 'fallback');
    });
});
