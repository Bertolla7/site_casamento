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

// helper: esconde o segmento de hero/overlay completo
function hideHero() {
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
        heroSection.classList.add("hidden");
    }

    // fallback: também garantir que qualquer overlay não bloqueie interações
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(o => {
        try {
            o.style.display = 'none';
            o.style.pointerEvents = 'none';
            o.style.opacity = '0';
        } catch (err) {
            // ignore
        }
    });
}
// RSVP removed: site shows presents by default
