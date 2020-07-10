# SBB Pictogram Library
## Pictograms
The pictogram library is available in 4 different formats. Those pictograms are specialy designet for use in digital Produkts such as web pages or mobile apps. 
For pictogram formats suitable for way finding systems on train stations or rolling stocks, visit [SBB Markenportal](https://company.sbb.ch/de/ueber-die-sbb/profil/sbb-markenportal/signaletik/signaletik-bahnhof.html)
### [Android](https://github.com/sbb-design-systems/picto-library/tree/master/pictos/android)
The pictoragms are available in 5 resolutions: 
|Directory|Resolution|
|---|---|
|mdpi|25 x 25 px|
|hdpi|38 x 38 px|
|xhdpi|50 x 50 px|
|xxhdpi|75 x 75 px|
|xxxhdpi|96 x 96 px|

All the files are in the PNG format and exportet in the RGB color space. 
### [iOS](https://github.com/sbb-design-systems/picto-library/tree/master/pictos/ios)
For iOS the pictorgrams are available in 3 different resolutions: 
|Suffix|Resolution|
|---|---|
||25 x 25 px|
|@2x|38 x 38 px|
|@3x|75 x 75 px|

All the files are in the PNG format and exportet in the RGB color space. 
### [SVG](https://github.com/sbb-design-systems/picto-library/tree/master/pictos/svg-digital)
The SVG files are available with a nominal size of 24 x 24 px but are set up to be scaled to any size. They are exported in the RGB color space. 
### [PDF](https://github.com/sbb-design-systems/picto-library/tree/master/pictos/pdf-digital)
The PDF files are available with a nominal size of 24 x 24 px or 8.5 x 8.5 mm and can be scaled to any size. They are exported in the RGB color space. 
## [pictoLibrary.json](https://github.com/sbb-design-systems/picto-library/blob/master/pictoLibrary.json)
All the meta informations about the pictograms as well as the svg data of the graphics are also available as a json structure. The file is structured as described here: 

`pictos` `track` `sector` `stand` Those objects contain the meta data of the pictograms itself. 
`svgPictos` `svgTrack` `svgSector` `svgStand` contains a list of the svg codes once for digital use `svgDigital` and once for way finding purposes `svgProduktion`. 
`categories` `subcategories` `background` contain informations linked by the pictogram lists. 

All the objects are build in the same stucture: 

```json
  "object": {
    "content": [],
    "id": "",
    "name": "",
    "prototype": [],
    "sort": []
  }
```

* `content` array contains the objects containing the given informations. 

* `id` is used in the editor that generate the json file. 

* `name` is a german title for the whole object and is used in the editor as well. 

* `prototype` is a list of the attributes contained in the `content` objects. Each object contains the following attributes: 

  * `name` is the german name of the attribute. 

  * `key` is the name of the attribute inside the `content` list. 

  * `type` defines the type of element. It can be: 

    * `text` contains a string. 

    * `number` contains an integer. 

    * `link` links to the `id` of the defined list. 

    * `boolean` is stored as 1 and 0. 

    The linking works as in the following example: 

    pictoLibrary.pictos.content[0].category links to the `id` of the list `category`
    
* `rel` contains the most commonly used attribute of the linked element, like the german name of the linked element. 

## Language and Directions

Some pictograms exist in different languages or / and different directions. Every moving object is drawn in both directions `moving left` and `moving right`. 
Usually the `moving right` version must be used. 
Picotgrams containing text elements are available in the languages `german`, `french` and `italian`. In the future we will also provide `english` versions.
The language and direction informations are storied in the `svg...` lists with the attributes `isDe`, `isFe`, `isIe`, `isEe`, `isLeft`, `isRight`. 
