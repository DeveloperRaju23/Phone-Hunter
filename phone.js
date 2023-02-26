const loadPhone = (searchText, dataLimited) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneData(data.data, dataLimited))
}

const showPhoneData = (phones, dataLimited) =>{
   const phoneContainer =  document.getElementById('phone-container')
   phoneContainer.textContent = '';
   const showAll =  document.getElementById('show-all')
   if (dataLimited && phones.length > 10){
    phones = phones.slice(0,10)
   showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }
//    display 20 phone only 
  
//    display no phone found 
     const noPhone =  document.getElementById('no-phone-found')    
     if(phones.length === 0){
      noPhone.classList.remove('d-none');
     }
     else{
      noPhone.classList.add('d-none')
     }
    phones.forEach(phone => {
        console.log(phone)
       const div = document.createElement('div')
       div.classList.add('col')
       div.innerHTML = `
       <div class="card p-3 my-3">
         <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
         <div class="card-body">
         <h5 class="card-title">Name : ${phone.phone_name}</h5>
           <h5 class="card-title">Brand : ${phone.brand}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">
           Show Details
         </button>
         </div>
       </div>
       `;
       phoneContainer.appendChild(div)
    });
    // stop spinner 
    toggleSpinner(false)
}

const processSearch = (dataLimited) => {
  toggleSpinner(true)
  const searchElement = document.getElementById('search-field');
  const searchText = searchElement.value;
  loadPhone(searchText, dataLimited)
}

// Handle search button click 
document.getElementById('btn-search').addEventListener('click', function(){
  // start load 
  processSearch(10)
})

// Enter 
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
      processSearch(10)
    }
})

const toggleSpinner = isLoading =>{

  const loaderSection = document.getElementById('loader')
  if (isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }

}
// Not the best way to load show all 

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

// Phone click details 
const loadPhoneDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDetails(data.data))
}


const displayPhoneDetails = (phone) =>{
  console.log(phone.mainFeatures.sensors)
  const phoneTitle = document.getElementById('phoneDetailsModalLabel');
  phoneTitle.innerText = phone.name
  const phoneDetailsContainer = document.getElementById('phone-details')
  phoneDetailsContainer.innerHTML = `
    <img class= 'd-flex mx-auto py-3' src="${phone.image}" alt="">
    <p>ReleaseDate : ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'} </p>
    <p>Storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Information Storage'} </p>
    <p>Display Size : ${phone.mainFeatures.displaySize} </p>
    <p>ChipSet : ${phone.mainFeatures.chipSet} </p>
    <p>Sensor : ${phone.mainFeatures.sensors[0] ? phone.mainFeatures.sensors[0] : 'No Sensor'} </p>
  `
}


 loadPhone ()