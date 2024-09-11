class RecintosZoo {

    constructor() {
        this.animais = {
            leao:{tamanho: 3, bioma: 'savana'},
            leopardo:{tamanho: 2, bioma:'savana'},
            crocodilo:{tamanho: 3, bioma:'rio'},
            macaco:{tamanho: 1, bioma:['savana', 'floresta']},
            gazela:{tamanho: 2, bioma:'savana'},
            hipopotamo:{tamanho: 4, bioma:['savana', 'floresta']}
        }

        this.recintos = {
            
        }
        
    }
    

    analisaRecintos(animal, quantidade) {
        if(!this.animais.hasOwnProperty(animal)){
            return {
                erro: "Animal inválido"
              }
        }
    }

}

export { RecintosZoo as RecintosZoo };
