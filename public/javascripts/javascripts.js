var newPet = document.getElementById('newpet');
var profile = document.getElementById('profile');

function newPetPage()
{
  location.href="/newpet";
}


newPet.addEventListener("click", newPetPage);
profile.addEventListener("click", createprofile);
