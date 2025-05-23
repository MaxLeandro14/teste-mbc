export const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            userType,
            birthDate,
            cpf,
            phoneNumber,
            companyName,
            cnpj,
            foundationDate
        } = req.body;


        if (!userType) {
            return res.status(400).json({ message: 'O tipo de usuário (PF ou PJ) é obrigatório.' });
        }

        if (userType === 'PF') {
            if (!name || !email || !password || !birthDate || !cpf || !phoneNumber) {
                return res.status(422).json({ message: 'Todos os campos de pessoa física são obrigatórios.' });
            }

            console.log('Pessoa Física cadastrada:', { name, email, birthDate, cpf, phoneNumber });
            return res.status(201).json({ message: 'Usuário (Pessoa Física) cadastrado com sucesso!' });
        }

        if (userType === 'PJ') {
            if (!companyName || !email || !password || !foundationDate || !cnpj || !phoneNumber) {
                return res.status(422).json({ message: 'Todos os campos de pessoa jurídica são obrigatórios.' });
            }

            console.log('Pessoa Jurídica cadastrada:', { companyName, email, foundationDate, cnpj, phoneNumber });
            return res.status(201).json({ message: 'Empresa (Pessoa Jurídica) cadastrada com sucesso!' });
        }

        return res.status(400).json({ message: 'Tipo de usuário inválido. Use "PF" ou "PJ".' });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        return res.status(500).json({
            message: 'Erro interno no servidor'
        });
    }
};
