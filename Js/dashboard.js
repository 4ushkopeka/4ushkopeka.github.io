function grading(){
    load();
    let objArr = [];
    let barUpdates = [];
    tableManipulation();

    function tableManipulation(){
      let exams = document.querySelectorAll('.exam');
      for (const exam of exams) {
        let obj = {};
        obj.exam = exam;
        obj.ec = null;
        let children = exam.parentElement.children.length;
        if(children<=2){
            obj.ec = exam.parentElement.children[1];
        }
        else{
            obj.ec = exam.parentElement.children[3];
        }
        obj.grade = 0;
        obj.exam.addEventListener('click', tdHandler, true);
        objArr.push(obj);
      }
    }

    async function tdHandler(e){
        let grade = prompt(`Enter the grade for the ${e.target.textContent}. NOTE! You WILL NOT be able to change it later!`, 10);
        let currentObj = null;
        for (const exam of objArr) {
            if(exam.exam.isSameNode(e.target)){
                currentObj = exam;
                break;
            }
        }
        if(grade!=null){
            currentObj.exam.removeEventListener('click', tdHandler, true);
            currentObj.exam.grade = Number(grade);
            currentObj.exam.style.pointerEvents = "none";
            await new Promise(r => setTimeout(r, 1000));
            currentObj.exam.classList.remove('exam');
            if(grade<5.5){
                currentObj.exam.style.backgroundColor = "red";
            }
            else{
                currentObj.exam.style.backgroundColor = "green";
                let bar = document.getElementsByClassName('progress')[0];
                let width = Number(currentObj.ec.textContent);
                barUpdates.push(width);
                bar.style.width = (Sum(barUpdates)*10/6).toString()+'%';
            }
        }
    }
    function Sum(arr){
        let sum = 0;
        for (const num of barUpdates) {
            sum+=num;
        }
        return sum;
    }
}


