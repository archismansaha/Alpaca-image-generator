import { useEffect, useState } from "react";
import CategoryButton from "./components/CategoryButton";
import StyleButton from "./components/StyleButton";
import Alpaca from "./components/Alpaca";
import { stylesData } from "./Data/Styles";

import mergeImages from 'merge-images';


function App() {

  const [allData, setAllData] = useState([])
  
  const [activeCategory, setActiveCategory] = useState("Background")
  const [activeStyle, setActiveStyle] = useState([])
  
  const [alpacaImage, setAlpacaImage] = useState([])
  const [styleOptions, setStyleOptions] = useState([])
  
  const [categoryIndex, setCategoryIndex] = useState(0)

  // default aplaca png
  useEffect(() => {
    const alpacaImageArray = []
    const defaultAlpacaStyles = []
    Object.values(stylesData).forEach(val => {
        alpacaImageArray.push(val[0].pic);
        defaultAlpacaStyles.push(val[0].name)
    })
    setAlpacaImage(alpacaImageArray)
    setActiveStyle(defaultAlpacaStyles)
    setAllData(stylesData)
  }, [])
 
  // get all styles option according to category
  useEffect(() => {
    const optionsArray = []
    stylesData[activeCategory].map(item => {
      return optionsArray.push(item)
    })
    setStyleOptions(optionsArray)
  }, [activeCategory])

// generate style options according to category
  function generateStyleOptions(category,index) {
    // sets button to activecategory  when clicked on the category
    const activeName = category
    setActiveCategory(activeName)
    setCategoryIndex(index) // getting the category index so that we can change the style in Activestylearray of that category index

    // get all styles option according to active category
    const optionsArray = []
    stylesData[category].map(item => {
      return optionsArray.push(item)
    })
    setStyleOptions(optionsArray)
  }

  // generate alapaca image according to generatedstyleoptions
  function generateAlpacaImage(name, pic) {
    // sets button to active when clicked changing styles
    const newActiveArray = [...activeStyle] // getting all the active style (because activestyle is constatnt so we are using state )
    newActiveArray[categoryIndex]=name // changing the name of the activeStyle of that category
    console.log(newActiveArray)

    setActiveStyle(newActiveArray)
    
    // generates the alpacaImage by replacing image in state array with style picked
    const newAlpacaImage = [...alpacaImage]
    newAlpacaImage[categoryIndex]= pic  // changing the image of the alapaca according to the category index and cahning the pic
    setAlpacaImage(newAlpacaImage)
  }

  function randomAlpaca() {
    const randomAlpaca = []
    const randomActiveStyle = []
    Object.values(allData).forEach(val => {
      const randomValue = val.length
      const randomArrayIndex = Math.floor(Math.random() * randomValue)
      randomAlpaca.push(val[randomArrayIndex].pic)
      randomActiveStyle.push(val[randomArrayIndex].name)
    })
    setAlpacaImage(randomAlpaca)
    setActiveStyle(randomActiveStyle)
  }

  function downloadAlpaca() {
    // mergeImage dependency takes array of png images, merges, then downloads as one png
    mergeImages(alpacaImage)
    .then((b64) => {
      var a = document.createElement("a");
      a.href = b64;
      a.download = "Alpaca.png";
      a.click();
    });
  }

  const styleButtons = styleOptions.map((item, index) => { // stylebuttons according to the category
    return (
      <StyleButton
        name={item.name}
        key={index}
        activeStyle={activeStyle[categoryIndex]}  // passing the active style of any category index so that if we changes the category we get the setted value of style
        generateAlpacaImage={() => generateAlpacaImage(item.name, item.pic)} 
      />
    )
  })

  const categoryButtons = Object.keys(stylesData).map((item, index) => {
    return (
      <CategoryButton
        key={index} 
        name={item}
        activeCategory={activeCategory}
        generateStyleOptions={() => generateStyleOptions(item, index)}  // item= category nam and index=categoryindex of active category
      />
    )
  })

  const alpacaDude = alpacaImage.map((item, index) => {
    return (
      <Alpaca
        pic={item}
        key={index}
      />
    )
  })

  return (
    <div className="flex-wrapper">
      <h1>Alpaca Generator</h1>
      <div className="main-content">
        <div className="alpaca-img-container">
            {alpacaDude}
          <div className="random-download-container">
            <button onClick={() => randomAlpaca()}>🔀   Randomize</button>
            <button onClick={() => downloadAlpaca()}>🖼   Download</button>
          </div>
        </div>
        <div className="styling-container">
          <div className="category-container">
            <h2>Accesorize the Alpacas</h2>
            <div className="category-btns-container">
              {categoryButtons}
            </div>
          </div>
          <div className="style-options-container">
            <h2>Style</h2>
            <div className="style-btns-container">
              {styleButtons}
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;