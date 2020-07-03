import React from 'react';
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

export default class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipe: null, isLoading: true }
  }

  async componentDidMount() {
    var recipe = null
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.recipeId)
    } catch (e) {
      recipe = null
    }
    this.setState({ recipe, isLoading: false })
  }

  // Definimos un método para compartir, el cual toma un evento de click
  compartir = (e) => {
    // Impedimos la recarga del evento
    e.preventDefault()

    // Detectamos si el browser tiene la Web Share API, si no lo tiene, ponemos un alert
    if (!navigator.share) {
      alert("Tu browser no sporta la Web Share API");
      return;
    }

    // Accedemos a la receta para compartir la receta
    const { recipe } = this.state

    // Llamamos a web share api
    navigator.share({
      // Mandamos un objeto, el title es el nombre del contenido que estamos compartiendo
      title: `${recipe.name}`,
      // El texto es la descripción del contenido que estamos compartiendo
      text: 'Una receta deliciosa',
      // Está será la url de la compartida. debería ser absoluta en lo posible
      url: document.location.href
    })
      // Esto devuelve una promise con un método then que se va a ejecutar en caso de que todo esté bien
      .then(() => alert("Contenido compartido!"))
      // Catcheamos el error
      .catch((error) => alert("Hubo un error"))
  }

  render() {
    const { recipe, isLoading } = this.state

    if (isLoading) {
      return <div className="message">Cargando...</div>
    }
    else if (recipe === null) {
      return <div className="message">Hubo un problema :(</div>
    }

    return <div className="Recipe">
      <Helmet>
        <title>{recipe.name}</title>
      </Helmet>

      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />

      <div className="title">
        <div className="info">
          <h1>{recipe.name}</h1>
          <p>{recipe.origin}</p>
        </div>
        <div>
          {/* Agregamos un link con el evento de compartir */}
          <a className="share" onClick={this.compartir}>Compartir</a>
        </div>
      </div>


      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeInstructions instructions={recipe.instructions} />

    </div>
  }

}