function grading(){
    load();
    let objArr = [];
    let barUpdates = 0;
    let quartiles = [];
    objectMaker(quartiles);
    let totalExam = 0;
    let totalCredits = 0;
    tableManipulation();

    function tableManipulation() {
      let exams = document.querySelectorAll('.exam');
      totalExam = exams.length; //!!!
      for (const exam of exams) {
        let obj = {};
        obj.exam = exam;  //cells
        obj.ec = null;  //cells
        obj.grade = null;  //cells
        let children = exam.parentElement.children.length;
        if(children<=3) {
            obj.ec = exam.parentElement.children[1];
            obj.grade = exam.parentElement.children[2];
        } else {
            obj.ec = exam.parentElement.children[3];
            obj.grade = exam.parentElement.children[4];
        }
        obj.quartile = quartileManipulation(obj);
        obj.exam.addEventListener('click', tdHandler, true);
        objArr.push(obj);
        totalCredits += Number(obj.ec.textContent);
      }
      
    }

    async function tdHandler(e){
        let grade = prompt(`Enter the grade for the ${e.target.textContent}. NOTE! You WILL NOT be able to change it later!`, 10);
        let currentObj = null;
        for (const exam of objArr) {
            if(exam.exam.isSameNode(e.target)) {
                currentObj = exam;
                break;
            }
        }
        if(grade!=null && grade>0 && grade<=10) {
            currentObj.exam.removeEventListener('click', tdHandler, true);
            currentObj.grade.textContent = Number(grade);

            quartiles[currentObj.quartile-1].grades.push(Number(grade));    
            currentObj.exam.style.pointerEvents = "none";
            await new Promise(r => setTimeout(r, 1000));
            currentObj.exam.classList.remove('exam');
            if(grade<5.5){
                currentObj.exam.style.backgroundColor = "rgba(253, 29, 29, 0.25)";
                quartiles[currentObj.quartile-1].examsFailed++;
            } else {
                currentObj.exam.style.backgroundColor = "rgb(51 255 0 / 25%)";

                let width = Number(currentObj.ec.textContent);
                currentObj.credits = Number(currentObj.ec.textContent);
                quartiles[currentObj.quartile-1].examsTaken++;
                quartiles[currentObj.quartile-1].creditsTaken+=Number(currentObj.ec.textContent);
                
                let bar = document.getElementsByClassName('progress')[0];
                barUpdates+=width;
                bar.style.width = (barUpdates*10/6).toString()+'%';
            }
            overviewHandler(currentObj);
        }
    }
    
    function quartileManipulation(obj) {
        let q = 0;
        if(Array.from(obj.exam.classList).includes('q1')){
            q = 1;
            quartiles[0].maxCredits+=Number(obj.ec.textContent);
            quartiles[0].maxTaken+=1;   
        } 
        else if(Array.from(obj.exam.classList).includes('q2')) {
            q = 2;
            quartiles[1].maxCredits+=Number(obj.ec.textContent);
            quartiles[1].maxTaken+=1;
        } 
        else if(Array.from(obj.exam.classList).includes('q3')) {
            q = 3;
            quartiles[2].maxCredits+=Number(obj.ec.textContent);
            quartiles[2].maxTaken+=1;
        } 
        else if(Array.from(obj.exam.classList).includes('q4')) {
            q = 4;
            quartiles[3].maxCredits+=Number(obj.ec.textContent);
            quartiles[3].maxTaken+=1;
        } else {
            q = 5;
            quartiles[4].maxCredits+=Number(obj.ec.textContent);
            quartiles[4].maxTaken+=1;
        }
        return q;
    }

    function overviewHandler(exam){
        let summaryCells = getOverviewQuartileCells(exam.quartile);
        let overallValues = overallHandler();
        let index = exam.quartile-1;
        summaryCells[0].textContent = `${quartiles[index].examsTaken}/${quartiles[index].maxTaken}`;
        summaryCells[1].textContent = `${quartiles[index].creditsTaken}/${quartiles[index].maxCredits}`;
        summaryCells[2].textContent = `${arrayHandler(quartiles[index].grades, 'avg')}`;
        document.querySelector('#overall > td:nth-child(2)').textContent = `${overallValues[0]}/${totalExam}`;
        document.querySelector('#overall > td:nth-child(3)').textContent = `${overallValues[1]}/${totalCredits}`;
        document.querySelector('#overall > td:nth-child(4)').textContent = `${overallValues[2]}`;
    }

    function getOverviewQuartileCells(quartile){
        let examTakenCell = null;
        let ecTakenCell = null;
        let avgGradeCell = null;
        if(quartile === 1) {
            examTakenCell = document.querySelector('#overview > tbody > tr:nth-child(1) > td:nth-child(2)');
            ecTakenCell = document.querySelector('#overview > tbody > tr:nth-child(1) > td:nth-child(3)');
            avgGradeCell = document.querySelector('#overview > tbody > tr:nth-child(1) > td:nth-child(4)');
        }
        else if(quartile === 2) {
            examTakenCell = document.querySelector('#overview > tbody > tr:nth-child(2) > td:nth-child(2)');
            ecTakenCell = document.querySelector('#overview > tbody > tr:nth-child(2) > td:nth-child(3)');
            avgGradeCell = document.querySelector('#overview > tbody > tr:nth-child(2) > td:nth-child(4)');
        }
        else if(quartile === 3) {
            examTakenCell = document.querySelector('#overview > tbody > tr:nth-child(3) > td:nth-child(2)');
            ecTakenCell = document.querySelector('#overview > tbody > tr:nth-child(3) > td:nth-child(3)');
            avgGradeCell = document.querySelector('#overview > tbody > tr:nth-child(3) > td:nth-child(4)');
        }
        else if(quartile === 4) {
            examTakenCell = document.querySelector('#overview > tbody > tr:nth-child(4) > td:nth-child(2)');
            ecTakenCell = document.querySelector('#overview > tbody > tr:nth-child(4) > td:nth-child(3)');
            avgGradeCell = document.querySelector('#overview > tbody > tr:nth-child(4) > td:nth-child(4)');
        } else {
            examTakenCell = document.querySelector('#overview > tbody > tr:nth-child(5) > td:nth-child(2)');
            ecTakenCell = document.querySelector('#overview > tbody > tr:nth-child(5) > td:nth-child(3)');
            avgGradeCell = document.querySelector('#overview > tbody > tr:nth-child(5) > td:nth-child(4)');
        }
        return [examTakenCell, ecTakenCell, avgGradeCell];
    }

    function arrayHandler(arr, key) {
        
        if(key === 'sum'){
            let sum = 0;
            for (const num of arr) {
                sum+=num;
            }
            return sum;
        }
        else if(key === 'avg'){
            let avg = 0;
            for (const num of arr) {
                avg+=num;
            }
            return (avg/arr.length).toFixed(1);
        }
    }

    function objectMaker(arr){
        for (let index = 0; index < 5; index++) {
            let quartile = {
                examsTaken:0,
                examsFailed:0,
                creditsTaken:0,
                grades: [],
                maxCredits:0,
                maxTaken:0
            };
            arr.push(quartile);
        }
    }

    function overallHandler(){
        let takenExams = 0;
        let takenCredits = 0;
        let totalExams = 0;
        let avgGrade = 0;
        for (const obj of quartiles) {
            totalExams+=(obj.examsTaken + obj.examsFailed);
            takenExams+=obj.examsTaken;
            takenCredits += obj.creditsTaken;
            avgGrade+=arrayHandler(obj.grades, 'sum');
        }
        return [takenExams, takenCredits, (avgGrade/totalExams).toFixed(1)];
    }
}