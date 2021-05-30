// GLOBAL
const inputArea = document.getElementById
('input-area');
const dataInput = document.getElementById
('data-input');
const inputNumber = document.getElementById
('input-number');
const spinContainer = document.getElementById('spin-container');
const dataOutput = document.getElementById('data-output');
const linkOutput = document.getElementById('link-output');
const copyLinkBtn = document.getElementById('copy-link-button');
let phoneNumber = inputNumber.value

//// SUBMIT NUMBER
function denyNumber() {
  inputArea.classList.toggle("error-animation")
  setTimeout(() => {
    inputArea.classList.toggle("error-animation")
  },1000)
}

function generateLink(num) {
  let wppLink = `https://api.whatsapp.com/send?phone=55${num}`;
  linkOutput.value = wppLink;
  dataInput.classList.toggle("invisible");
  spinContainer.classList.toggle("invisible");
  setTimeout(() => {
    spinContainer.classList.toggle("invisible");
    dataOutput.classList.toggle("invisible")
  },1000)
}

function submitNumber() {
  let phoneNumber = inputNumber.value.match(/\d+/g).join('');
  phoneNumber.length < 9 ? denyNumber() : generateLink(phoneNumber);
}

inputNumber.addEventListener('keyup', function(e){
  let key = e.which || e.keyCode;
  if (key == 13) { 
    submitNumber()
  }
});

/// OPEN NEW TAB
function newTab() {
  window.open(linkOutput.value);
}

/// GO BACK
function goBack() {
  dataInput.classList.toggle("invisible");
  dataOutput.classList.toggle("invisible");
  inputNumber.value = '';
  copyLinkBtn.innerHTML = `Copiar Link`
};

/// MASK NUMBER
const phoneModify = (value) =>  {
    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1')
}
const field = inputNumber.dataset.js
inputNumber.addEventListener('input', e => {
  e.target.value = phoneModify(e.target.value)
}, false)

/// COPY LINK
function copyLink() {
  linkOutput.select();
  linkOutput.setSelectionRange(0, 99999)
  document.execCommand('copy')
  copyLinkBtn.innerHTML = `&#10003; Copiado`
}