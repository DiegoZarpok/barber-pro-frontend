const horarios = {
    weekday: { inicio: "08:00", fim: "17:00" },
    saturday: { inicio: "08:30", fim: "12:00" }
};

let agendamentos = [];

// Atualiza preços (opcional)
document.getElementById("servico").addEventListener("change", function () {
    let valor = this.options[this.selectedIndex].dataset.valor;
});

// Executa quando escolher uma data
document.getElementById("data").addEventListener("change", carregarHorarios);

// ---------------------
// GERAR HORÁRIOS DISPONÍVEIS
// ---------------------
function carregarHorarios() {
    let dataSelecionada = document.getElementById("data").value;
    if (!dataSelecionada) return;

    let data = new Date(dataSelecionada);
    let day = data.getDay();
    let select = document.getElementById("horario");
    select.innerHTML = "";

    let cfg =
        day >= 1 && day <= 5 ? horarios.weekday :
        day === 6 ? horarios.saturday : null;

    if (!cfg) {
        select.innerHTML = "<option>Fechado</option>";
        return;
    }

    let [hInicio, mInicio] = cfg.inicio.split(":").map(Number);
    let [hFim, mFim] = cfg.fim.split(":").map(Number);

    let horaAtual = new Date();
    horaAtual.setHours(hInicio, mInicio, 0);

    let horaFinal = new Date();
    horaFinal.setHours(hFim, mFim, 0);

    while (horaAtual <= horaFinal) {
        let h = horaAtual.toTimeString().slice(0, 5);

        let ocupado = agendamentos.some(
            a => a.data === dataSelecionada && a.hora === h
        );

        if (!ocupado) {
            select.innerHTML += `<option value="${h}">${h}</option>`;
        }

        horaAtual.setMinutes(horaAtual.getMinutes() + 30);
    }
}

// ---------------------
// AGENDAR
// ---------------------
function agendar() {
    let nome = document.getElementById("nome").value;
    let servico = document.getElementById("servico").value;
    let valor = document.getElementById("servico").selectedOptions[0].dataset.valor;
    let data = document.getElementById("data").value;
    let hora = document.getElementById("horario").value;

    if (!nome || !servico || !data || !hora) {
        alert("Preencha todos os campos!");
        return;
    }

    agendamentos.push({ nome, servico, valor, data, hora });
    listarAgendamentos();
    carregarHorarios();
}

// ---------------------
// LISTAR AGENDAMENTOS
// ---------------------
function listarAgendamentos() {
    let box = document.getElementById("lista");
    box.innerHTML = "";

    agendamentos.forEach((a, index) => {
        box.innerHTML += `
            <div class="agendamento-item">
                <strong>${a.nome}</strong> — ${a.servico}
                <br>Horário: ${a.hora} | Data: ${a.data}
                <br>Valor: R$ ${a.valor}

                <button onclick="cancelarAgendamento(${index})" class="cancelar-btn">
                    Cancelar
                </button>
            </div>
        `;
    });
}

// ---------------------
// CANCELAR
// ---------------------
function cancelarAgendamento(index) {
    agendamentos.splice(index, 1);
    listarAgendamentos();
    carregarHorarios();
}
