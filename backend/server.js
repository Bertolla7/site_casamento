import mercadopago from "mercadopago";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const preference = {
        items: [
            {
                title: "Presente Casamento",
                quantity: 1,
                unit_price: 120
            }
        ],
        back_urls: {
            success: "https://sitecasamento-nu.vercel.app/sucesso.html",
            failure: "https://sitecasamento-nu.vercel.app/erro.html",
            pending: "https://sitecasamento-nu.vercel.app/pendente.html"
        },
        auto_return: "approved"
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ id: response.body.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
        