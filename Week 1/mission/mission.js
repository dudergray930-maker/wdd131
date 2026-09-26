let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        document.body.style.backgroundColor = '#222';
    document.body.style.color = '#fff';
    logo.src = 'images/byui-logo-dark.png';
    } else {
        document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#222';
    logo.src = 'images/byui-logo-blue.webp';
    }
}           
    
                    