function grading(){
    load();
    let objArr = [];
    let barUpdates = [];
    let q1, q2, q3, q4, more = {};
    let blocks = [q1, q2, q3, q4, more]
    tableManipulation();

    function tableManipulation(){
      let exams = document.querySelectorAll('.exam');
      for (const exam of exams) {
        let obj = {};
        obj.exam = exam;
        obj.ec = null;
        obj.grade = null;
        obj.block = null;
        let children = exam.parentElement.children.length;
        if(children<=3){
            obj.ec = exam.parentElement.children[1];
            obj.grade = exam.parentElement.children[2];
        }
        else{
            obj.ec = exam.parentElement.children[3];
            obj.grade = exam.parentElement.children[4];
        }
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
            currentObj.grade.textContent = Number(grade);
            currentObj.exam.style.pointerEvents = "none";
            await new Promise(r => setTimeout(r, 1000));
            currentObj.exam.classList.remove('exam');
            if(grade<5.5){
                currentObj.exam.style.backgroundColor = "rgba(253, 29, 29, 0.2)";
            }
            else{
                currentObj.exam.style.backgroundColor = "rgba(143, 253, 29, 0.2)";
                let bar = document.getElementsByClassName('progress')[0];
                let width = Number(currentObj.ec.textContent);
                barUpdates.push(width);
                bar.style.width = (Sum()*10/6).toString()+'%';
            }
        }
    }

    function Sum(){
        let sum = 0;
        for (const num of barUpdates) {
            sum+=num;
        }
        return sum;
    }
}