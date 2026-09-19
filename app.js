const config = {
  endpoint: 'https://script.google.com/macros/s/AKfycbw7g2pc_jE0fJwHwbrv6EScI9NuzZ0JTKFoU2569ysCxS2DfSFzLEezia8rkN0xbFXPSQ/exec',
  storageKey: 'santuario-voto-enviado-v2'
};

const vote = document.querySelector('#vote');
const button = document.querySelector('#continue');
const confirmation = document.querySelector('#confirmation');
const confirmButton = document.querySelector('#confirm-vote');
const backButton = document.querySelector('#back');
const status = document.querySelector('#vote-status');
const selection = document.querySelector('#selection');
const modal = document.querySelector('#vote-modal');

let selectedChoice = null;
let sending = false;

function lockVoting(choice = '') {
  vote.querySelectorAll('input, button').forEach(el => el.disabled = true);
  document.querySelector('#chosen').textContent = choice || 'Participação registrada';
  document.querySelector('#confirmation-text').textContent =
    'Obrigado por participar da consulta da nossa comunidade.';
  status.textContent = '✓ Seu voto foi registrado.';
  status.className = 'success-message';
  confirmButton.hidden = true;
  backButton.hidden = true;
  confirmation.hidden = false;
  selection.textContent = 'Voto já registrado neste navegador.';

  modal.hidden = false;
  modal.querySelector('#modal-title').textContent = 'VOTO CONFIRMADO';
  modal.querySelector('#modal-choice').textContent = choice || 'Participação registrada';
  modal.querySelector('.modal-warning').textContent = '✓ Seu voto foi registrado com sucesso!';
  modal.querySelector('.modal-warning').className = 'modal-warning success-message';
  modal.querySelector('#modal-continue').hidden = true;
  modal.querySelector('#modal-change').hidden = true;
}

const previousVote = localStorage.getItem(config.storageKey);
if (previousVote) {
  lockVoting(previousVote);
}

vote.addEventListener('change', () => {
  if (localStorage.getItem(config.storageKey)) return;
  selectedChoice = new FormData(vote).get('proposal');
  button.disabled = !selectedChoice;
  selection.textContent = `Sua escolha: ${selectedChoice}`;
  confirmation.hidden = true;
  status.textContent = '';
  status.className = '';
  modal.hidden = false;
  modal.querySelector('#modal-title').textContent = 'Proposta selecionada';
  modal.querySelector('#modal-choice').textContent = selectedChoice;
  modal.querySelector('.modal-warning').textContent = 'ATENÇÃO: seu voto ainda NÃO foi enviado.';
  modal.querySelector('.modal-warning').className = 'modal-warning';
  modal.querySelector('#modal-continue').hidden = false;
  modal.querySelector('#modal-change').hidden = false;
  modal.querySelector('#modal-continue').focus();
});

vote.addEventListener('submit', event => {
  event.preventDefault();
  if (localStorage.getItem(config.storageKey)) return;
  if (!vote.reportValidity()) return;

  selectedChoice = new FormData(vote).get('proposal');
  document.querySelector('#chosen').textContent = selectedChoice;
  document.querySelector('#confirmation-text').textContent =
    'Confira sua escolha. Depois de confirmar, o voto será registrado e não poderá ser alterado neste navegador.';
  confirmButton.hidden = false;
  confirmButton.disabled = false;
  confirmButton.textContent = 'CONFIRMAR MEU VOTO';
  backButton.hidden = false;
  backButton.disabled = false;
  status.textContent = '';
  status.className = '';
  confirmation.hidden = false;
  confirmation.focus();
  confirmation.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

confirmButton.addEventListener('click', async () => {
  if (!selectedChoice || sending || localStorage.getItem(config.storageKey)) return;

  sending = true;
  confirmButton.disabled = true;
  backButton.disabled = true;
  confirmButton.textContent = 'Enviando voto…';
  status.textContent = 'Registrando seu voto. Aguarde…';
  status.className = 'sending-message';

  try {
    const body = new URLSearchParams({ voto: selectedChoice });

    await fetch(config.endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body
    });

    localStorage.setItem(config.storageKey, selectedChoice);
    lockVoting(selectedChoice);
  } catch (error) {
    status.textContent =
      'Não foi possível enviar o voto. Verifique sua conexão e tente novamente.';
    status.className = 'error-message';
    confirmButton.disabled = false;
    backButton.disabled = false;
    confirmButton.textContent = 'TENTAR NOVAMENTE';
  } finally {
    sending = false;
  }
});

document.querySelector('#modal-continue').addEventListener('click', () => {
  modal.hidden = true;
  button.focus();
});

document.querySelector('#modal-change').addEventListener('click', () => {
  modal.hidden = true;
  const checked = document.querySelector('input:checked');
  if (checked) checked.focus();
});

backButton.addEventListener('click', () => {
  confirmation.hidden = true;
  const checked = document.querySelector('input:checked');
  if (checked) checked.focus();
});
