import { db } from "./firebase";

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = ( id, name, email,age ) =>{
   // problem here with creating a new user there is no default of favorites value 
  
  var movieFavorites = "", seriesFavorites = "";
  db.ref(`users/${id}`).set({
    name,
    email,
    age,
    movieFavorites,
    seriesFavorites
  })};

//returns all users from firebase realtime db
export const onceGetUsers = () => db.ref("users").once("value");
export const doGetAnUnser = uid => db.ref(`users/${uid}`).once("value");


export const updateFavorites = (userId, userData, favoriteToDeleteId) => {
  var newMovieFavorites = [];
  var newSeriesFavorites = [];
  
  
    if(userData){
      for (let index = 0; index < userData.movieFavorites.length; index++) {
        const element = userData.movieFavorites[index];
          if(element.imdbID !== favoriteToDeleteId) {
            newMovieFavorites.push(element);
          }
        }
        
      for (let index = 0; index < userData.seriesFavorites.length; index++) {
        const element = userData.seriesFavorites[index];
        if(element.imdbID !== favoriteToDeleteId) {
          newSeriesFavorites.push(element);
        }
        
      }
    }  
    db.ref(`users/${userId}`).update({
      movieFavorites : newMovieFavorites.length == 0 ? "" : newMovieFavorites,
      seriesFavorites : newSeriesFavorites.length == 0 ? "" : newSeriesFavorites 
    })
    
    return {movieFavorites : newMovieFavorites.length == 0 ? "" : newMovieFavorites,
    seriesFavorites : newSeriesFavorites.length == 0 ? "" : newSeriesFavorites
  };
  
}


export const addToFavorite = ( id, favorites, oldMovieFavorites, oldSeriesFavorites) =>{
  
  var favoritesArray = [];
  

  if(favorites && favorites.Type){
    
    var favoriteSelectedData = {
      imdbID : favorites.imdbID,
      Type : favorites.Type,
      Title : favorites.Title,
      Plot : favorites.Plot,
      Poster : favorites.Poster,
      Actors: favorites.Actors,
      Director : favorites.Director,
      Year : favorites.Year,
      Country : favorites.Country
      
    };
        
    
    if(favorites.Type === "movie"){
      if(oldMovieFavorites !== ""){
        favoritesArray = mergeOldAndNewFavorites(oldMovieFavorites, favoriteSelectedData);
      }else{
        favoritesArray[0] = favoriteSelectedData;
      }
      if(favoritesArray){
        db.ref(`users/${id}`).update({
          movieFavorites : favoritesArray
        })      }

    }else{
      if(oldSeriesFavorites !== ""){
        favoritesArray = mergeOldAndNewFavorites(oldSeriesFavorites, favoriteSelectedData);
      }else{
        favoritesArray[0] = favoriteSelectedData;
      }
      
         if(favoritesArray){
          db.ref(`users/${id}`).update({
            seriesFavorites : favoritesArray
          })
         }   

    }
  }
   
  function mergeOldAndNewFavorites(oldArray, newData){
    var dataExist = false;
    if(oldArray && oldArray.length != 0){
      for (let index = 0; index < oldArray.length; index++) {
        const element = oldArray[index];
        if(element.imdbID == newData.imdbID){
          dataExist = true;
        }
      }
      if(!dataExist){
        oldArray[oldArray.length] = newData;
        console.log("added to Your Favorites")
        alert(newData.Type + " added to Your Favorites");
      }else{
        console.log("already exist in your Favorites list")
        alert(newData.Title + " " + newData.Type + " already exist in your Favorites list");
      }
    }
    
    
    return oldArray;
  }

  

};


