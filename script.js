function generateMatrix(start, end, mode, invF, invB) {
    let front = [], back = [];
    if (mode === 2) {
        for (let i = 0; i + start <= end; i += 2) { front.push(i + start); back.push(i + start + 1); }
    } else {
        let left = start, right = end;
        while (right > left) { front.push(right, left); back.push(left + 1, right - 1); left += 2; right -= 2; }
    }
    if (invF) front.reverse(); if (invB) back.reverse();
    return [front.join(', '), back.join(', ')];
}

function reverserBooklet(matn) {
    const toplam = matn.split(', ').map(Number)
    const juftliklar = []

    for (let i = 0; i < toplam.length; i += 2) {
        juftliklar.push([toplam[i], toplam[i + 1]])
    }
    juftliklar.reverse()
    return juftliklar.flat().join(', ')
}

const reverserNone = matn => matn.split(', ').reverse().join(', ')
const copyer = (btn, element) => btn.addEventListener('click', () => {if (element.value && element.value !== 'Natija kutilmoqda...') {navigator.clipboard.writeText(element.value).then(btn.innerText = 'Copyed', setTimeout(() => {btn.innerText = 'Copy'}, 5000))}})

const startInput = document.getElementById('start')
const endInput = document.getElementById('end')
const printButton = document.getElementById('print')
const modeSelect = document.getElementById('floatingSelect')
const reverseFront = document.getElementById('old-teskari-t')
const reverseBack = document.getElementById('ort-teskari-t')
const copyFront = document.getElementById('copy-front')
const copyBack = document.getElementById('copy-back')
const frontResult = document.getElementById('front')
const backResult = document.getElementById('back')

copyer(copyFront, frontResult); copyer(copyBack, backResult)

printButton.addEventListener('click', () => {
    if (!startInput.value || !endInput.value) {alert('Inputlarni to\'ldirishingizni so\'raymiz.');return}
    let oldi = parseInt(startInput.value)
    let orti = parseInt(endInput.value)
    if (oldi > orti) {alert('Malumotlarni to\'g\'ri kiritishingizni so\'raymiz.');return}
    const jami = orti - oldi +1
    if ((modeSelect.value == '1' && !(jami%4===0))) {
        alert('Sahifalar soni 4 ga bo\'linishi kerak.'); return
    } else if (modeSelect.value == '2' && !(jami%2===0)) {
        alert('Sahifalar soni 2 ga bo\'linishi kerak.'); return
    }
    
    [front, back] = generateMatrix(oldi, orti, parseInt(modeSelect.value), reverseFront.checked, reverseBack.checked,)
    frontResult.value = front
    backResult.value = back
})

reverseFront.addEventListener('click', () => {
    if (modeSelect.value == '1') {frontResult.value = reverserBooklet(frontResult.value)}
    else {frontResult.value = reverserNone(frontResult.value)}
})
reverseBack.addEventListener('click', () => {
    if (modeSelect.value == '1') {backResult.value = reverserBooklet(backResult.value)}
    else {backResult.value = reverserNone(backResult.value)}
})