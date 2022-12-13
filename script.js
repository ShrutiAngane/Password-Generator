function display_length(val){
    let len=document.getElementById('charlength')
    len.innerHTML=val;
}
let slider=document.getElementById('slider')
slider.addEventListener('input',(e)=>{
    let target=e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
})

let checkbox=Array.from(document.querySelectorAll('.checkbox'));
let strength=document.getElementById('strength-text')
let indicator=Array.from(document.getElementsByClassName('indicator'));
console.log(indicator)
let count=0
checkbox.forEach((element)=>{
    element.addEventListener('change',()=>{
        if(element.checked==true){
            strength.style.display='inline';
            strength.style.visibility='visible';
            strength.style.bottom='5px'
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
            if(count==0){
                strength.style.visibility='invisible';
                strength.style.display='none';
                indicator[0].style.backgroundColor='transparent'
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
