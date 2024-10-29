// Bouton d'ajouter de tâche et de recherche 
const add = document.querySelector("#add");
const search = document.querySelector('#searchBTN');

// Input de titre, d'autheur et de recherche 
let titleInput = document.querySelector("#title");
let authorInput = document.querySelector("#author");
const searchInput = document.querySelector("#searchInput");

const container = document.querySelector("#container"); 
const book = [];

const Livre = {
    title: "",
    author: "",
    read: false
};

//Considère qu'un nouveau livre n'est pas lu
function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
}

// Fonction d'ajout de nouveau livre dans le tableau, vidage des inputs 
function addBook() {
    add.addEventListener("click", function() {
        const livre = new Book(titleInput.value, authorInput.value);


        //envoie les valeurs de l'objet livre dans le tableau
        book.push(livre);
        // sert à vider les inputs à l'ajout

        titleInput.value = "";
        authorInput.value = "";
        //Appelle la fonction d'ajout de livre et lui met en paramètre le nouvel objet
        bookOnList(livre)
    });
}

//Fonction d'ajout du nouveau livre sur la page, ajout de quelque style, ajout de bouton supprimier ainsi que de couleur pour différencier les livrs lu et non lu
//Et un mousover pour indiquer que le texte est cliquable pour indiquer que c'est cliquble 

function bookOnList(livre) {
    //Création de la div parent, ajout de d'attribut boostrap pour le style + ajout de la couleur rouge pour le texte
    let divParent = document.createElement('div');
    divParent.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'my-2'); //ajout de classe bootsrap pour le style
    divParent.style.color="red";

    let deleteBtn = document.createElement('button'); 
    deleteBtn.type = 'button';
    deleteBtn.classList.add('btn', 'btn-danger', 'ms-2'); //ajout de classe bootsrap pour le style
    deleteBtn.textContent = 'Delete';

    let titleContent = document.createElement('p');
    let authorContent = document.createElement('p');
    titleContent.classList.add('d-flex', 'justify-content-between', 'align-items-center') //ajout de classe bootsrap pour le style
    titleContent.id='titleContent';
    authorContent.classList.add('d-flex', 'justify-content-between', 'align-items-center') //ajout de classe bootsrap pour le style
    authorContent.id='authorContent';

    
    titleContent.textContent=(`Titre : ${livre.title}`)
    authorContent.textContent=(` Auteur : ${livre.author}`)


    deleteBtn.addEventListener('click', function(){
        if(this.click){
            divParent.remove();
            //Récupère la position de l'élement à supprimer dans le tableau et le supprime
            let positon = book.indexOf(livre);
            book.splice(positon,1)
        }})

    //Création d'une nouvelle div et la met dans la div container et met le texte en rouge

    divParent.appendChild(titleContent);
    divParent.appendChild(authorContent);
    divParent.appendChild(deleteBtn);
    container.appendChild(divParent);

    searchBook(divParent,titleContent,authorContent);

    // Permet de savoir que la div parent est cliquable
    titleContent.addEventListener("mouseover", function(){
        this.style.cursor="pointer";
    })
    

    // Permet de considérer un livre comme lu et modifier la valeur dans le tableau et modifile la couleur en vert
    titleContent.addEventListener("click", function() {
        livre.read = true;
        console.log(livre, book);
        divParent.style.color="green";
    });


    };

    // Exo bonus 
    //Ca fonctionnait bien puis j'ai resté ça fonctionne plus du coup j'ai tenté des choses 
   function searchBook(divParent,container,titleContent,authorContent) {
        search.addEventListener('click', function() {
            // Récupérer la valeur de recherche et la force en minuscule 
            let recherche = searchInput.value.toLowerCase();
    
            //Création de deux tableaux , qui récupère soit le livre qui à le même titre ou auteur que recherche
            const resultatTitle = book.filter(element => 
                element.title.toLowerCase().includes(recherche)
            );
            const resultatAuthor = book.filter(element => 
                element.author.toLowerCase().includes(recherche)
            );
            
            //Je verifie avec some() si dans les deux tableaux si dessus j'ai un livre affiché dans title titleContent ou authorContent, je retire aussi les prefixe titre et auteur 
            // avec replace()
            let bookInResults = resultatTitle.some(element => 
                element.title.toLowerCase() === titleContent.textContent.toLowerCase().replace("Titre : ", "")
            );
            let authorInResults = resultatAuthor.some(element => 
                element.author.toLowerCase() === authorContent.textContent.toLowerCase().replace(" Auteur : ", "")
            );

            //Je verifie si l'une des deux constante est vrai si oui je ne fais rien sinon je le modifie en none
            if (bookInResults && authorInResults) {
                divParent.style.display="";
                console.log("vrai x2");
            } else if (bookInResults || authorInResults) {
                console.log("vrai 1 fois");
                divParent.style.display="";

            } else {
                console.log("Vrai 0 fois");
                container.style.display="none";
            }
        });
    }


        





addBook()
