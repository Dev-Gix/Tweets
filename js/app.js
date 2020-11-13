const listaTweets = document.getElementById('lista-tweets');

//Event Listeners
eventListeners();

function validaryEnviar(){ //REVISAR
    if(formulario.area.value == ""){
        alert('NO HA ESCRITO NINGUN Tweet');
    }else{
        //Cuando se envia el formulario
        document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    }
}
function eventListeners(){

     //Borrar Tweets
    listaTweets.addEventListener('click',borrarTweet)

    //Contenido cargado 
    document.addEventListener('DOMContentLoaded',localStorageListo);

}

//Añadir al formulario que
function agregarTweet(e){
    e.preventDefault();
    //leer el valor del text area
    const tweet = document.getElementById('area').value;
    
    //crear boton eliminar 
    const botonborrar = document.createElement('a');
    botonborrar.classList = 'borrar-tweet';
    botonborrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li =  document.createElement('li');
    li.innerText = tweet;
    // Añade el boton de borrar al tweet
    li.appendChild(botonborrar);
    // añade el tweet  en la lista
    listaTweets.appendChild(li);

    //añadir a Local storage
    agregarTweetLocalStorage(tweet);

    document.getElementById('area').value= "";

        

    }
    
   

//Eliminar el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className == 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
             
    }
}


//Mostrar datos de LocalStorage en la lista 
function localStorageListo(){

    let tweets;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){


        const botonborrar = document.createElement('a');
        botonborrar.classList = 'borrar-tweet';
        botonborrar.innerText = 'X';
    
      
       const li =  document.createElement('li');
       li.innerText = tweet;
      
       li.appendChild(botonborrar);
      
       listaTweets.appendChild(li);
      
    })
    

}
//Agrega tweet a LocalStorage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets',JSON.stringify(tweets));
  

}

//Comprobar que haya elementos en el localStorage retorna un arreglo
function obtenerTweetsLocalStorage(){

    let tweets;

    // Revisamos los valores de local localStorage
    if(localStorage.getItem('tweets')===null){
        tweets =[];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;

}

//Eliminar Tweet de Local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetsBorrar;
    tweetsBorrar = tweet.substring(0,tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet,index){
        if(tweetsBorrar == tweet){
            tweets.splice(index, 1);

        }
    });
            localStorage.setItem('tweets',JSON.stringify(tweets));
    
}

