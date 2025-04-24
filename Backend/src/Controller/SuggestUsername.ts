import Usernames from '../Usernames.json'
function getUsername(){
  return Usernames.usernames[Math.floor(Math.random()*Usernames.usernames.length)]
}

