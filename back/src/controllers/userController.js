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
            return res.status(400).json({ message: 'Tipo de usuário é obrigatório.' });
        }

        if (userType === 'PF') {
            if (!name || !email || !birthDate || !cpf || !phoneNumber) {
                return res.status(422).json({ message: 'Dados incompletos para pessoa física.' });
            }

            console.log('Dados pessoa física:', name, email, birthDate, cpf, phoneNumber);
            return res.status(201).json({ message: 'Usuário (PF) cadastrado com sucesso!' });
        }

        if (userType === 'PJ') {
            if (!companyName || !email || !foundationDate || !cnpj || !phoneNumber) {
                return res.status(422).json({ message: 'Dados incompletos para pessoa jurídica.' });
            }

            console.log('Dados pessoa jurídica:', companyName, email, foundationDate, cnpj, phoneNumber);
            return res.status(201).json({ message: 'Empresa (PJ) cadastrada com sucesso!' });
        }

        return res.status(400).json({ message: 'Tipo de usuário inválido.' });

    } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({ 
            message: 'Erro interno no servidor'
        });
    }
};
