# VenusHack 2023

## ZotnFound
<p>A platform designed for UCI students, allowing them to effortlessly locate and recover lost or found items, ensuring their safe return.</p>
<p>Check out the website: <a href="https://zotnfound.com/">zotnfound.com</a></p>
<img src="https://cdn.discordapp.com/attachments/918312671533727855/1113210954075865209/Untitled_design_1.png" width="210px"/>

<p>Follow Us at: https://www.instagram.com/zotnfound/</p>
<img src="https://cdn.discordapp.com/attachments/688278789566103604/1113211583905153066/image.png" width="500px"/>


## Table of Contents
+ [Inspiration](#inspiration)<br>
+ [How It Works](#how-it-works)<br>
  + [Login](#login)<br>
  + [Home](#home)<br>
+ [How We Built It](#how-we-built-it)<br>
+ [Challenges We Faced](#challenges-we-faced)<br>

## Inspiration
Many people are constantly losing their belongings, whether that be their phones, keys, or watter bottles. This is especially true for UCI students on the UCI subreddit, where there are countless posts being created about lost and found items. Due to this problem, we decided to take matters into our own hands and created an Instagram account to help lost items return back to their original owners. We have so far helped over 10 people and gained over 300+ followers. The process on Instagram was very time consuming due to us having to manually go through each message and create a post on each individual item that was sent. Due to these restraints, we decided to create a platform that will allow people to post items that they found and lost. These posts had descriptions on the item and where they were last seen.

## How It Works
There are currently two pages to the website: Login and Home.
### Login
Upon entering our website, the user will be greeted with a login page where they are able to create an account with a UCI email and sign in.
### Home
This is where all the functionality of ZotnFound is. On the center of the page is a map that has all the locations of each item that has been found or lost. These items are indicated through their unqiue icons which act as markers and colors, with red representing "lost" and blue representing "found". Users are able to interact with the map such as dragging and zooming in/out. Upon clicking on any marker, it will show up a display of the item with its descriptions such as what the item is and when it was created, a tag indiciating that it's either lost or found, a contact button, and a delete button. The delete button will only show up on items that the user has created, which ensures that no items get deleted if they not been returned to the owner yet. On the right side of the homepage is a results panel which will showcase all the items as a small card which makes it easier for users to quickly identify whether or not their items are there. The results could be filtered out with the search bar on the top of the page. Users are able to type the item that they are currently looking for into the search bar and the results panel will update depending on what the user types. The results could be filtered out even more with the filtering panel on the letf side of the screen. The panel includes two switches, one for each lost and found, a section for the user to check off what type of item they are looking for, and a date selection. Under the filtering panel is a create marker button; when the user clicks on this button a form will pop up with multiple sections for users to input such as an image upload, type of item, name of the item, whether it's lost or found, and a description of the item. Once everything has been filled out, the user will be able to press on continue which will bring them back to the map with a brand new marker created on the location that they are currently at. They are then able to move the marker to the exact location that the found/lost the item and click on it once more to confirm its location. This will create a brand new icon for the item that the just posted on the map.

## How We Built It
We started off with brainstorming and creating prototypes with Figma and Google Docs. We used a top-down integration model by creating a user interface with Chakra UI without functionality first and then slowly diving into each component of the project to create its functionality using React. The interface and component designs were created by integrating Chakra UI and CSS styling while the functionality of the project utilized Leaflet, ReactJS, and Firebase. We have a login page that supports user authentication and verification (Firebase) as well as a home page with an interactive navigable map (Leaflet). The login page does not allow the user to access any other content before creating an account which is done through authorization protection in Firebase. The map allows for the placement of location markers when a form for a found/lost object is submitted (JS). Each user is stored within the Firebase database with a special ID and attributes that can be accessed. Additionally, we have a mapped display of items on the right-hand side that upon interaction shows a more detailed description of the object and has a means of communication through a mailing application (HTML and Chakra). We also have a live search bar implemented (JS) as well as filters that can be applied which will change the results that are currently being displayed (JS + Chakra + Leaflet). We also implemented a logout button for the user (Firebase) and their account email will be displayed at the top (Chakra).

## Challenges We Faced
There were many challenges we faced when building this website. Everything we used to create the web app was new to many of us such as Firebase, ChakraUI, and React Leaflet; and we only had one day to learn all of it before submitting the project. However, even with the time constraints we were able to create a website that we are proud to share with all its key functionalities implemented.
