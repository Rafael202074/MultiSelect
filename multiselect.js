document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll("select[multiple]").forEach(elem => {
        let id = elem.id;
        let classe = elem.className;
        let estilo = elem.getAttribute('style');
        let pai = elem.parentNode;
        let opt = [];
        for (let i = 0; i < elem.options.length; i++) {
            let obj = {value: elem.options[i].value, text: elem.options[i].innerHTML};
            opt.push(obj);
        }
        elem.remove();
        let multiSelect = document.createElement('div');
        /* multiSelect.id = id; */
        multiSelect.classList = 'multipleSelect ' + classe;
        multiSelect.style = estilo;
        let first = document.createElement('option');
        first.id = id;
        first.classList = 'first';
        first.value = '[]';
        multiSelect.appendChild(first);
        let optionText = document.createElement('option');
        optionText.classList = 'optionText';
        optionText.value = '[]';
        optionText.hidden = true;
        multiSelect.appendChild(optionText);
        let options = document.createElement('div');
        options.id = 'options';
        for (let i = 0; i < opt.length; i++) {
            let op = document.createElement('option');
            if(opt[i].value != opt[i].innerHTML)
                op.value = opt[i].value;
            op.innerHTML = opt[i].text;
            options.appendChild(op);
        }
        multiSelect.appendChild(options);
        pai.appendChild(multiSelect);
    });

    document.addEventListener('click', function(e){
        if(e.path.indexOf(document.querySelector('.multipleSelect')) < 0){
            document.querySelector("#options").style.display = 'none';
            document.querySelector(".first").classList.remove('open');
        }
    });

    document.querySelector(".first").addEventListener('click', function(){
        if(document.querySelector("#options").style.display == 'block'){
            document.querySelector("#options").style.display = 'none';   
            this.classList.remove('open');
        }else{
            document.querySelector("#options").style.display = 'block';
            this.classList.add('open');
        }
    });

    document.querySelectorAll("#options > option").forEach(elem => {
        elem.addEventListener('click', function(){
            let add = 0;
            if(this.style.backgroundColor == 'rgb(2, 100, 174)'){
                this.style.backgroundColor = '';
                this.style.color = '';
            }else{
                this.style.backgroundColor = 'rgb(2, 100, 174)';
                this.style.color = 'white';
                add = 1;
            }
            let text = '';
            let optionText = JSON.parse(document.querySelector(".optionText").value);
            let json = JSON.parse(document.querySelector(".first").value);
            let index = json.length;
            for (let x = 0; x < json.length; x++) {
                if(json[x] == this.value){
                    index = x;
                }
            }
            if(add){
                json[index] = this.value;
                optionText[index] = this.textContent;
            }else{
                json.splice(index, 1);
                optionText.splice(index, 1);
            }
            for (let i = 0; i < optionText.length; i++) {
                if(i > 1){
                    text += ', '+ optionText[i] + ' ...'; 
                    break;
                }
                text += (i == 0 ? optionText[i] : ', '+optionText[i]);
            }
            document.querySelector(".first").textContent = text;
            document.querySelector(".first").value = JSON.stringify(json);
            document.querySelector(".optionText").value = JSON.stringify(optionText);
            document.querySelector(".first").dispatchEvent(new Event('change'));
        });
    });
});