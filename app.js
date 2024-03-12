class Despesas {
    constructor(ano, mes, dia,tipo,descricao,valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(Let (i) in this) {
            if(this[i] == underfined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}


class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('ide', 0)
        }
    }

    getPrximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getPrximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }


    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1, i = id; i++) {

            //recuperar despesa 
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver indices que foram pulados/removidos
            //nestes casos nós vamos pular esses indices
            if(despesa === null) {
                continue
            }
            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesas) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.Log(despesasFiltradas);
        console.Log(despesa)

        //ano
        if(despesa.ano != '') {
            console.Log("filtro de ano");
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != '') {
            console.Log("filtro de mes");
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if(despesa.dia != '') {
            console.Log("filtro de dia");
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if(despesa.tipo != '') {
            console.Log("filtro de tipo");
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricao
        if(despesa.descricao != '') {
            console.Log("filtro de descricao");
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if(despesa.valor != '') {
            console.Log("filtro de valor");
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas

    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesas() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


    if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-sucess'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-sucess'

        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        
        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(despesa = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }

    /*
   
    <tr>
        <td>15/03/2018</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>444.75</td>
    </tr>

    */

    let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d){

        //Criando a linha (tr)
        var linha = listaDespesas.insertRow();

        //Criando as colunas (td)
        linhas.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //Ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(1).innerHTML = d.descricao
        linha.insertCell(1).innerHTML = d.valor


        //Criar o botão de exclusão
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa fa-times"  ></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','')
            //alert(id)
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        console.log(d)
    })

}

function pesquisarDespesas(){

    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    let despesa = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)
}
