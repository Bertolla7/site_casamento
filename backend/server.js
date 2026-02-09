const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
    access_token: 'SEU_ACCESS_TOKEN_AQUI'
});

// ROTA PARA CRIAR PAGAMENTO
app.post('/api/createPreference', async (req, res) => {
    const { presente, valor } = req.body;

    try {
        const preference = {
            items: [
                {
                    title: presente,
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: Number(valor)
                }
            ],
            back_urls: {
                success: 'http://localhost:3000/sucesso.html',
                failure: 'http://localhost:3000/erro.html',
                pending: 'http://localhost:3000/pendente.html'
            },
            auto_return: 'approved'
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ init_point: response.body.init_point });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao criar pagamento' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


