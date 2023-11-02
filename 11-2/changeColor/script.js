let element = document.getElementById("myDiv");
element.style.backgroundColor = 'Red';

element.addEventListener('click', () => {
    if (element.style.backgroundColor == 'green') {
        element.style.backgroundColor = 'red';
    }
    else element.style.backgroundColor = 'green';
});