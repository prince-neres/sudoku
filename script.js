let sudoku
let erros = 0

// Botões de dificuldades
if($('.facil').on('click', () => {
    inicia(facil)
}))

if($('.medio').on('click', () => {
    inicia(medio)
}))

if($('.dificil').on('click', () => {
    inicia(dificil)
}))

if($('.impossivel').on('click', () => {
   inicia(impossivel)
}))

// Inicia com a dificuldade escolhida
function inicia(dificuldade) {
    reset()
    erros = 0
    sudoku = dificuldade
    $('.erros').text(`Erros: ${erros}`)
    criaGrade()
}

// Cria a grade
function criaGrade() {
    $(document).ready(
        function () {
            for (let i = 0; i < 9; i++) {
                let tr = $('<tr>')
                for (let j = 0; j < 9; j++) {
                    let input = $(`<input type="number" id="c${i}${j}" value="${sudoku[i][j]}">`)
                    let td = $('<td>')
                    td.append(input)
                    tr.append(td)
                    input.on('input', () => (detectaAlt(input)))
                }
                $('.grade').append(tr)
            }
        }
    )
}

// Detecta alterações no input
function detectaAlt(element) {
    let lin = element.attr('id')[1];
    let col = element.attr('id')[2];
    let val = element.val();

    if (jogadaValida(lin, col, val)) {
        element.css('border-color', 'green')
        sudoku[lin][col] = val
        if (fimDeJogo()) {
            $('.erros').text(`Parabéns você terminou o jogo com: ${erros} erros`)
        }
    } else {
        element.css('border-color', 'red')
        if(val != "") {
            mostraErros()
        }
    } 
}

// Verifica se a jogada for válida ou não
function jogadaValida(linha, coluna, valor) {
    for (var i = 0; i < 9; i++) {
        if (sudoku[i][coluna] == valor || sudoku[linha][i] == valor) {
            return false
        }
    }
    for (var i = Math.floor(linha / 3) * 3; i < Math.floor(linha / 3) * 3 + 3; i++) {
        for (var j = Math.floor(coluna / 3) * 3; j < Math.floor(coluna / 3) * 3 + 3; j++) {
            if (sudoku[i][j] == valor) {
                return false
            }
        }
    }
    if (parseInt(valor) < 1 || parseInt(valor) > 9) {
        return false
    }
    return true
}

// Verifica se todos os campos estão preenchidos
function fimDeJogo() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == '') {
                return false
            }
        }
    }
    return true
}

// Mostrar erros encima da grade
function mostraErros() {
    erros++
    $('.erros').text(`Erros: ${erros}`)
}

//Limpa tela
function reset() {
    $('.grade').html('');
}

// Navegação dentro da página
$('#sobre').on('click', () => {
    $(".jogo").fadeOut(0);
    $('.sobre').fadeIn()
})

$('#jogo').on('click', () => {
    $(".jogo").fadeIn();
    $('.sobre').fadeOut(0)
})

// Arrays de diferentes dificuldades para as grades
let facil = [
    ['','','5','','','2','','','6'],
    ['4','','','','','','','',''],
    ['3','6','','8','9','','5','1','4'],
    ['6','9','','','','8','','',''],
    ['5','','3','7','','1','2','','9'],
    ['','','','5','','','','8','7'],
    ['2','4','6','','7','3','','5','8'],
    ['','','','','','','','','3'],
    ['8','','','2','','','7','','']
]

let medio = [
    ['','','','','','','','',''],
    ['8','','','','2','','','','5'],
    ['','','','','','6','2','4',''],
    ['','3','8','','','7','1','',''],
    ['2','','4','','','','3','','9'],
    ['','','7','4','','','5','2',''],
    ['','7','2','5','','','','',''],
    ['6','','','','8','','','','1'],
    ['','','','','','','','','']
]

let dificil = [
    ['','9','','','1','','','',''],
    ['','','','','2','','','','6'],
    ['','','1','9','','','8','2','4'],
    ['','','5','','','','','1','7'],
    ['','','','4','3','7','','',''],
    ['4','6','','','','','9','',''],
    ['9','4','3','','','5','2','',''],
    ['2','','','','9','','','',''],
    ['','','','','4','','','3','']
]

let impossivel = [
    ['','','','7','','','','',''],
    ['1','','','','','','','',''],
    ['','','','4','3','','2','',''],
    ['','','','','','','','','6'],
    ['','','','5','','9','','',''],
    ['','','','','','','4','1','8'],
    ['','','','','8','1','','',''],
    ['','','2','','','','','5',''],
    ['','4','','','','','3','','']
]