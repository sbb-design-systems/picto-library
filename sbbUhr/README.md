# sbbUhr
A java script version of the famous SBB Clock for digital usage. 
## Initialisation
In your html header add `<script src="path/to/sbbUhr-1.3.js"></script>`
In the html body define a `<div></div>` Tag with a unique id where the clock will be hosted. 

In a seperate script create a new clock `var myClock = new sbbUhr(container, background, fps);`

`container (string)` is the id of the defined div container, where the clock will be hosted. 

optional `background (boolean)` true = clock will be placed on a dark background, false = clock will be placed on a white background. 

optional `fps` set the refreshrate of the clock. Must be higher than 10 frames/second to get a smooth pointer movement. If not set, the clock will be rendered with every frame.

## Methods
`myClock.start()` will start the clock. 

`myClock.stop()` will stop the clock. 

---

## Digitale Uhr
Die digitale SBB Uhr wird in Webanwendungen oder auf dynamischen Kundeninformationskanälen im Zug oder am Bahnhof eingesetzt. Sie imitiert die Bewegungen und adaptiert das Design der physischen SBB Uhr. 

## Verwendung
Die digitale SBB Uhr muss genauso verwendet werden, wie sie spezifiziert ist. Weder das Design noch die Bewegungsmuster der Zeiger dürfen abgeändert werden. 

Die Uhr soll auf einem einfarbigen Hintergrund platziert werden, Platzierungen auf Bilder oder Grafiken sind zu unterlassen. Auf hellen Hintergründen wird das Zifferblatt mit einem grauen Rahmen visuell vom Hintergrund getrennt, auf dunklen Hintergründen ist die Version ohne Rahmen zu verwenden. 

## Was macht die Komponente?
Die SBB Uhr gibt die Systemzeit des Ausgabegerätes in analoger Form aus. Es ist darauf zu achten, dass die Systemzeit von einem verlässlichen Zeitserver bezogen wird, sofern darauf Einfluss genommen werden kann. 

## Wann soll die Komponente eingesetzt werden?
- Die Komponente kommt überall dort zum Einsatz, wo die genaue Zeit kommuniziert werden soll. In den meisten Fällen sind dies Ausgabegeräte mit Echtzeitinformationen zum öffentlichen Verkehr. 
- Die Uhr kann auch als Stilelement verwendet werden, der Kundennutzen muss jedoch in allen Fällen gewährleistet sein. 

## Regeln
- Die Mindestgrösse der Uhr darf 75px x 75px nicht unterschreiten. 
- Je nach Einsatzort ist die Mindestgrösse der Betrachtungsdistanz anzupassen. Als Faustregel gilt, Betrachtungsdistanz / 50 = Uhrgrösse (z.B. 2500mm / 50 = 50mm Uhrgrösse). 
- Pro Seite / Ansicht soll nur eine Uhr eingesetzt werden. 
- Der Abstand der Uhr zu den nächst gelegenen Elementen (Margin) muss mindestens je Seite 20% des Uhrdurchmessers betragen. 

## Ausprägungen und Zustände
Die Komponente hat folgende Ausprägungen: 
![Bild SBB Uhr Ausprägungen](https://github.com/GoetteSebastian/sbbUhr/blob/main/SBB-Uhr.jpg "Bild SBB Uhr Ausprägungen")

- Uhr auf hellem Hintergrund
- Uhr auf dunklem Hintergrund
