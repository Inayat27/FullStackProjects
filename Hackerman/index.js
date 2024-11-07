document.addEventListener('keypress',()=>
{
    console.log('pressing');
    const a = document.createElement('p');
    const b = document.createElement('p');
    const c = document.createElement('p');
    const d = document.createElement('p');
a.innerHTML = 'Staring the Hacking Process....';
document.body.appendChild(a);

let user = prompt('Enter the account Owner name to hack');
b.innerHTML=`Hacking the ${user} Account`;
c.innerHTML=`Fetching  the ${user} Account info.....`;
d.innerHTML=`Data fetched Successfully!`;

document.body.appendChild(b);
document.body.appendChild(c);
document.body.appendChild(d);


let obj = {
    Name: "INayat_92",
    Password: "Inayat6544",
    Location: "India"
}

for (const key  in (obj)) {
    let temp = document.createElement('p');
    temp.innerHTML=obj[key];
    document.body.appendChild(temp)
  }

// console.log(`Hacking the ${user} Account`);
// console.log(`Fetching  the ${user} Account info.....`);
// console.log(`Data fetched Successfully!`);


},{ once: true });

