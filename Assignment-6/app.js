
const inp = document.querySelector('#add');
const btn = document.querySelector('#btn');
const list = document.querySelector('#list');


btn.onclick = function (e) {

    const txt = inp.value;

    if (txt === " ") {
        alert("Please Write Something !!!");
    }
    else {
        const li = document.createElement('li');

        li.innerHTML = txt;
        list.append(li);
        inp.value = " ";

        var span = document.createElement("SPAN");
        var icon = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(icon);
        li.appendChild(span);

        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

};



