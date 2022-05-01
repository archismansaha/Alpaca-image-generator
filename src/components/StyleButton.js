export default function StyleButton(props) {

    const [activeStyle, name, generateAlpacaImage] = [props.activeStyle, props.name, props.generateAlpacaImage]
    
    return (
        <button className={activeStyle === name ? 'active' : '' } onClick={generateAlpacaImage}>{name}</button>
    )
  }