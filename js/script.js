// ================== ELEMENTOS ==================
const rsvpForm = document.getElementById("rsvpForm");
const presentesSection = document.getElementById("presentes");
const pagamentoSection = document.getElementById("pagamento");

const presenteEscolhidoEl = document.getElementById("presenteEscolhido");
const valorEscolhidoEl = document.getElementById("valorEscolhido");
const btnPagar = document.getElementById("btnPagar");

let presenteSelecionado = "";
let valorSelecionado = 0;

// ================== ETAPA 1 → ETAPA 2 ==================
rsvpForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const presenca = document.getElementById("presenca").value;

    if (!nome || !presenca) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (presenca === "nao") {
        alert("Sentiremos sua falta ❤️");
        return;
    }

    // Libera a lista de presentes
   presentesSection.style.display = "block";
presentesSection.classList.remove("hidden");
presentesSection.classList.add("ativa");


setTimeout(() => {
    presentesSection.scrollIntoView({ behavior: "smooth" });
}, 200);
}); // <-- Adiciona o fechamento da função do submit

// ================== ETAPA 2 → ETAPA 3 ==================
document.querySelectorAll(".btn-presentear").forEach((botao) => {
    botao.addEventListener("click", function () {
        const card = this.closest(".gift-card");
        const nomePresente = card.querySelector("h3").innerText;
        const valor = card.querySelector("span").dataset.valor;

        presenteSelecionado = nomePresente;
        valorSelecionado = valor;

        presenteEscolhidoEl.innerText = `🎁 Presente escolhido: ${nomePresente}`;
        valorEscolhidoEl.innerText = `Valor: R$ ${valor},00`;

        // LIBERA PAGAMENTO (VISUAL + CLIQUE)
        pagamentoSection.classList.remove("hidden");
        pagamentoSection.classList.add("ativa");

        setTimeout(() => {
            pagamentoSection.scrollIntoView({ behavior: "smooth" });
        }, 200);
    });
});


        // Libera pagamento
        pagamentoSection.classList.remove("hidden");
        pagamentoSection.scrollIntoView({ behavior: "smooth" });


// ================== BOTÃO PAGAR ==================
btnPagar.addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/api/createPreference", {
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
        alert("Erro de conexão");
    }
});


