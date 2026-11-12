// Show English or Portuguese: the saved choice, else the browser's language.
;(function () {
  var html = document.documentElement
  var saved = null
  try { saved = localStorage.getItem('lang') } catch (e) {}
  var lang = saved || ((navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en')
  function set(l) {
    lang = l
    html.dataset.lang = l
    html.lang = l === 'pt' ? 'pt-BR' : 'en'
    var buttons = document.querySelectorAll('[data-set-lang]')
    for (var i = 0; i < buttons.length; i++) buttons[i].setAttribute('aria-pressed', String(buttons[i].dataset.setLang === l))
  }
  set(lang)
  document.addEventListener('DOMContentLoaded', function () {
    set(lang)
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set-lang]')
      if (!b) return
      set(b.dataset.setLang)
      try { localStorage.setItem('lang', lang) } catch (err) {}
    })
  })
})()
