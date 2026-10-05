(function () {
  'use strict';

  var answers = Array.prototype.slice.call(document.querySelectorAll('.answer'));
  var feedback = document.getElementById('feedback');
  var feedbackTitle = document.getElementById('feedback-title');
  var feedbackCopy = document.getElementById('feedback-copy');
  var retry = document.getElementById('retry');
  var toast = document.getElementById('toast');
  var answered = false;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }

  function chooseAnswer(event) {
    if (answered) return;
    answered = true;

    var selected = event.currentTarget;
    var isCorrect = selected.getAttribute('data-answer') === 'B';
    var correct = document.querySelector('[data-answer="B"]');

    answers.forEach(function (button) {
      button.disabled = true;
      button.setAttribute('aria-pressed', button === selected ? 'true' : 'false');
    });

    selected.classList.add('selected');
    feedback.classList.add('show');
    retry.classList.add('show');

    if (isCorrect) {
      selected.classList.add('correct');
      feedback.classList.add('success');
      feedbackTitle.textContent = '回答正确！';
      feedbackCopy.textContent = '立即停下、就地躺倒并反复翻滚，可以隔绝空气并压灭火苗。';
      showToast('✓ 已掌握关键处置方法');
    } else {
      selected.classList.add('wrong');
      correct.classList.add('correct');
      feedback.classList.add('error');
      feedbackTitle.textContent = '这个动作会让火势更旺';
      feedbackCopy.textContent = '奔跑会加速空气流动，助长燃烧。正确做法是立即停下，就地打滚压灭火苗。';
      showToast('请记住：不要奔跑');
    }
  }

  function resetQuiz() {
    answered = false;
    answers.forEach(function (button) {
      button.disabled = false;
      button.classList.remove('selected', 'correct', 'wrong');
      button.removeAttribute('aria-pressed');
    });
    feedback.className = 'feedback';
    retry.classList.remove('show');
    answers[0].focus({ preventScroll: true });
  }

  answers.forEach(function (answer) {
    answer.addEventListener('click', chooseAnswer);
  });
  retry.addEventListener('click', resetQuiz);

  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index % 4, 2) * 70 + 'ms';
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) { item.classList.add('visible'); });
  }
})();
