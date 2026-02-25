let presenteSelecionado = "";
let valorSelecionado = 0;

const botoes = document.querySelectorAll(".btn-presentear");
const pagamentoSection = document.getElementById("pagamento");
const presenteEscolhido = document.getElementById("presenteEscolhido");
const valorEscolhido = document.getElementById("valorEscolhido");
const btnPagar = document.getElementById("btnPagar");

botoes.forEach(botao => {
    botao.addEventListener("click", function () {
        const card = botao.parentElement;
        presenteSelecionado = card.querySelector("h3").innerText;
        valorSelecionado = card.querySelector("span").dataset.valor;

        presenteEscolhido.innerText = presenteSelecionado;
        valorEscolhido.innerText = "R$ " + valorSelecionado;

        pagamentoSection.classList.remove("hidden");
        pagamentoSection.scrollIntoView({ behavior: "smooth" });
    });
});

btnPagar.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/createPreference", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                presente: presenteSelecionado,
                valor: valorSelecionado
            })
        });

        const data = await response.json();

        if (!data.init_point) {
            alert("Erro ao iniciar pagamento");
            return;
        }

        window.location.href = data.init_point;

    } catch (err) {
        alert("Erro de conexão com o servidor");
        console.error(err);
    }
});

// =========================
// RSVP FORM HANDLING
// =========================
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const presenca = document.getElementById("presenca").value;
        const quantidade = document.getElementById("quantidade").value;

        if (!nome || !presenca) {
            alert("Por favor, preencha seu nome e escolha sua presença.");
            return;
        }

        // Exemplo de envio para servidor poderia ser adicionado aqui
        // fetch('/api/rsvp', { method: 'POST', body: ... });

        // Feedback para o usuário
        alert(`Obrigado, ${nome}! Sua resposta foi registrada.`);

        // se estiver indo, mostrar lista de presentes
        if (presenca === "sim") {
            const presentesSection = document.getElementById("presentes");
            if (presentesSection) {
                presentesSection.classList.remove("hidden");
                presentesSection.scrollIntoView({ behavior: "smooth" });
            }
        }

        // opcional: esconder o formulário/etapa
        const rsvpSection = document.getElementById("rsvp");
        if (rsvpSection) {
            rsvpSection.classList.add("hidden");
        }
    });
}
