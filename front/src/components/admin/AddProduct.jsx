import React, { useState, Fragment } from 'react';
import axios from 'axios'
import { BASE_URL, BASE_IMG } from '../../tools/constante.js'

const AddProduct = () => {
    // Utilise la fonction useState pour initialiser des variables d'état pour les champs de formulaire
    const [productInfos, setProductInfos] = useState({
        name: "",
        type_id: 1,
        price: "",
        category_id: ""
    })

    const handleChange = (e) => {

        const { name, value } = e.target
        setProductInfos({ ...productInfos, [name]: value })
    }

    // Fonction qui sera appelée lorsque le formulaire est soumis
    const submit = async(e) => {
        e.preventDefault();


        // Initialisation d'un objet FormData pour envoyer les données du formulaire
        const dataFile = new FormData();

        // Récupération des fichiers envoyés dans le formulaire
        const files = { ...e.target.picture.files }

        console.log(dataFile)
        console.log(files)

        dataFile.append("name", productInfos.name)
        dataFile.append("type_id", productInfos.type_id)
        dataFile.append("price", productInfos.price)
        dataFile.append("category_id", productInfos.category_id)

        // Ajout de chaque fichier à l'objet FormData

        if (files[0]) {
            dataFile.append('files', files[0], files[0].name);
        }

        // Envoi de la requête AJAX avec l'objet FormData contenant les données du formulaire et les fichiers
        axios.post(`${BASE_URL}/admin/addProduct`, dataFile)


            .then((res) => {
                console.log(res.data);
                alert('Produit créé avec succès !');

            })
            .catch((err) => {
                console.log(err);
                alert('Erreur lors de la création du produit.');
            })


    }

    // Retourne le formulaire avec des étiquettes et des champs pour chaque donnée de produit et un bouton de soumission
    return (
        <div className="">
            <form className="add_product" onSubmit={submit} encType="multipart/form-data">
                Type de produit:
                <label>
                    <select name="type_id" 
                    onChange ={handleChange} 
                    value={productInfos.type_id}>
                        <option value=''>choisir un type de produit</option>
                        <option value='1'>Consoles</option>
                        <option value='2'>Jeux</option>
                    </select>
                </label>
              
                {productInfos.type_id == 1 ? //si console est sélectionné
                
                    (<div>
                        <h2>Consoles</h2>
                        <label>
                            Name:
                            <input type="text" 
                            name="name" 
                            onChange={handleChange} 
                            value={productInfos.name} />
                        </label>
                        <label>
                            Price:
                            <input type="number" 
                            name="price" 
                            onChange ={handleChange} 
                            value={productInfos.price}/>
                        </label>
                        <label>
                            Catégorie :
                        <select name="category_id" 
                        onChange ={handleChange} 
                        value={productInfos.category_id}>
                        <option value="">Choisir une catégorie</option>
                            <option value="1">Playstation</option>
                            <option value="2">Nintendo</option>
                            <option value="3">SEGA</option>
                            <option value="4">Commodore 64</option>
                        </select>
                      </label>
                    </div>)
                  
                  : // si jeux est sélectionné
                  
                    (<div>
                        <h2>Jeux</h2>
                        <label>
                        Name:
                        <input type="text" name="name" onChange={handleChange} value={productInfos.name} />
                      </label>
                      <label>
                        Price:
                        <input type="number" 
                        name="price" 
                        onChange ={handleChange} 
                        value={productInfos.price}/>
                      </label>
                      
                      <label>
                      Catégorie :
                        <select name="category_id" 
                        onChange ={handleChange} 
                        value={productInfos.category_id}>
                            <option value="">choisir une catégorie</option>
                            <option value="5">FPS</option>
                            <option value="6">RPG</option>
                            <option value="7">MMORPG</option>
                            <option value="8">aventure / action </option>
                        </select>
                      </label>
                    </div>)
                
              }
              <h2>Ajouter / Modifier l'image</h2>
                <label htmlFor='picture'>
                  Upload picture:
                  <input type='file' id='picture' name='picture' />
                </label>
                
                <button type='submit'>Create Product</button>
            </form>
        </div>
    );
}

export default AddProduct;
