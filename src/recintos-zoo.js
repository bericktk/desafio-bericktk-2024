class RecintosZoo {
    constructor() {
        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana', carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: 'savana', carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: 'rio', carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: 'savana', carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        }
  
        this.recintos = [
            { Recinto: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
            { Recinto: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { Recinto: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: ['GAZELA'] },
            { Recinto: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { Recinto: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'] }
        ]
    }
  
    analisaRecintos(animal, quantidade) {
        const animalKey = animal.toUpperCase()
        if (!this.animais.hasOwnProperty(animalKey)) {
            return { erro: "Animal inválido" }
        }
  
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" }
        }
  
        const animalData = this.animais[animalKey]
        const recintosViaveis = this.recintos
            .filter(recinto => this.verificaRecinto(recinto, animalKey, quantidade, animalData))
            .map(recinto => {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a].tamanho, 0)
                const espacoNecessario = animalData.tamanho * quantidade
                const espacoExtra = recinto.animais.length > 0 && recinto.animais[0] !== animalKey ? 1 : 0
                const espacoLivre = recinto.tamanho - espacoOcupado - espacoNecessario - espacoExtra
                return {
                    ...recinto,
                    espacoLivre
                };
            })
            .sort((a, b) => b.espacoLivre - a.espacoLivre)
  
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" }
        }
  
        return {
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.Recinto} (espaço livre: ${r.espacoLivre} total: ${r.tamanho})`)
        }
    }
  
    verificaRecinto(recinto, animalKey, quantidade, animalData) {
        const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a].tamanho, 0)
        const espacoNecessario = animalData.tamanho * quantidade;
        const espacoExtra = recinto.animais.length > 0 && recinto.animais[0] !== animalKey ? 1 : 0
        const espacoLivre = recinto.tamanho - espacoOcupado - espacoExtra;
  
      
        if (espacoLivre < espacoNecessario) return false
  
     
        const biomaCompativel = Array.isArray(animalData.bioma)
            ? animalData.bioma.some(b => Array.isArray(recinto.bioma) ? recinto.bioma.includes(b) : recinto.bioma === b)
            : Array.isArray(recinto.bioma) ? recinto.bioma.includes(animalData.bioma) : recinto.bioma === animalData.bioma
        if (!biomaCompativel) return false
  
       
        if (animalData.carnivoro && recinto.animais.length > 0 && recinto.animais[0] !== animalKey) return false
        if (recinto.animais.length > 0 && this.animais[recinto.animais[0]].carnivoro && animalKey !== recinto.animais[0]) return false
  
     
        if (animalKey === 'HIPOPOTAMO' && (!Array.isArray(recinto.bioma) || !recinto.bioma.includes('savana') || !recinto.bioma.includes('rio'))) return false
  
    
        if (animalKey === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return false
  
        return true
    }
  }
  
  export { RecintosZoo as RecintosZoo }