The app is hosted here : https://our-tomatoes.firebaseapp.com/

Set pomodoros and share the URL with annoying people, tell them to keep the page open so they watch how much time is left, they'll also hear a nice jingle when your pomodoro is done. 

![image](https://user-images.githubusercontent.com/7635812/116553307-46ea9080-a8fa-11eb-92a4-d58d1e414682.png)

Use the dashboard to trach how much you could focus today : 
![image](https://user-images.githubusercontent.com/7635812/116553167-1d316980-a8fa-11eb-8b87-f27bc74e2885.png)


##functional requirements
- when a user sign up a pomodoro is created for this user
- the user need to login to manipulate his pomodoro

###  pages
- home page `/`
  - for logged in user 
    - redirect to `/pomodoro_id`
  - for not logged in user
     - sign up / log in page
- pomodoro page `/pomodoro_id`
  - for pomodoro owner
    - timer 
      - start pomodoro button
      - start short break button
      - start long break button 
    - list of running timers of the user he follows
      - avatar of the user 
      - timer
      - link to the pomodoro page of the user
  - for other users : 
    - when the pomodoro is running the remaining time is displayer
    - when the pomodoro is not running a message saying that the user is available
    - a button to follow the pomodoro of the current user
    - a button to unfollow the pomodoro of the current user if it is already followed 
    - a button to go to my pomodoro
- settings (either a page, a pop-up, or buttons on the pomodoro page)
    - set pomodoro and break duration
    - enable/disable : blinking, ringing
    
## TO DEFINE
- what to do when a following finished his timer ? the whole screen blink ? 
par of the screen blink ? only the text blink ? 

## TODO
- bigger text on big screen
- make the screen blink when timer finish
- add settings
    - pomodoro time 
    - break time 
    - disable sound alarm
    - disable blinking
    - custom alarm
- on mobile send notification when screen is off
- add avatar in other guy page header
- add statistics page 
    - tomato timer per day
    - successful / un-successful tomatoes
- make a public version of other guy page
## DONE
- layout 
- add sound alarm on end of my own timer 
- make the break behave like a normal timer
- add duration in firebase
- Following
- OtherGyTomato
- add redirect / => /myid
- add a home button 
- add an un-follow button in
- add indication that a following is on a break
- add duration preview in timer
- add indication that a following is on a break
- replace Timer is Off by a better message 
- change icon 
- change title
- add break indication on OtherGuyPage
- put all chilling following together

