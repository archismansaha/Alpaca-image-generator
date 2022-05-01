export default function CategoryButton(props) {

    const [activeCategory, name, generateStyleOptions] = [props.activeCategory, props.name, props.generateStyleOptions]
  
    return (
        <button className={activeCategory === name ? 'active' : '' } onClick={generateStyleOptions}>{name}</button>
    )
  }