export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { presente, valor } = req.body;

    if (!presente || !valor) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                items: [
                    {
                        title: presente,
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: Number(valor)
                    }
                ],
                back_urls: {
                    success: "https://sitecasamento-nu.vercel.app/sucesso.html",
                    failure: "https://sitecasamento-nu.vercel.app/erro.html",
                    pending: "https://sitecasamento-nu.vercel.app/pendente.html"
                },
                auto_return: "approved"
            })
        });

        const data = await response.json();
        return res.status(200).json({ init_point: data.init_point });

    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar pagamento" });
    }
}
import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { presente, valor } = req.body;

    if (!presente || !valor) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
        const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                items: [
                    {
                        title: presente,
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: Number(valor)
                    }
                ],
                back_urls: {
                    success: "https://seusite.com/obrigado.html",
                    failure: "https://seusite.com/erro.html"
                },
                auto_return: "approved"
            })
        });

        const data = await response.json();
        return res.status(200).json({ init_point: data.init_point });

    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar pagamento" });
    }
}
    