import Usernames from './Usernames.json'
export default  function getUsername(){
  return Usernames.usernames[Math.floor(Math.random()*Usernames.usernames.length)]
}