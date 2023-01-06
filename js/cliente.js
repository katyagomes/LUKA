FrmCliente.onsubmit = function(event) {
    event.preventDefault()

    if (TituloFormCliente.innerHTML == "Cadastrar um novo Cliente") {



        if (FrmCliente.cli_nome.value == '') {
            alert("O nome do cliente não pode ser em branco!")
            FrmCidade.cli_nome.focus();
        } else if (FrmCliente.cli_endereco.value == '') {
            alert("O campo endereço não pode ser em branco!")
            FrmCliente.cli_endereco.focus();
        } else if (FrmCliente.cli_cpf.value == '') {
            alert("O campo CPF não pode ser em branco!")
            FrmCliente.cli_cpf.focus();
        } else if (FrmCliente.cli_fone.value == '') {
            alert("O campo Telefone não pode ser em branco!")
            FrmCliente.cli_fone.focus();
        } else {
            firebase.firestore().collection('CLIENTE').add({
                    Nome: FrmCliente.cli_nome.value,
                    NomeMinusculo: FrmCliente.cli_nome.value.toLowerCase(),
                    Endereco: FrmCliente.cli_endereco.value,
                    Cpf: FrmCliente.cli_cpf.value,
                    Fone: FrmCliente.cli_fone.value
                })
                .then((docRef) => {
                    console.log('Cliente cadastrado com ID: ', docRef.id);
                    alert('Cliente Cadastrado com sucesso.')
                    FrmCliente.cli_nome.value = ''
                    FrmCliente.cli_endereco.value = ''
                    FrmCliente.cli_cpf.value = ''
                    FrmCliente.cli_fone.value = ''
                })
                .catch((error) => {
                    console.error('Erro ao adicionar um documento: ', error);
                });
        }
    } else {
        var confirmation = confirm('Confirma a alteração dos dados?')
        if (confirmation) {
            firebase.firestore().collection('CLIENTE').doc(updateKey).update({
                Nome: FrmCliente.cli_nome.value,
                NomeMinusculo: FrmCliente.cli_nome.value.toLowerCase(),
                Endereco: FrmCliente.cli_endereco.value,
                CPF: FrmCliente.cli_cpf.value,
                Fone: FrmCliente.cli_fone.value
            }).then(function() {
                alert('Registro alterado com sucesso.')
            }).catch(function(error) {
                console.log('Falha ao alterar os dados: ', error)
            })
        }
        cancelaUpdate()
    }
}

function listaCliente() {
    firebase.firestore().collection('CLIENTE')
        .orderBy('Nome').onSnapshot(function(dataSnapshot) {
            geralistaCliente(dataSnapshot)
        })
    filtro.onkeyup = function() {
        if (filtro.value != '') {
            var TextoFiltro = filtro.value.toLowerCase()
            firebase.firestore().collection('CLIENTE')
                .orderBy('NomeMinusculo').startAt(TextoFiltro).endAt(TextoFiltro + '\uf8ff')
                .get().then(function(dataSnapshot) {
                    console.log(dataSnapshot)
                    geralistaCliente()(dataSnapshot)
                })
        } else {
            firebase.firestore().collection('CLIENTE')
                .orderBy('Nome').onSnapshot(function(dataSnapshot) {
                    geralistaCliente(dataSnapshot)
                })
        }
    }
}

function geralistaCliente(dataSnapshot) {
    ulListaCliente.innerHTML = ''
    var num = dataSnapshot.size

    ContaCliente.innerHTML = 'Total de registros: ' + num + (num > 1 ? ' clientes' : ' cliente') + '.'
    dataSnapshot.forEach(function(item) {
        var value = item.data()

        var li = document.createElement('li')

        li.id = item.id

        var spanLi = document.createElement('span')
        spanLi.appendChild(document.createTextNode("Nome: " + value.Nome + "__" + value.Endereco + " __ " + value.Cpf + "__ " + value.Fone + "__ "))

        li.appendChild(spanLi)

        var liUpdateBtn = document.createElement('button')
        liUpdateBtn.appendChild(document.createTextNode('Alterar'))
        liUpdateBtn.setAttribute('onclick', 'alteraCliente(\"' + item.id + '\")')


        liUpdateBtn.setAttribute('class', 'CorBotaoDeletarAlterar')

        liUpdateBtn.setAttribute('onclick', 'alteraCliente(\"' + item.id + '\")')



        li.appendChild(liUpdateBtn)


        var liRemoveBtn = document.createElement('button')
        liRemoveBtn.appendChild(document.createTextNode('Excluir'))

        liRemoveBtn.setAttribute('class', 'CorBotaoDeletarExlcuir')


        liRemoveBtn.setAttribute('type', 'button')

        liRemoveBtn.setAttribute('onclick', 'excluiCliente(\"' + item.id + '\")')

        li.appendChild(liRemoveBtn)

        ulListaCliente.appendChild(li)
    })
}

function excluiCliente(key) {
    var NomeCliente = document.querySelector('#' + key + ' > span')
    var confirmation = confirm('Realmente deseja remover o cliente \"' + NomeCliente.innerHTML + '\"?')

    if (confirmation) {
        firebase.firestore().collection('CLIENTE').doc(key).delete().then(function() {
            alert('Cliente"' + NomeCliente.innerHTML + '"removido com sucesso.')
        }).catch(function(error) {
            console.log('Falha ao remover tarefa: ', error)
        })
    }

}

var updateKey = null

function alteraCliente(key) {
    updateKey = key
    firebase.firestore().collection('CLIENTE').doc(key).get().then(function(dados) {
        if (dados.exists) {
            var cid = dados.data()
            FrmCliente.cli_nome.value = cid.Nome
            FrmCliente.cli_endereco.value = cid.Estado
            FrmCliente.cli_cpf.value = cid.Pais
            FrmCliente.cli_fone.value = cid.Fone


            TituloFormCliente.innerHTML = 'Editar cliente: ' + cli.Nome
            OcultaItem(FrmBtnCidadeGravar)
            MostraItem(FrmBtnAlterar)

        }
    })
}

function cancelaUpdate() {
    TituloFormCliente.innerHTML = 'Cadastrar um novo Cliente'
    OcultaItem(FrmBtnAlterar)
    MostraItem(FrmBtnClienteGravar)
    FrmBtnClienteGravar.style.display = 'inicial'
    FrmCliente.cli_nome.value = ''
    FrmCliente.cli_endereco.value = ''
    FrmCliente.cli_cpf.value = ''
    FrmCliente.cli_fone.value = ''
}