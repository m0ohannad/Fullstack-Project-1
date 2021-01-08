const Results = document.querySelector('.is-searchResults');
const renderData = (list) => {
    Results.textContent = '';
    list.map(pet => {
        const widget = document.createElement('div');
        widget.className = "widget";
        const widgetImage = document.createElement('div');
        widgetImage.className = "widget__image";
        const image = document.createElement('img');
        const desc = document.createElement('div');
        desc.className = "widget__desc";
        image.src = pet.img;
        image.alt = "pet image";
        widgetImage.appendChild(image);
        desc.innerHTML = `<h4>${pet.name}</h4>
                          <p>${pet.gender} | ${pet.age_category}</p>
                          <p class="location">${pet.location}</p>
                          <p class="type" style="display: none;">${pet.type}</p>`;
        widget.appendChild(widgetImage);
        widget.appendChild(desc);
        Results.appendChild(widget);
    });
}

const stories = document.querySelector('.stories .widgets');
const storiesData = (list) => {
    stories.textContent = '';
    list.map(story => {
        const widget = document.createElement('div');
        widget.className = "widget";
        const widgetImage = document.createElement('div');
        widgetImage.className = "widget__image";
        const image = document.createElement('img');
        const desc = document.createElement('div');
        desc.className = "widget__desc";
        image.src = story.img;
        image.alt = "graphic-image";
        widgetImage.appendChild(image);
        desc.innerHTML = `<h3>${story.title}</h3>
                          <a class="link" onclick="readMore()" href="#title">Read More</a>
                          <p class="story more">${story.story}</p>`;
        widget.appendChild(widgetImage);
        widget.appendChild(desc);
        stories.appendChild(widget);
    });
}

fetch("./script/data.json", {
    mode: "no-cors",
    Headers:{
        "Application-Type": "application/json"
    }
}).then(res => res.json())
.then(res => {
    renderData(res.pets);
    storiesData(res.stories);
})
.catch(err => console.log(err));

function readMore(){
    if(this.document.activeElement.innerHTML === "Read Less"){
        this.document.activeElement.innerHTML = "Read More";
        this.document.activeElement.nextElementSibling.classList.add("more");
    }else{
        const a = Array.from(document.getElementsByClassName('link'));
        a.forEach(function(item){item.innerHTML = "Read More"});
        Array.from(document.getElementsByClassName('story')).forEach(e =>{e.classList.add("more")});
        this.document.activeElement.innerHTML = "Read Less";
        this.document.activeElement.nextElementSibling.classList.remove("more");
    }    
};

document.querySelector('#search').addEventListener('keyup', filterItem);
document.querySelector('#searchBtn').addEventListener('click', filterItem);

function filterItem(e){
    e.preventDefault();
    const text = document.querySelector("#search").value.toUpperCase();
    const location = document.getElementsByClassName('location');
    const type = document.getElementsByClassName('type');

    
    Array.from(location).forEach(function(item){
        if(item.textContent.toUpperCase().indexOf(text) !== -1){
            item.parentNode.parentNode.style.display = "block";
        }else{
            item.parentNode.parentNode.style.display = "none";
        }
    });
    
    Array.from(type).forEach(function(item){
        const dog = document.getElementById("dog").checked;
        const cat = document.getElementById("cat").checked;
        const note = document.getElementById("note");
        if( (dog && cat) || (!dog && !cat)){
            note.textContent = "search in all";
        }else if(dog){
            note.textContent = "search in dos only";
            if(item.textContent.indexOf("Dog") === -1){
                item.parentNode.parentNode.style.display = "none";
            }
        }else if(cat){
            note.textContent = "search in cats only";
            if(item.textContent.indexOf("Cat") === -1){
                item.parentNode.parentNode.style.display = "none";
            }
        }
    });
}
function filter(){
    document.getElementById('searchBtn').click();
}