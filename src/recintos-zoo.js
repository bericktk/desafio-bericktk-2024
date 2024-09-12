class RecintosZoo {

    constructor() {
        this.animais = {
            LEAO:{tamanho: 3, bioma: 'savana'},
            LEOPARDO:{tamanho: 2, bioma:'savana'},
            CROCODILO:{tamanho: 3, bioma:'rio'},
            MACACO:{tamanho: 1, bioma:['savana', 'floresta']},
            GAZELA:{tamanho: 2, bioma:'savana'},
            HIPOPOTAMO:{tamanho: 4, bioma:['savana', 'rio']}
        }

        this.recintos = [
            {Recinto: 1, bioma: 'savana', tamanho: 10, animais: ['macaco', 'macaco', 'macaco']},
            {Recinto: 2, bioma: 'floresta', tamanho: 5, animais:[]},
            {Recinto: 3, bioma:['savana', 'rio'], tamanho: 7, animais:['gazela']},
            {Recinto: 4, bioma: 'rio', tamanho: 8, animais:[]},
            {Recinto: 5, bioma: 'savana', tamanho: 9, animais: ['leão']},
        ]
        
    }
    

    analisaRecintos(animal, quantidade) {
        const animalKey = animal.toUpperCase()
        if(!this.animais.hasOwnProperty(animalKey)){
            return { erro: "Animal inválido"}
        }

        if(quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        const animalData = this.animais[animalKey]
        const recintosViaveis = this.recintos
        .filter(recinto => {
            const espacoNecessario = animalData.tamanho * quantidade
            const espacoLivre = recinto.tamanho - recinto.animais.length
            const biomaEhCompativel = Array.isArray(recinto.bioma)
                ? recinto.bioma.includes(animalData.bioma)
                : recinto.bioma === animalData.bioma

            return biomaEhCompativel && espacoLivre >= espacoNecessario
        })
        
        .sort((a, b) => {
            const espacoLivreA = a.tamanho - a.animais.length
            const espacoLivreB = b.tamanho - b.animais.length
            return espacoLivreB - espacoLivreA
        })

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false }
        }

        const melhorRecinto = recintosViaveis[0]
        const espacoLivreAtual = melhorRecinto.tamanho - melhorRecinto.animais.length
        const espacoNecessario = animalData.tamanho * quantidade
        const espacoLivreAposInsercao = espacoLivreAtual - espacoNecessario

        for (let i = 0; i < quantidade; i++) {
            melhorRecinto.animais.push(animalKey.toLowerCase())
        }

        return {
            recintosViaveis: [`Recinto ${melhorRecinto.Recinto} (espaço livre: ${espacoLivreAposInsercao} total: ${melhorRecinto.tamanho})`],
            erro: undefined
        }
    }

}

export { RecintosZoo as RecintosZoo };
