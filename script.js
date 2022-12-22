//declarations and accessing the DOM
let slider=document.getElementById('slider')
let checkbox=Array.from(document.querySelectorAll('.checkbox'))
let strength=document.getElementById('strength-text')
let indicator=Array.from(document.getElementsByClassName('indicator'))
let len=document.getElementById('charlength')
let password=document.getElementById('pwd')
let generate_btn=Array.from(document.getElementsByClassName('generate'))
let reset=Array.from(document.getElementsByClassName('reset'))
let copy=document.getElementById('Layer_1')
let count=0;
let charlength;
let checked_boxes=new Array();
//displaying character length selected via slider
function display_length(val){
    // let len=document.getElementById('charlength')
    len.innerHTML=val;
    charlength=val;
}
//Resetting selected user inputs
reset[0].addEventListener('click',()=>{
    password.value='';
    checkbox.forEach((elem)=>{
        elem.checked=false;
    })
    strength.innerHTML='';
    count=0;
    indicator.forEach((elem)=>{
        elem.style.backgroundColor='transparent'
        elem.style.top='-2px';
    })
    checked_boxes=[];
    len.innerHTML='0';
    slider.style.backgroundSize='0% 100%';
    slider.value='0';

})
//to copy the generated password to clipboard
copy.addEventListener('click',()=>{
    password.select();
    password.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(password.value)
})
//logic for password generation
generate_btn[0].addEventListener('click',()=>{
    let l=charlength;
    let specifications=checked_boxes
    let upper='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower='abcdefghijklmnopqrstuvwxyz';
    let numbers='0123456789';
    let symbols='!@#$%^&*()-+';
    let requirements=specifications.map((elem)=>{
        if(elem=='symbols'){
            return symbols;
        }else if(elem=='numbers'){
            return numbers;
        }else if(elem=='lower'){
            return lower;
        }else{
            return upper
        }
    })
    let j=0;
    let result=''
    while(j<requirements.length && result.length!=l){
        let x=requirements[j]
        result=result+x.charAt(Math.floor(Math.random()*x.length))
        j==(requirements.length-1)?j=0:j=j+1;
    }
    password.value=result;
    password.style.color='#fff';
})
//progress bar in the slider
slider.addEventListener('input',(e)=>{
    let target=e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
})
//styling the strength indicator based on checkbox values
checkbox.forEach((element)=>{
    element.addEventListener('change',()=>{
        if(element.checked==true){
            checked_boxes.push(element.value)
            strength.style.display='inline-block';
            strength.style.visibility='visible';
            strength.style.bottom='2px'
            indicator.forEach((elem)=>{
                elem.style.top='4px';
            })
            count=count+1;
            if(count==1){
                strength.innerHTML='WEAK';
                indicator[0].style.backgroundColor='yellow'
    
            }
            else if(count==2 || count==3){
                strength.innerHTML='MEDIUM';
                indicator[1].style.backgroundColor='yellow';
                indicator[2].style.backgroundColor='yellow'
            }
            else{
                if(count==4){
                    strength.innerHTML='STRONG';
                    indicator[3].style.backgroundColor='yellow'
                }
            }           
        }
        else{
            count=count-1
            let index=checked_boxes.indexOf(element.value)
            checked_boxes.splice(index,1)
            if(count==0){
                strength.style.visibility='invisible';
                strength.style.display='none';
                indicator[0].style.backgroundColor='transparent'
                checked_boxes=[]
                indicator.forEach((elem)=>{
                elem.style.top='1px';
            })
            }
            else if(count==3){
                indicator[3].style.backgroundColor='transparent';
                strength.innerHTML='MEDIUM';
            }
            else if(count==2){
                    strength.innerHTML='MEDIUM';
                }
                else{
                    if(count==1){
                        strength.innerHTML='WEAK';
                        indicator[1].style.backgroundColor='transparent';
                        indicator[2].style.backgroundColor='transparent'
                    }
                }
            
        }
        
    })
})