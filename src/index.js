let modal2 = document.querySelector('.modal2');
let modal1 = document.querySelector('.modal1');
let main = document.querySelector('.main');
let newproj = document.querySelector('.newproj');


let newtask = document.querySelector('.newtask')

let input1,input2,done;
let projectdetails = document.querySelector('.projectdetails');
let nameval,detval;
let projects = []; //storing the projects

let projectlist = document.querySelector('.projectlist');
let tasklist = document.querySelector('.tasklist');
let currentproj = document.querySelector('.currentproj');

let title = document.querySelector('#title');
let duedate = document.querySelector('#duedate');
let priority = document.querySelector('input[name="priority"]:checked');
let describe = document.querySelector('#describe')
let submitask = document.querySelector('.submitask');
let listall = document.querySelectorAll('.listall');
let noa = Array.from(listall);


//Onclick of addproject:This displays the form and creates the input elements for project details
newproj.addEventListener('click',function(){
    modal2.style.display = 'block';
    let input1 = document.createElement('input');
    Object.assign(input1,{
        type:'text',
        id:'name',
        placeholder:'Proj name'
    })
    let input2 = document.createElement('input');
    Object.assign(input2,{
        type:'text',
        id:'detail',
        placeholder:'Proj det'
    }) 
    let doneb = document.createElement('button');
    Object.assign(doneb,{
        type:'button',
        id:'done',
        innerText: 'Done'
    })
    projectdetails.appendChild(input1);
    projectdetails.appendChild(input2)
    projectdetails.appendChild(doneb);
    

    /* listall = document.querySelectorAll('.listall');
    for(let i =0 ;i<listall.length;i++){
        listall[i].removeEventListener('click',thevent)
        alert('work');
    } */
   
    /*Onclick of done btn:collects input values,creates a new project using the project constructor,
        stores it in the array,displays the name and removes the form
    */
    
    function upstage(){
        nameval = input1.value;
        detval = input2.value;
        let jeff = createProject(nameval,detval);
        projects.push(jeff);
        jeff.displayit();
        listall = document.querySelectorAll('.listall');
        noa = Array.from(listall);
        miracle();
        while(projectdetails.firstChild){
            projectdetails.removeChild(projectdetails.firstChild);
        }
        modal2.style.display = 'none'
        
    }
    
    doneb.addEventListener('click',upstage)

})

//This creates the constructor for all new projects 
let createProject = function(name,desc){
    const displayit = function(){
        const listi = document.createElement('li');
        listi.innerText = name;
        listi.className = 'listall';
        projectlist.appendChild(listi);
    }

    return{
        name,desc,displayit//,tasks,tryevent
    }
}

//Creating the new task constructor
const createtask = function(title,dates,definition,priority){
    const displayit = function(){
        const listi = document.createElement('li');
        listi.className = 'taskmember';

        const listname = document.createElement('h5');
        listname.innerText = title;
        listname.classList.add('listname');

        const listcheck = document.createElement('input');
        Object.assign(listcheck,{
            type:'checkbox',
            className:'chckbox'
        }) 
        
        //adds a delete button image for the todos
        const delimg = new Image(20,20);
        delimg.src = 'deletebtn.svg';
        delimg.classList.add('deleteimg')
                

        listi.appendChild(listcheck);
        listi.appendChild(listname);
        listi.appendChild(delimg);
        
        tasklist.appendChild(listi);
    }

    return{ title,dates,definition,priority,displayit}
}

//Trying out if the display can be changed by clicking the projects
function miracle(){
     listall.forEach(function(item){
        item.addEventListener("click",thevent)
    })
}

function thevent(e){
    //get the index of selected project
    let ind = Array.from(listall);
    let i = ind.indexOf(e.currentTarget);

    //onclick of each project, remove all the list items displayed for the last viewed
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
    
    /* check if it has the task array,create one if it doesnt, if it does loop through it and
        create lists for each and display
    */
     if(!projects[i].tasks){
        projects[i].tasks = [];
    }else{
        for(let j = 0;j<projects[i].tasks.length;j++){
            const listi = document.createElement('li');
            listi.className = 'taskmember';

            const listname = document.createElement('h5');
            listname.innerText = projects[i].tasks[j].title;
            listname.classList.add('listname');

            const listcheck = document.createElement('input');
            Object.assign(listcheck,{
                type:'checkbox',
                className:'chckbox'
            }) 

            //adds a delete button image for the todos
            const delimg = new Image(20,20);
            delimg.src = 'deletebtn.svg';
            delimg.classList.add('deleteimg')
            
            listi.appendChild(listcheck);
            listi.appendChild(listname);
            listi.appendChild(delimg);
                        
            tasklist.appendChild(listi);
        }

        //adding the delete buttons functionality
        let theimgs = document.querySelectorAll('.deleteimg');
        let thelist = document.querySelectorAll('.taskmember');

        let timgs = Array.from(theimgs);
        theimgs.forEach(function(item){
            item.onclick = function ubinv(){
                let triple = timgs.indexOf(item);
                alert('money ' + triple);

                projects[i].tasks.splice(triple,1) 
                tasklist.removeChild(thelist[triple]);
            }
        })        
    } 
    

    currentproj.innerText = projects[i].name;
    
    //display the form for new task when the new task button is clicked
    newtask.onclick = function animal(){
        modal1.style.display = 'block';    
    };

    
    /*get the values of the form element,create a new task using the constructor,
    add it to the projects task array, display it and remove the form
    */
    submitask.onclick = function anime(){
        let ti = title.value;
        let du = duedate.value;
        let de = describe.value;
        let priority = document.querySelector('input[name="priority"]:checked').value;
        let max = createtask(ti,du,de,priority);
        max.displayit();
        projects[i].tasks.push(max);
        modal1.style.display = 'none';
        title.value = '';
        
        //adding the delete buttons functionality
        let theimgs = document.querySelectorAll('.deleteimg');
        
        let timgs = Array.from(theimgs);
        let thelist = document.querySelectorAll('.taskmember')
        theimgs.forEach(function(item){
            item.onclick = function ubinv(){
                let triple = timgs.indexOf(item);
                alert('money ' + triple);
                projects[i].tasks.splice(triple,1) 
                tasklist.removeChild(thelist[triple]);
            }
        })

    }      
  
}


