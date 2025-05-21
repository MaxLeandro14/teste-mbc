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

        if (userType === 'PF') {       
            console.log('Dados pessoa fisíca: ', name, email, birthDate, cpf, phoneNumber)   
            return res.status(201).json( { message: 'Usuário (PF) cadastrado com sucesso!' });
        }

        if (userType === 'PJ') {
            console.log('Dados pessoa jurídica: ', companyName, email, foundationDate, cnpj, phoneNumber)   

            return res.status(201).json( { message: 'Empresa (PJ) cadastrada com sucesso!' });
        }

        return res.status(400).json({ message: 'Erro no cadastro' });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        return res.status(500).json({ 
            message: 'Erro interno no servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

