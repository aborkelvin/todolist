let modal2 = document.querySelector('.modal2');
let modal1 = document.querySelector('.modal1');
let modal3 = document.querySelector('.modal3');
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

let title2 = document.querySelector('#title2');
let duedate2 = document.querySelector('#duedate2');
let describe2 = document.querySelector('#describe2');
let editask = document.querySelector('.editask');

let listall = document.querySelectorAll('.listall');


//checks for local storage content
if(JSON.parse(localStorage.getItem('projectstore'))){
    getProjects();
}

//stores projects arrays in local storage
function storeproject(){
    localStorage.setItem('projectstore',JSON.stringify(projects));
}

/* Gets projects from local storage,pushes them into the current pages project array,
    displays each of the projects,calls miracle(which adds their event listeners and
        displays the tasks in each).
*/        
function getProjects(){
    let redisplayprojects = JSON.parse(localStorage.getItem('projectstore'));
    for(let i = 0;i<redisplayprojects.length;i++){
        projects.push(redisplayprojects[i]);
        displayProj(redisplayprojects[i].name)    
    }
    miracle();
}



//this creates lists for the projects and displays it
function displayProj(name){//for separation(later), this is DOM creation so it might be classified there
    const listi = document.createElement('li');
    listi.innerText = name;
    listi.classList.add('listall','hover');
    projectlist.appendChild(listi);
}

//this creates display elements for the tasks
function displaytask(title){//Also DOM creation; for separation
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
    delimg.src = '/src/images/deletebtn.svg';
    delimg.classList.add('deleteimg','hover');
    
    const edimg = new Image(20,20);
    edimg.src='/src/images/editbtn.svg';
    edimg.classList.add('editimg','hover');
            

    listi.appendChild(listcheck);
    listi.appendChild(listname);
    listi.appendChild(edimg);
    listi.appendChild(delimg);
    
    tasklist.appendChild(listi);
}

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
    projectdetails.appendChild(input2);
    projectdetails.appendChild(doneb);
    

   
    /*Onclick of done btn:collects input values,creates a new project using the project 
        constructor,stores it in the projects array,displays the name, updates local storage,
        adds event listeners to the projects available (calling miracle) then removes the form
    */  
    function upstage(){
        nameval = input1.value;
        detval = input2.value;
        let jeff = createProject(nameval,detval);
        projects.push(jeff);
        jeff.displayit();
        //update projects in local storage
        storeproject();
        miracle();
        while(projectdetails.firstChild){
            projectdetails.removeChild(projectdetails.firstChild);
        }
        modal2.style.display = 'none'
        
    }
    
    doneb.addEventListener('click',upstage)

})

/*This is the constructor for all new projects,manages the name,description and
    the display of each project 
 */
let createProject = function(name,desc){
    const displayit = function(){
        displayProj(name);
    }
    return{
        name,desc,displayit
    }
}

/*Constructor for all new tasks,manages each tasks details,for the display;
    calls displaytask
*/
const createtask = function(title,dates,definition,priority){
    const displayit = function(){
        displaytask(title);
    }

    return{ title,dates,definition,priority,displayit}
}

/*  this gets all images and lists as arrays,onclick of each img;gets the index of 
    the one clicked,removes the task that has the corresponding index from the task 
    arrays of the current project then removes the list with corresponding index 
    from the display lists
*/
function deletetask(i){
    let theimgs = document.querySelectorAll('.deleteimg');
    let thelist = document.querySelectorAll('.taskmember');
    let timgs = Array.from(theimgs);
    theimgs.forEach(function(item){
        item.onclick = function ubinv(){
            let t = timgs.indexOf(item);
            projects[i].tasks.splice(t,1) 
            storeproject();//update local storage
            tasklist.removeChild(thelist[t]);
        }
    }) 
}


function edittask(i){    
    // Get all the editbutton instances and all the task instances 
    let edits = document.querySelectorAll('.editimg'); 
    let thelist = document.querySelectorAll('.taskmember'); 

    let timgs = Array.from(edits);

    edits.forEach(function(item){                 
        let t = timgs.indexOf(item); //gets index of each task or editbtn
        item.onclick = function editor(){
            modal3.style.display = 'block';
            editask.onclick = function finishup(){

                //get the new values of the edit form
                let ti = title2.value;
                let du = duedate2.value;
                let de = describe2.value;
                let priority = document.querySelector('input[name="priority2"]:checked').value;
                
                //update the selected task in the projects array with the new values
                projects[i].tasks[t].title = ti;
                projects[i].tasks[t].dates = du;
                projects[i].tasks[t].definition = de;
                projects[i].tasks[t].priority = priority;

                //Update the displayed task title, remove the edit form and update local storage
                thelist[t].childNodes[1].textContent = ti;                
                modal3.style.display = 'none';
                storeproject();
            }

        }
    })
}


/*This function adds event listeners for each project's list element available,
    it's called each time a new project is created
*/
function miracle(){
    listall = document.querySelectorAll('.listall');
    listall.forEach(function(item){
        item.addEventListener("click",thevent)
    })
}


function thevent(e){
    //gets the index of selected project
    let ind = Array.from(listall);
    let i = ind.indexOf(e.currentTarget);

    //onclick of each project, remove all the list items displayed for the last viewed
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
    
    /* check if it has the task array,create one if it doesnt, if it does loop through
        the tasks and call dislaytask for each
    */
     if(!projects[i].tasks){
        projects[i].tasks = [];
    }else{
        for(let j = 0;j<projects[i].tasks.length;j++){
            displaytask(projects[i].tasks[j].title)
        }
        deletetask(i);
        edittask(i);

    } 
    

    currentproj.innerText = projects[i].name;
    
    //display the form for new task when the new task button is clicked
    newtask.onclick = function animal(){
        modal1.style.display = 'block';    
    };    
    
    /*gets the values of the form element,creates a new task using the constructor,
    adds it to the current project's task array, displays it and removes the form
    */
    submitask.onclick = function anime(){
        let ti = title.value;
        let du = duedate.value;
        let de = describe.value;
        let priority = document.querySelector('input[name="priority"]:checked').value;
        let max = createtask(ti,du,de,priority);
        projects[i].tasks.push(max);
        max.displayit();
        modal1.style.display = 'none';
        title.value = '';
        
        //update projects in local storage
        storeproject();

        //for deleting and editing the tasks,deletetask and edittask is called
        deletetask(i)
        edittask(i)
    }      
}