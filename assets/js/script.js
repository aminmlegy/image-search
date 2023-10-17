const wrapp = document.querySelector('.images');
const moreImg = document.querySelector('.more-img');
const formSearch = document.querySelector('.form-search');
const model = document.querySelector('.model');
const close = document.querySelector('.close');
const downloadPop = document.querySelector('.download-pop');
const pixabayApiKey="24844012-51024c7fdaeef887759476fdd";
let currentPage = 1;
const perPage = 24;

formSearch.addEventListener('submit',(e)=>{
    e.preventDefault();
    wrapp.innerHTML="";
    getImages(e.target.search.value);

})
const getImages = async (val="")=>{
const url = `https://pixabay.com/api/?q=${val}&key=${pixabayApiKey}&page=${currentPage}&per_page=${perPage}`;
   try{
    const res = await fetch(url);
    const data = await res.json();
    buildData(data.hits)
    console.log(data.hits)
   }catch(err){
    console.log(err)
   }
}
getImages()

const downloadImg = (img)=>{
    fetch(img).then(res=> res.blob()).then(file =>{
        const aLink = document.createElement('a');
        aLink.href = URL.createObjectURL(file);
        aLink.download= new Date().getTime();
        aLink.click()
    });

}
const showModel = (imgSrc)=>{
    model.querySelector('img').src=imgSrc
    model.classList.add('show')
}
close.addEventListener('click', ()=>{
    model.classList.remove('show')
})
downloadPop.addEventListener('click' , ()=>{
    downloadImg(model.querySelector('img').src)
})
const buildData = (data)=>{
    wrapp.innerHTML += data.map(element =>`<div class="img-card">
            <div class="img-header"  onclick="showModel('${element.webformatURL}')">
                <img src="${element.webformatURL}" alt="image">
            </div>
            <div class="img-content">
                    <h4 class="logo">${element.tags}</h4>
                    <span class="icon" onclick="downloadImg('${element.webformatURL}')">⇣</span>
            </div>
        </div>`).join("");
}
moreImg.addEventListener("click" , ()=>{
    currentPage++
    getImages(formSearch.search.value)
})
