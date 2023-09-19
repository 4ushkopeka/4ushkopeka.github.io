function slides() {
    let buttons = Array.from(document.querySelectorAll('#helper-nav > button'));

    buttons[0].addEventListener('click', e => googleHandler(e));
    buttons[1].addEventListener('click', e => microsoftHandler(e));
    buttons[2].addEventListener('click', e => oracleHandler(e));

    let articles = Array.from(document.querySelectorAll('#articles > article'));

    function googleHandler(e) {
        if(!selectedHandler(e.target)) {
            visibilityHandler(articles[0]); 
        }
    }

    function microsoftHandler(e) {
        if(!selectedHandler(e.target)) {
            visibilityHandler(articles[1]); 
        }
    }

    function oracleHandler(e) {
        if(!selectedHandler(e.target)) {
            visibilityHandler(articles[2]); 
        }
    }

    function visibilityHandler(article) {
        for (const company of articles) {
            if(!company.isSameNode(article)) {
                company.classList.remove('visible');
                company.classList.add('invisible');
            }
        }
        
        article.classList.remove('invisible');
        article.classList.remove('hidden');
        article.classList.add('visible');
        
        
    }
    function selectedHandler(button) {
        let checkClass = false;
        if(!Array.from(button.classList).includes('selected')) {
            button.classList.add('selected');
            for (const btn of buttons) {
                if(!btn.isSameNode(button)) {
                    btn.classList.remove('selected');
                }
            }
        } else {
            checkClass = true;
        }
        return checkClass;
    }
    
    load();
}