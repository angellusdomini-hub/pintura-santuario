const config = {
  endpoint: 'https://script.google.com/macros/s/AKfycbw7g2pc_jE0fJwHwbrv6EScI9NuzZ0JTKFoU2569ysCxS2DfSFzLEezia8rkN0xbFXPSQ/exec'
};

const vote = document.querySelector('#vote');
const button = document.querySelector('#continue');
const confirmation = document.querySelector('#confirmation');
const confirmButton = document.querySelector('#confirm-vote');
const backButton = document.querySelector('#back');
const status = document.querySelector('#vote-status');

let selectedChoice = null;
let sending = false;

vote.addEventListener('change', () => {
  selectedChoice = new FormData(vote).get('proposal');
  button.disabled = !selectedChoice;
  document.querySelector('#selection').textContent = `Sua escolha: ${selectedChoice}`;
  confirmation.hidden = true;
  status.textContent = '';
});

vote.addEventListener('submit', event => {
  event.preventDefault();
  if (!vote.reportValidity()) return;
  selectedChoice = new FormData(vote).get('proposal');
  document.querySelector('#chosen').textContent = selectedChoice;
  document.querySelector('#confirmation-text').textContent =
    'Confira sua escolha. Ao confirmar, seu voto será enviado diretamente e você permanecerá nesta página.';
  confirmButton.hidden = false;
  confirmButton.disabled = false;
  confirmButton.textContent = 'CONFIRMAR MEU VOTO';
  backButton.hidden = false;
  status.textContent = '';
  confirmation.hidden = false;
  confirmation.focus();
  confirmation.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

confirmButton.addEventListener('click', async () => {
  if (!selectedChoice || sending) return;
  sending = true;
  confirmButton.disabled = true;
  backButton.disabled = true;
  confirmButton.textContent = 'Enviando voto…';
  status.textContent = 'Registrando seu voto. Aguarde…';
  try {
    const body = new URLSearchParams({ voto: selectedChoice });
    await fetch(config.endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body
    });
    document.querySelector('#confirmation-text').textContent =
      'Obrigado por participar da consulta da nossa comunidade.';
    status.textContent = 'Voto enviado com sucesso!';
    confirmButton.hidden = true;
    backButton.hidden = true;
    vote.querySelectorAll('input, button').forEach(el => el.disabled = true);
  } catch (error) {
    status.textContent =
      'Não foi possível enviar o voto. Verifique sua conexão e tente novamente.';
    confirmButton.disabled = false;
    backButton.disabled = false;
    confirmButton.textContent = 'TENTAR NOVAMENTE';
  } finally {
    sending = false;
  }
});

backButton.addEventListener('click', () => {
  confirmation.hidden = true;
  const checked = document.querySelector('input:checked');
  if (checked) checked.focus();
});
