/**
 * Método que faz uma requisição get
 * @param {*} theUrl - URL da requisição
 * 
 */
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * Método de envio do formulário
 * 
 */
var selectedRow = null
function onFormSubmit(){
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
        else
        updateRecord(formData);
    
    resetForm();    
}

/**
 * Método que le as informações nos inputs para montar o objeto de informações do usuário
 */
function readFormData() {
    var  formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["telephone"] = document.getElementById("telephone").value;
    formData["cpf"] = document.getElementById("cpf").value;

    return formData;
}

/**
 * Método que insere um novo registro na tabela
 * @param {*} data - objeto com as informações do usuário (objeto montado no método readFormData)
 * 
 */
function insertNewRecord(data) {
    var table = document.getElementById("tablelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.telephone;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cpf;
    cell4.innerHTML = `<a onClick="onEdit(this)" class="btn_edit">Editar</a>
                        <a onClick="onDelete(this)" class="btn_ed">Deletar</a>`;
}

/**
 * Método que limpa os inputs do formulário
 * 
 */
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("cpf").value = "";
}

/**
 * Método que possibilita a edição de dados
 * @param {*} td - linha a ser editada
 */
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("telephone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cpf").value = selectedRow.cells[3].innerHTML;
    
}

/**
 * Método que faz atualiza os dados editados
 * @param {*} formData - Objeto atualizado
 * 
 */
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.telephone;
    selectedRow.cells[3].innerHTML = formData.cpf;
}

/**
 * Método que delete uma row
 * @param {*} td - linha a ser deletada
 * 
 */
function onDelete(td) {
    if (confirm('Você tem certeza que deseja excluir esse registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tablelist").deleteRow(row.rowIndex);
        resetForm();
    } 
        
}

/**
 * Método form cpf 
 */

function mascara(i){

    var v = i.value;
 
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
 
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }