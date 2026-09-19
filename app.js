const config = { open: true, formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc84T6TRStuNDk-1YNP9LhcrE8-35Gyi3uUTy6LfGoVSkEWRA/viewform', entry: 'entry.173012199' };
const vote = document.querySelector('#vote');
const button = document.querySelector('#continue');
const confirmation = document.querySelector('#confirmation');
vote.addEventListener('change', () => {
  const choice = new FormData(vote).get('proposal');
  button.disabled = !choice;
  document.querySelector('#selection').textContent = `Sua escolha: ${choice}`;
  confirmation.hidden = true;
});
vote.addEventListener('submit', event => {
  event.preventDefault();
  if (!vote.reportValidity()) return;
  const choice = new FormData(vote).get('proposal');
  document.querySelector('#chosen').textContent = choice;
  if (config.open && config.formUrl && config.entry) {
    const url = new URL(config.formUrl);
    url.searchParams.set('usp', 'pp_url');
    url.searchParams.set(config.entry, choice);
    const link = document.querySelector('#google-link');
    link.href = url.href;
    link.hidden = false;
    document.querySelector('#confirmation-text').textContent = 'Confira sua opção no Google Forms e toque em Enviar para registrar seu voto anônimo. O voto só será registrado após esse envio.';
  }
  confirmation.hidden = false;
  confirmation.focus();
  confirmation.scrollIntoView({block:'nearest',behavior:'smooth'});
});
document.querySelector('#back').addEventListener('click', () => {
  confirmation.hidden = true;
  document.querySelector('input:checked').focus();
});
