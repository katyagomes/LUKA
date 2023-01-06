var FrmAutentica = document.getElementById('FrmAutentica')
var FrmAutenticaTitulo = document.getElementById('FrmAutenticaTitulo')

var Registrar = document.getElementById('Registrar')
var Acessar = document.getElementById('Acessar')

var Logado = document.getElementById('Logado')
var UsuarioLogadoTitulo = document.getElementById('UsuarioLogadoTitulo')

var VerificaEmail = document.getElementById('VerificaEmail')
var EnviaVerificaEmail = document.getElementById('EnviaVerificaEmail')

var carregando = document.getElementById("carregando")
var ImgUsuario = document.getElementById('ImgUsuario')
var FrmCliente = document.getElementById('FrmCliente')
var filtro = document.getElementById('filtro')
    // Simplifica a exibição de elementos da página
function MostraItem(element) {
    element.style.display = 'block'
}

// Simplifica para ocultar  elementos na página
function OcultaItem(element) {
    element.style.display = 'none'
}

//Alterar o fomulário de autenticação para o de cadastros novos.
function RealizarCadastro() {
    FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Cadastrar uma conta'
    FrmAutenticaTitulo.innerHTML = 'Insira seus dados para se cadastrar'
    OcultaItem(Registrar)
    MostraItem(Acessar)
}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function RealizarAcesso() {
    FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Acessar'
    FrmAutenticaTitulo.innerHTML = 'Acesse a sua conta para continuar'
    OcultaItem(Acessar)
    MostraItem(Registrar)
}


//objeto para redicionar a página ao verificar e-mail
var atualizarUrl = {
    url: 'http://127.0.0.1:5500/'
}



























/*var Registrar = document.getElementById('Registrar')
var Acessar = document.getElementById('Acessar')
var UsuarioLogadoTitulo  = document.getElementById('UsuarioLogadoTitulo')
var EnviaVerificaEmail = document.getElementById('EnviaVerificaEmail')
var VerificaEmail = document.getElementById('VerificaEmail')
var AcessarGoogle = document.getElementById('AcessarGoogle')
var ImgUsuario = document.getElementById('ImgUsuario')
var FrmCidade = document.getElementById('FrmCidade')
var ulListaCidades = document.getElementById('ulListaCidades')
var ContaCidade = document.getElementById('ContaCidade')
var ListaCidades = document.getElementById('ListaCidades')
var filtro = document.getElementById('filtro')
var TituloFormCidade = document.getElementById('TituloFormCidade')


var atualizarUrl = {
   url: 'http://127.0.0.1:5500'
}


function MostraItem(element){
   element.style.display = 'block'
}

function OcultaItem(element){
   element.style.display = 'none'
}


function RealizarCadastro(){
   FrmAutentica.FrmAutenticaSubmit.innerHTML='Cadastrar uma conta'
   FrmAutenticaTitulo.innerHTML='Insira seus dados para se cadastrar'
   OcultaItem(Registrar)
   OcultaItem(AcessarGoogle)
   MostraItem(Acessar)
   
}

function RealizarAcesso(){
   FrmAutentica.FrmAutenticaSubmit.innerHTML='Acessar'
   FrmAutenticaTitulo.innerHTML='Acesse sua conta para continuar'
   OcultaItem(Acessar)
   MostraItem(AcessarGoogle)
   MostraItem(Registrar)
}*/