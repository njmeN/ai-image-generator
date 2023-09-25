const API_KEY= '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';
const drawBtn = document.querySelector('.drawBtn');
const imageContainer =document.querySelector('.imageContainer');
const inputElement =document.querySelector('.inputElement');
const loadingContainer = document.querySelector('#loading-container');
drawBtn.addEventListener('click', getImages);

async function getImages(){
imageContainer.innerHTML = "";
  loadingContainer.classList.remove('hidden')
    
    
    try{
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                'prompt': inputElement.value,
                "n": 3,
                "size": "256x256"
            })
        });
        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        console.log(data);
         data?.data.forEach(imageUrl => {
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl.url;
            imgElement.classList.add('pr-2', 'mt-2', 'mb-2', 'pl-2');
            imageContainer.append(imgElement); 
        }); 
        
        loadingContainer.classList.add('hidden')
        
        
    }catch(error){
        console.log(error);
        
    }
    
}
window.addEventListener("offline", function() {
    var alertMsg = document.querySelector('.alertMsg');
    showAlert(alertMsg , 2000);
  })

function showAlert(alertDiv, duration){
    alertDiv.classList.remove('hidden');
    setTimeout(()=> {
        alertDiv.classList.add('hidden')
    },duration);
}