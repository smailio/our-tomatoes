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
- layout 
- bigger text on big screen
- add alarms in redux store 
- make the screen bling when timer finish
- add sound alarm on end of my own timer 
## DONE
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
