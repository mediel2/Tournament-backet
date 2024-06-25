const form = document.querySelector('.type_member');
const button_add = document.querySelector('.add_member');
const button_clear = document.querySelector('.clear_list');
const list = document.querySelector(".list_table");
const button_next = document.querySelector('.next');
const button_acept = document.querySelector('.acept');
const button_back = document.querySelector('.back');
const member_div8 = document.querySelectorAll('.member_8');
const grid = document.querySelector('.grid');
const member_cell = document.querySelectorAll('.member');
const fcell_L = document.getElementById('L');
const fcell_R = document.getElementById('R');
const container_list = document.querySelector('.container_lists');
const container_grid = document.querySelector('.container_grid');
let cell_select = document.querySelectorAll('.select_member');

let membersArr = [];
let member = "";
let arrLength = 0;

button_add.onclick = sendMember;
button_clear.onclick = clearList;
button_next.onclick = fillSelect;
button_back.onclick = backToList;
button_acept.addEventListener('click', aceptSelect);
list.addEventListener("click", deleteMember);

//добавляем участников
function sendMember(event) {    
    event.preventDefault();    
    let val = form.value;
    if (val == '') {
        return
    } else {
        if (membersArr.length == 16) {
            alert ("Список заполнен!")
        } else {
            membersArr.push(val);
            member = val;
            let index = membersArr.indexOf(val);
            member_plus = `        
                <li class="list_cell">
                    <span class="member_name">${member}</span>
                    <button data-article="${index}" class="delete_member" data-action="delete">x</button>
                </li>        
            `;        
        list.innerHTML += member_plus;        
        }        
    }
    form.value = "";
}

//очистить список участников
function clearList() {
    membersArr = [];
    list.innerHTML = '';
    index = 0;
}

// удаляем одного участника
function deleteMember(event) {    
    if (event.target.dataset.action == "delete") {
        let article = event.target.dataset.article;
        const del = event.target.closest("li");
        del.remove();
        membersArr.splice(+article, 1);
    }    
}

//заполнить ячейки
function fillSelect() {
    if (membersArr.length < 16) {
        alert('Заполните список!')
    } else {
        cell_select.forEach((item_select) => {
            let num = 0;
            for (let i of membersArr) {
                i = membersArr[num];            
                let new_member = `<option data-value="${num}">${i}</option>`;
                item_select.innerHTML += new_member;
                num++;
            }
        })
        container_list.classList.add('hide');
        container_grid.classList.remove('hide');
    }    
}

//---------------------сетка участников---------------------

// подтвердить выбор
function aceptSelect() {
    member_div8.forEach((item) => {
        let cell = document.querySelector('.select_member');
        let index_cell = cell.selectedIndex;
        let value = cell.options;
        let text = value[index_cell].textContent;
        let name_par = item.dataset.action;
        item.innerHTML = `<span data-value="${name_par}" class="selected_name">${text}</span>`;
        item.classList.add('active');
    });
}

// вернуться к списку
function backToList() {
    member_cell.forEach((div_all) => {
        div_all.classList.remove('active');
        div_all.classList.remove('disable');
        div_all.classList.remove('prepear');
        div_all.innerHTML = '';
    })
    member_div8.forEach((div8) => {
        div8.classList.remove('active');
        div8.classList.remove('disable');
        div8.innerHTML = '<select class="select_member"></select>';
    })
    cell_select = document.querySelectorAll('.select_member');
    container_list.classList.remove('hide');
    container_grid.classList.add('hide');
}


// переместить участника на новый этап
let member_index = 4;

member_cell.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            let act = item.dataset.action;
            let val = item.dataset.value;
            let winner = document.querySelectorAll('.selected_name');
            let winnerName = "";
            winner.forEach((name) => {
                if (name.dataset.value == act) {
                    winnerName = name.textContent;
                }
            });            
            let parX = document.querySelectorAll(`.par${val}`);
            if (val < 9) {
                member_index = 4;              
            } else if (9 < val && val < 601) {
                
                member_index = 3;
            } else if (601 < val && val < 50001) {
                member_index = 2;
            } else if (val == 5000000 || val == 1000000) {
                member_index = 1;
            }                
            parX.forEach((item_par) => {
                item_par.classList.add('disable');
            });
            let parX2 = document.querySelectorAll(`.member_${member_index}`);
            parX2.forEach(item_par2 => {
                if (item_par2.dataset.action == item.dataset.value * 100) {
                    item_par2.classList.add('prepear');
                    item_par2.innerHTML = `
                        <span data-value="${item_par2.dataset.action}" class="selected_name">${winnerName}</span>
                    `;
                } else if (item.dataset.action == 5000000) {
                    item_par2.innerHTML = `
                        <span class="selected_name">${winnerName}</span>
                    `;
                    item_par2.classList.add('win');
                    fcell_L.classList.add('disable');
                } else if (item.dataset.action == 1000000) {
                    item_par2.innerHTML = `
                        <span class="selected_name">${winnerName}</span>
                    `;
                    item_par2.classList.add('win');
                    fcell_R.classList.add('disable');
                }                
            })
            parX2.forEach((item_parX2) => {
                if (item_parX2.classList.contains('prepear')) {
                    let pVal = item_parX2.dataset.value;
                    let pAct = item_parX2.dataset.action;
                    parX2.forEach((item_parX2N) => {
                        if (item_parX2N.classList.contains('prepear') && item_parX2N.dataset.action > pAct && item_parX2N.dataset.value == pVal) {
                            item_parX2.classList.add('active');
                            item_parX2N.classList.add('active');
                        } else if (fcell_L.classList.contains('prepear') && fcell_R.classList.contains('prepear')) {
                            fcell_L.classList.add('active');
                            fcell_R.classList.add('active');
                        }
                    })
                }
            })
        }
    })
})
